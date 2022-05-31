/// <reference types="Cypress" />

describe('User', () => {
  it('Should create a new user', () => {
    cy.visit('http://localhost:3000/')

    cy.intercept('POST', '**/api/users').as('postUser')

    cy.get('#uname')
      .type('Julia')
      .should('have.value', 'Julia')

    cy.get('[action="/api/users"] > [type="submit"]').click()

    cy.url().should('include', '/api/users')

    cy.wait('@postUser').should(({ request, response }) => {
      expect(request.body).to.include('username', '_id')
      expect(request.headers).to.have.property('content-type')
      expect(response.statusCode).to.equal(200)
      expect(response && response.body).to.have.property('username', 'Julia')
      expect(response.body).property('_id').to.be.a('string')
    })
  })
})