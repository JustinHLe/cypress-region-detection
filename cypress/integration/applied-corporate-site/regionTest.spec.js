/// <reference types="cypress"/>
import { HCPCountryData } from '../../fixtures/HCPCountryIPs.json'
import { NonHCPCountryData } from '../../fixtures/NonHCPCountryIPs.json'

//ignore page erros
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Test Deny access to product page', () => {
    it("Denys access to product page", () => {
        cy.intercept(
            "GET",
            "https://icanhazip.com",
            {
                body: '2.0.0.0'
            }
        ).as('ipIntercept')
        cy.intercept(
            "GET",
            /.*(GeoLocation\/GetCountry).*/,
        ).as('countryName')

        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('/Products')
        cy.wait("@countryName").then(data => {
            cy.log(data.response.body)
        })
        cy.wait("@ipIntercept").then(data => {
            cy.log(data.response.body)
        })
        cy.get('#popup-France').should('be.visible')
    })
})

describe("Test that user has full access to product page without popups", () => {
    NonHCPCountryData.countries.forEach(item => {
        it(`testing ${item.country}`, () => {
            cy.intercept(
                "GET",
                "https://icanhazip.com",
                {
                    body: item.ip
                }
            ).as('ipIntercept')
            cy.intercept(
                "GET",
                /.*(GeoLocation\/GetCountry).*/,
            ).as('countryName')

            cy.clearCookies()
            cy.clearLocalStorage()
            cy.visit('/Products')
            cy.wait("@countryName").then(data => {
                cy.log(data.response.body)
            })
            cy.wait("@ipIntercept").then(data => {
                cy.log(data.response.body)
            })
            cy.get('#popup-HCP').should('not.be.visible')
        })
    })
})

describe('Test that HCP popup is shown', () => {
    HCPCountryData.countries.forEach(item => {
        it(`testing ${item.country}`, () => {
            cy.intercept(
                "GET",
                "https://icanhazip.com",
                {
                    body: item.ip
                }
            ).as('ipIntercept')
            cy.intercept(
                "GET",
                /.*(GeoLocation\/GetCountry).*/,
            ).as('countryName')

            cy.clearCookies()
            cy.clearLocalStorage()
            cy.visit('/Products')
            cy.wait("@countryName").then(data => {
                cy.log(data.response.body)
            })
            cy.wait("@ipIntercept").then(data => {
                cy.log(data.response.body)
            })
            cy.get('#popup-HCP').should('be.visible')
        })
    })
})
