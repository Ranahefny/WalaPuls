import login from "../../support/Pages/loginNormalUserPage"
describe('Login function', () => {
    before(() => {
        login = new loginNormalUserPage();
        login.loadTestData();
        login.genratesekretKey();

    })
    it('Login as A normal user', () => {

        login.loginUser();

    })
})