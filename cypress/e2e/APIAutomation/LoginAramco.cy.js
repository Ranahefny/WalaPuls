
///<reference types="cypress"/>
import LoginAramcoPage from "../../support/Pages/LoginAramcoPage";
describe('Login function', () => {
  let login;
  before(() => {
      login = new LoginAramcoPage();
      login.loadTestData('Aramco').then(() => {
          login.generateSecretKey('Aramco');
      });

  });
  it('Login as An Aramco user', () => {
      login.loginAramco();

  })
})