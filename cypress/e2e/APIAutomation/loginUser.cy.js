describe('', () => {


    it('Login user with valid credentials', () => {
        cy.request({
            method: 'POST',
            url: 'https://users-dt.walaplus.com/v2/users/login',
            body: {
                "timestamp": {{ timestamp }},
        "secret": {{ secret }},
    "user_identifier": {{ email }},
    "password": {{ password }},
    "client": a,
    "udid": a1a1a12345678,
    "tenant": walaplus,
        }

        })
    })

})