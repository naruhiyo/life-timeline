import { IndexedDB } from '@/api/IndexedDB'

const screenshotOptions: Partial<Cypress.ScreenshotOptions> = {
  overwrite: true,
}
describe('Display life-timeline event items', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
  })

  it('Should be completed a display process.', () => {
    cy.visit('/')

    cy.url().should('include', '/')
    cy.screenshot('')
  })

  it('Should be completed a downloaded process.', () => {
    cy.visit('/')
    cy.screenshot('top-image', screenshotOptions)

    cy.get('button[aria-label="Download"]').click()
    cy.screenshot('visible-dropdown', screenshotOptions)
    cy.get('ul').contains('PNG')
    cy.get('ul').contains('PDF')
    cy.get('ul').contains('SVG')

    const dropdownMenu = cy.get('ul').find('li')
    // click `SVG`
    dropdownMenu.last().click()
  })
})
