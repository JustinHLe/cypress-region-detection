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
                cy.request(`https://www.nirsoft.net/countryip/${item.code.toLowerCase()}.html`).then(res => {
                    const ip = res.body.match(/([0-9]{1,3}\.)([0-9]{1,3}\.)([0-9]{1,3}\.)([0-9]{1,3})/g)
                    cy.log(ip)
                    cy.request(`http://ipwhois.app/json/${ip[0]}`).then(res => {
                        cy.log(res.body.country_code)
                        cy.log(item.code)
                        if(res.body.country_code === item.code){
                            HCPCountryData.HCPCountryData.countries.push({
                                country: item.name,
                                ip: ip[0]
                            })
                        } else {
                            function testIps(index = 1){
                                if(index > ip.length){
                                    return
                                }
                                cy.request(`http://ipwhois.app/json/${ip[index]}`).then(res => {
                                    if(res.body.country_code === item.code){
                                        HCPCountryData.HCPCountryData.countries.push({
                                            country: item.name,
                                            ip: ip[index]
                                        })
                                    } else {
                                        testIps(index + 1)
                                    }
                                })
                            }
                            testIps()
                        }
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
                cy.request(`https://www.nirsoft.net/countryip/${item.code.toLowerCase()}.html`).then(res => {
                    const ip = res.body.match(/([0-9]{1,3}\.)([0-9]{1,3}\.)([0-9]{1,3}\.)([0-9]{1,3})/)
                    NonHCPCountryData.NonHCPCountryData.countries.push({
                        country: item.name,
                        ip: ip[0]
                    })
                })
            })
        })
        it("writes NonHCPCountryData to file", () => {
            cy.writeFile('./cypress/fixtures/NonHCPCountryIPs.json', JSON.stringify(NonHCPCountryData))
        })
    })
})