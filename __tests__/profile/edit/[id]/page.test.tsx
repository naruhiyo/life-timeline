import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { IndexedDB } from '@/api/IndexedDB'
import Page from '@/profile/edit/[id]/page'
import '@test/util/appMock'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => jest.fn(),
  }),
  useParams: () => ({
    id: btoa(encodeURIComponent('test-id')),
  }),
}))

describe('render registration screen', () => {
  let db: IndexedDB
  let spy: jest.SpyInstance<Promise<boolean>, [id: string], any>

  beforeEach(async () => {
    db = await IndexedDB.getSingleton()
    spy = jest.spyOn(db, 'delete')
  })

  afterEach(async () => {
    await spy.mockClear()
  })

  test('delete lifetime-event', async () => {
    spy.mockReturnValue(Promise.resolve(true))

    render(<Page />)

    // mock window.confirm
    window.confirm = jest.fn().mockReturnValue(true)

    // don't show a registration complete dialog
    fireEvent.click(await screen.findByTestId('DeleteIcon'))

    waitFor(() => {
      // check method call times
      expect(db.delete).toHaveBeenCalledTimes(1)
    })
  })
})
