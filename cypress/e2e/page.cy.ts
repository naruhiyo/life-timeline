describe('Top page', () => {
  it('should contain `Hello World`', () => {
    cy.visit('http://localhost:3000/')

    cy.url().should('include', '/')

    cy.get('p').contains('Hello World')
  })
})
