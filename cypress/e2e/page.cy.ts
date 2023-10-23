describe('Top page', () => {
  it('should be /', () => {
    cy.visit('http://localhost:3000/')

    cy.url().should('include', '/')
  })
})
