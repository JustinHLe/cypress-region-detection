/// <reference types="cypress"/>

//describe is used to group test cases together
//it is for individual tests

//ignore page errors
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Corporate Website Product Page Testing', () => {
    it("visits products page with region France", () => {
        cy.intercept(
                "GET", 
                /.*(GeoLocation\/GetCountry).*/,
                {
                    body: "France"
                }
        ).as("interceptCountry")

        cy.clearLocalStorage()
        cy.clearCookies() 
        cy.visit("http://corpstaging.appliedmedical.eu/Products")
        cy.get('#popup-France').should('be.visible')
    })

    it("visits products page with region United States", () => {
        cy.intercept(
                "GET", 
                /.*(GeoLocation\/GetCountry).*/,
                {
                    body: "United States"
                }
        ).as("interceptCountry")
        cy.intercept(
            "GET",
            /.*(GeoLocation\/AskIfHCP).*/,
            {
                body: true
            }
        ).as("interceptHCP")

        cy.clearLocalStorage()
        cy.clearCookies() 
        cy.visit("http://corpstaging.appliedmedical.eu/Products")
        cy.wait('@interceptHCP').then(data => {
            cy.log(data.response.body)
        })
        cy.get('#popup-HCP').should('be.visible')
    })

    it("visits products page with region Netherlands", () => {
        cy.intercept(
                "GET", 
                /.*(GeoLocation\/GetCountry).*/,
                {
                    body: "Netherlands"
                }
        ).as("interceptCountry")
        cy.intercept(
            "GET",
            /.*(GeoLocation\/AskIfHCP).*/,
            {
                body: false
            }
        ).as("interceptHCP")

        cy.clearLocalStorage()
        cy.clearCookies() 
        cy.visit("http://corpstaging.appliedmedical.eu/Products")
        cy.wait('@interceptHCP').then(data => {
            cy.log(data.response.body)
        })
        cy.get('#popup-HCP').should('not.be.visible')
    })
})