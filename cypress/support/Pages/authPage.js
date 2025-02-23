
import CryptoJS from 'crypto-js';
class authPage {
    constructor() {
        this.timestamp = null;
        this.secret = null;
        this.data = null;
        // Generate Timestamp
        this.timestamp = Math.floor(Date.now() / 1000);
        // Define request parameters
        let fixtureFile = '';

    }
    loadTestData(userType) {
        let fixtureFile = ''; //  Declare fixtureFile before using it

        // Choose fixture file based on user type
        if (userType === 'normal') {
            fixtureFile = 'loginNorma';
        } else if (userType === 'Aramco') {
            fixtureFile = 'loginAramco';
        } else if (userType === 'admin') {
            fixtureFile = 'loginAdmin';
        } else {
            throw new Error(`Invalid user type provided: ${userType}`);
        }

        // Load fixture file dynamically
        return cy.fixture(fixtureFile).then((testdata) => {
            this.data = testdata;  //  Assign fixture data
            cy.log(` Loaded test data from: ${fixtureFile}`);
        });
    }

    // return cy.fixture('loginNorma').then((testdata) => {
    //     this.data = testdata;  // Assign fixture data
    // });

    generateSecretKey(userType) {

        cy.log("Generating secret key with test data:", this.data);
        if (!this.data) {
            throw new Error("Test data is not loaded. Call loadTestData() first.");
        }

        cy.log("Generating secret key with test data:", this.data);
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
        let signature = '';
        if (userType === 'normal') {
            signature = `${params.method}+${params.request}+${params.timestamp}+${params.client}+${params.user_identifier}+${params.password}`;
        } else if (userType === 'Aramco') {
            signature = `${params.method}+${params.request}+${params.timestamp}+${params.client}+${params.user_identifier}`;
        } else {
            throw new Error(`Invalid userType: ${userType}`); // ✅ Handle unexpected values
        }
        //const signature = `${params.method}+${params.request}+${params.timestamp}+${params.client}+${params.user_identifier}+${params.password}`;
        this.secret = CryptoJS.HmacSHA256(signature, secret_key).toString();
        console.log(`Generated signature for ${userType}: ${signature}`);
    }
}

export default authPage;