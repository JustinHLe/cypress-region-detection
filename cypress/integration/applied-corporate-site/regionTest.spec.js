/// <reference types="cypress"/>
import { HCPCountryData } from '../../fixtures/HCPCountryIPs.json'
import { NonHCPCountryData } from '../../fixtures/NonHCPCountryIPs.json'

//ignore page erros
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('France popup', () => {
    it("France popup", () => {
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
        cy.get('.yes-checkbox').should('be.visible').click()
        cy.get('#popup-France').should('not.be.visible')
        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/Products')
        })

        cy.reload()
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.get('#popup-France').should('be.visible')
        cy.get('.no-checkbox').should('be.visible').click()
        cy.location().should(loc => {
            expect(loc.host).to.eq('corpstaging.appliedmedical.eu')
        })
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
            cy.location().should(loc => {
                expect(loc.pathname).to.eq('/Products')
            })
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
            // cy.intercept(
            //     "GET",
            //     /.*(GeoLocation\/AllowProductAccess).*/,
            //     {
            //         body: {
            //             Allow: true
            //         }
            //     }
            // ).as('allow')

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
            cy.location().should(loc => {
                expect(loc.pathname).to.eq('/Products')
            })
        })
    })
})
