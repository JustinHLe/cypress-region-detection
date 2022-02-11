/// <reference types="cypress"/>
import { HCPCountries } from '../../fixtures/HCPCountries.json'
import { NonHCPCountries } from '../../fixtures/NonHCPCountries.json'


describe("Generate Data for tests", () => {
    var HCPCountryData = {
        HCPCountryData: {
            countries: []
        }
    }
    var NonHCPCountryData = {
        NonHCPCountryData: {
            countries: []
        }
    }
    describe('Grab HCP Country name and IP', () => {
        HCPCountries.countries.forEach(item => {
            it('gets ip from each country', ()=> {
                cy.request(`https://cdn-lite.ip2location.com/datasets/${item.code}.json?_=1644535918229`).then(res => {
                    HCPCountryData.HCPCountryData.countries.push({
                        country: item.name,
                        ip: res.body.data[0][0]
                    })
                })
            })
        })
        it("writes HCPCountryData to file", () => {
            cy.writeFile('./cypress/fixtures/HCPCountryIPs.json', JSON.stringify(HCPCountryData))
        })
    })

    describe('Grab Non-HCP Country name and IP', () => {
        NonHCPCountries.countries.forEach(item => {
            it('gets ip from each country', ()=> {
                cy.request(`https://cdn-lite.ip2location.com/datasets/${item.code}.json?_=1644535918229`).then(res => {
                    NonHCPCountryData.NonHCPCountryData.countries.push({
                        country: item.name,
                        ip: res.body.data[0][0]
                    })
                })
            })
        })
        it("writes NonHCPCountryData to file", () => {
            cy.writeFile('./cypress/fixtures/NonHCPCountryIPs.json', JSON.stringify(NonHCPCountryData))
        })
    })
})