// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Generate Timestamp and Secret Key
import CryptoJS from 'crypto-js';

Cypress.Commands.add("generateSecretKey", () => {
     timestamp = Math.floor(Date.now() / 1000);
       // Define request parameters
       let params = {
         method: 'POST',
         request: '/v2/users/login',
         user_identifier: 'user@walf.com',
         client: 'i',
         timestamp: timestamp,
         password: '2T+3oX5zp1TbEkEtwWq52g==',
       };
   //+${params.password}
       // Generate Secret Key (Signature)
       const secret_key = 'f25522a5b819378b079ae015f0b4141de15baf33a366abfa015b5237ccaff71f';  // Replace with actual key
       const signature = `${params.method}+${params.request}+${params.timestamp}+${params.client}+${params.user_identifier}+${params.password}`;
       secret = CryptoJS.HmacSHA256(signature, secret_key).toString();
       cy.log(`signature: ${signature}`);
    });


