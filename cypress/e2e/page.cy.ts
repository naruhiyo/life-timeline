import { IndexedDB } from '@/api/IndexedDB'

describe('Top page', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
  })

  it('should be /', () => {
    cy.visit('/')

    cy.url().should('include', '/')
    cy.screenshot('')
  })
})
