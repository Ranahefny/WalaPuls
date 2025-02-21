class loginNormalUserPage {

    constructor() {
        this.timestamp = null;
        this.secret = null;
        this.data = null;
        // Generate Timestamp
        this.timestamp = Math.floor(Date.now() / 1000);
        // Define request parameters

    }
    loadTestData() {
        return cy.fixture('loginNorma.json').then((testData) => {
            this.data = testData; // Store loaded fixture data
        });
    }
    genratesekretKey() {
        let params = {
            method: this.data.method,
            request: this.data.url,
            user_identifier: this.data.user_identifier,
            client: this.data.client,
            timestamp: this.timestamp,
            password: this.data.password,
        };
        // Generate Secret Key (Signature)
        const secret_key = this.data.secret_key;  // Replace with actual key
        const signature = `${params.method}+${params.request}+${params.timestamp}+${params.client}+${params.user_identifier}+${params.password}`;
        this.secret = CryptoJS.HmacSHA256(signature, secret_key).toString();
        console.log(`signature: ${signature}`);
    }

    loginUser() {
        cy.request({
            method: this.data.method,
            url: this.data.request,
            body: {
                timestamp: this.timestamp,  // Use dynamic timestamp
                secret: this.secret,        // Use generated secret key
                user_identifier: this.data.user_identifier,
                password: this.data.password,
                udid: this.data.udid,
                client: this.data.client,
                tenant: this.data.tenant,
                language: this.data.language
            }
        }).then(response => {
            expect(response.status).to.eq(202);
            expect(response.body).to.have.property('user_id');
            cy.log(`Response: ${JSON.stringify(response.body)}`);

        })

    }
}

export default loginNormalUserPage;