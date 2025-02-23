
import authPage from '../Pages/authPage';

class loginNormalUserPage extends authPage {

    constructor() {
        super();
        this.timestamp = Math.floor(Date.now() / 1000);
        this.secret = null;
        this.data = null;


    }
    loginUser() {
        if (!this.data) {
            throw new Error("Test data is not loaded. Call loadTestData() first.");
        }
        else ("your Test Data is loaded sussfully");
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