import { IndexedDB } from '@/api/IndexedDB'

const screenshotOptions: Partial<Cypress.ScreenshotOptions> = {
  overwrite: true,
}

describe('Delete a Lifetime-event item', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
    await db.insert({
      id: 'test-id',
      type: 'education',
      date: '2023-12-31',
      title: 'jest title',
      content: 'jest content',
    })
  })

  it('Should be completed a deletion process.', async () => {
    cy.visit('/')

    const beforeItem = cy.get('.vertical-timeline').find('.vertical-timeline-element')
    beforeItem.should('have.length', 1)

    cy.screenshot('before-event', screenshotOptions)

    beforeItem.click()

    const encodedId = btoa(encodeURIComponent('test-id'))

    cy.url().should('include', `/profile/edit/${encodedId}`)

    cy.screenshot('before-delete', screenshotOptions)

    cy.get('svg[data-testid="DeleteIcon"]').click()

    cy.get('body').not('.vertical-timeline')

    cy.screenshot('after-delete', screenshotOptions)
  })
})
