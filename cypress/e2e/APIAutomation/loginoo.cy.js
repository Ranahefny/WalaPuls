
///<reference types="cypress"/>
import loginNormalUserPage from "../../support/Pages/loginNormalUserPage";
describe('Login function', () => {
    let login; // Define login outside before()
    before(() => {
        login = new loginNormalUserPage();
        login.loadTestData().then(()=>{
            login.generateSecretKey();
        });
       
    });
    it('Login as A normal user', () => {
        login.loginUser();

    })
})