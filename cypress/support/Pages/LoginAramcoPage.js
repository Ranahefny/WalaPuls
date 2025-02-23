import authPage from "../Pages/authPage";

export class LoginAramcoPage extends authPage {

    constructor() {
        super();
        this.timestamp = Math.floor(Date.now() / 1000);
        this.secret = null;
        this.data = null;

    }
    loginAramco() {
        if (!this.data) {
            throw new Error("Test data is not loaded. Call loadTestData() first.");
        }
        else {
            ("your Test Data is loaded sussfully");
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
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('is_aramco_user');
                if (response.body.is_aramco_user == true) {
                    cy.log('This user is an Aramco user');
                } else {
                    cy.log('This user is not an Aramco user');
                }
            })

        }
    }
}

export default LoginAramcoPage;