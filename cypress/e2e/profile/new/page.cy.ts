import { IndexedDB } from '@/api/IndexedDB'

const screenshotOptions: Partial<Cypress.ScreenshotOptions> = {
  overwrite: true,
}

describe('Event register page', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
  })

  it('should be input forms', () => {
    cy.visit('/')

    cy.screenshot('before-added-event', screenshotOptions)

    cy.get('body').not('.vertical-timeline')

    cy.get('a[href="/profile/new"]').click()

    cy.spyCypress()

    cy.url().should('include', '/profile/new')

    cy.screenshot('before-input', screenshotOptions)

    cy.get('main').contains('新規追加')

    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    cy.get('input[type="date"]').type(`${year}-${month}-${day}`)

    cy.get('input[type="text"]').type('cypress-test-event')

    cy.get('textarea').first().type('hello world from cypress!')

    cy.screenshot('after-input', screenshotOptions)

    cy.get('button').click()

    cy.contains('button', 'Close').click()

    const afterItems = cy.get('.vertical-timeline').find('.vertical-timeline-element')
    afterItems.should('have.length', 1)

    cy.screenshot('after-added-event', screenshotOptions)
  })
})
