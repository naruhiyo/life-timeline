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

    cy.screenshot('profile/new/before-added-event', screenshotOptions)

    const beforeItems = cy.get('.vertical-timeline').find('.vertical-timeline-element')
    beforeItems.should('have.length', 0)

    cy.get('a[href="/profile/new"]').click()

    cy.url().should('include', '/profile/new')

    cy.screenshot('profile/new/before-input', screenshotOptions)

    cy.get('main').contains('新規追加')

    const now = new Date()
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    cy.get('input[type="date"]').type(date)

    cy.get('input[type="text"]').type('cypress-test-event')

    cy.get('textarea').first().type('hello world from cypress!')

    cy.screenshot('profile/new/after-input', screenshotOptions)

    cy.get('button').click()

    cy.screenshot('profile/new/after-added-event', screenshotOptions)

    cy.contains('button', 'Close').click()

    const afterItems = cy.get('.vertical-timeline').find('.vertical-timeline-element')
    afterItems.should('have.length', 1)
  })
})
