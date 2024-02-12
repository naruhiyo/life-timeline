import { IndexedDB } from '@/api/IndexedDB'

describe('Display life-timeline event items', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
  })

  it('Should be completed a display process.', () => {
    cy.visit('/')

    cy.url().should('include', '/')
    cy.screenshot()
  })
})
