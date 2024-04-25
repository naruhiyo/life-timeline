import { IndexedDB } from '@/api/IndexedDB'

const screenshotOptions: Partial<Cypress.ScreenshotOptions> = {
  overwrite: true,
}

// ToDo: Fix below test because it does not work
/*
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
*/

describe('Edit a Lifetime-event item', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
    await db.insert({
      id: 'test-id',
      type: 'education',
      date: '2023-12-31',
      title: 'title before edit',
      content: 'content before edit',
    })
  })

  it('Should be completed a edit process.', () => {
    cy.visit('/')
    const itemBeforeEdit = cy.get('.vertical-timeline').find('.vertical-timeline-element')
    itemBeforeEdit.should('have.length', 1)
    cy.screenshot('top-page-before-edit', screenshotOptions)

    cy.get('.vertical-timeline-element-title').should((title) => {
      expect(title).to.have.text('title before edit')
    })
    cy.get('.vertical-timeline-element-date').should((date) => {
      expect(date).to.have.text('2023-12-31')
    })
    cy.get('.vertical-timeline-element--education').should('exist')
    cy.get('.vertical-timeline-element')
      .find('p')
      .should((content) => {
        expect(content).to.have.text('content before edit')
      })

    cy.window().then((win) => {
      cy.stub(win, 'atob').returns('test-id')
      cy.stub(win, 'btoa').returns('dGVzdC1pZA==')
    })
    itemBeforeEdit.click()
    cy.url().should('include', `/profile/edit/dGVzdC1pZA==`)
    cy.screenshot('detail-page-before-edit', screenshotOptions)
    cy.get('p[class="text-md"]').should((title) => {
      expect(title).to.have.text('編集')
    })
    // Click second radio button: click 'work' radio button
    cy.get('label').eq(1).click()
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    cy.get('input[type="date"]').type(`${year}-${month}-${day}`)
    cy.get('input[type="text"]').clear()
    cy.get('input[type="text"]').type('title after edit')
    cy.get('textarea').first().clear()
    cy.get('textarea').first().type('content after edit')
    cy.screenshot('detail-page-after-edit', screenshotOptions)
    cy.get('button').contains('保存する').click()
    cy.contains('button', 'Close').click()

    const itemAfterEdit = cy.get('.vertical-timeline').find('.vertical-timeline-element')
    itemAfterEdit.should('have.length', 1)
    cy.screenshot('top-page-after-edit', screenshotOptions)

    cy.get('.vertical-timeline-element-title').should((title) => {
      expect(title).to.have.text('title after edit')
    })
    cy.get('.vertical-timeline-element-date').should((date) => {
      expect(date).to.have.text(`${year}-${month}-${day}`)
    })
    cy.get('.vertical-timeline-element--work').should('exist')
    cy.get('.vertical-timeline-element')
      .find('p')
      .should((content) => {
        expect(content).to.have.text('content after edit')
      })
  })
})
