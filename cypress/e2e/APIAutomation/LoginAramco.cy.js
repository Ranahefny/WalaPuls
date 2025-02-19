import LoginPage from '../../support/LoginPage'; 
describe('Aramco API Test', () => { 
  let login;

  beforeEach(() => {
    login = new LoginPage(); 
  });
  it('authenticate Aramco user', () => {
    login.loadTestData().then(() => {  
      login.loginAramco().then(() => {
        cy.log('Aramco User authenticated successfully');
      });
    });
  });
});

