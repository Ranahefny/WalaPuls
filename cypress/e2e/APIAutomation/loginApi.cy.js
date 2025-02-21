import CryptoJS from 'crypto-js';
describe('Login API with Timestamp and Secret Key', () => {
  let timestamp;
  let secret;
  before(() => {
    // Generate Timestamp
    timestamp = Math.floor(Date.now() / 1000);
    // Define request parameters
    let params = {
      method: 'POST',
      request: '/v2/users/checkAramcoUser',
      user_identifier: 'test4@aramco.com',
      client: 'i',
      timestamp: timestamp,
      password: '2T+3oX5zp1TbEkEtwWq52g==',
    };
//+${params.password}
    // Generate Secret Key (Signature)
    const secret_key = 'f25522a5b819378b079ae015f0b4141de15baf33a366abfa015b5237ccaff71f';  // Replace with actual key
    const signature = `${params.method}+${params.request}+${params.timestamp}+${params.client}+${params.user_identifier}`;
    secret = CryptoJS.HmacSHA256(signature, secret_key).toString();
    console.log(`signature: ${signature}`);
  });
  it('Login with Secure Authentication', () => {
    cy.request({
      method: 'POST',
      url: 'https://users-dt.walaplus.com/v2/users/checkAramcoUser',
      body: {
        timestamp: timestamp,  // Use dynamic timestamp
        secret: secret,        // Use generated secret key
        user_identifier: 'test4@aramco.com',
       // password: '2T+3oX5zp1TbEkEtwWq52g==',
        udid: '23223',
        client: 'i',
        tenant: 'walaplus',
        language: 'en'
      }
    })
      .then((response) => {
        expect(response.status).to.eq(200); // Ensure successful login
        // console.log('Response Body :', response.body);
        // cy.log('Response Body :', response.body);
        expect(response.body).to.have.property('is_aramco_user');
        if(response.body.is_aramco_user==true) {
          cy.log('This user is an Aramco user');
        } else {
          cy.log('This user is not an Aramco user');
        }
      });
  });
});