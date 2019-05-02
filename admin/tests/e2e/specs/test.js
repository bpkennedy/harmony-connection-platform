// https://docs.cypress.io/api/introduction/api.html

describe('Home', () => {
  it('should be the login page', () => {
    cy.visit('/')
    cy.contains('Log In')
    cy.contains('Harmony Connection Platform')
    cy.contains('Dashboard').should('not.exist')
  })
})
