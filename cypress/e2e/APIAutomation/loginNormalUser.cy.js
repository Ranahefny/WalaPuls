
///<reference types="cypress"/>
import loginNormalUserPage from "../../support/Pages/loginNormalUserPage";
describe('Login function', () => {
    let login;
    before(() => {
        login = new loginNormalUserPage();
        login.loadTestData('normal').then(() => {
            login.generateSecretKey('normal');
        });

    });
    it('Login as A normal user', () => {
        login.loginUser();

    })
})