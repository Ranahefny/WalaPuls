export class LoginPage {

    constructor() {
        this.testData = null; // Initialize testData
    }

    loadTestData() {
        return cy.fixture('loginaramco.json').then((data) => {
            this.testData = data; // Store loaded fixture data
        });
    }
    
    
    // generateSecretKey() {
    //     return cy.generateSecretKey(
    //         this.testData.method,
    //         this.testData.request,
    //         this.testData.user_identifier,
    //         this.testData.client,
    //         this.timestamp,
    //         this.testData.password

    //     );
    // }

    loginAramco() {

        
            return this.generateSecretKey().then(({ timestamp, secret }) => {
                return cy.request({
                    method: this.testData.method,
                    url: Cypress.env('BaseURLTest') + this.testData.request,
                    body: {
                        timestamp: timestamp,
                        secret: secret,
                        user_identifier: this.testData.user_identifier,
                        udid: this.testData.udid,
                        client: this.testData.client,
                        tenant: this.testData.tenant
                    }
                });
            }).then((response) => {
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
    }
}
export default LoginPage;