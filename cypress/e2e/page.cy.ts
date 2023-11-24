describe('Top page', () => {
  it('should be /', () => {
    cy.visit('/')

    cy.url().should('include', '/')

    cy.contains('ぴよぴよ')
    cy.screenshot()
  })
})
