import { fireEvent, render, screen } from '@testing-library/react'
import { IndexedDB } from '@/api/IndexedDB'
import Page from '@/profile/new/page'
import '@test/util/appMock'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => jest.fn(),
  }),
}))

describe('render registration screen', () => {
  let db: IndexedDB
  let spy: jest.SpyInstance<Promise<boolean>, [form: unknown], any>

  beforeEach(async () => {
    db = await IndexedDB.getSingleton()
    spy = jest.spyOn(db, 'insert')
  })

  afterEach(async () => {
    await spy.mockClear()
  })

  test('The registration process should be completed, and the insert function in IndexedDB should be called once.', async () => {
    spy.mockReturnValue(Promise.resolve(true))

    render(<Page />)

    // don't show a registration complete dialog
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const headTitle = await screen.findByText('新規追加')
    expect(headTitle).toBeInTheDocument()

    fireEvent.click(await screen.findByLabelText('学び'))
    fireEvent.change(await screen.findByLabelText('日付'), { target: { value: '2023-12-31' } })
    fireEvent.change(await screen.findByLabelText('イベントタイトル'), {
      target: { value: 'test title' },
    })
    fireEvent.change(await screen.findByLabelText('詳細'), { target: { value: 'test contents' } })
    fireEvent.click(await screen.findByRole('button', { name: '保存する' }))

    // show the dialog
    expect(await screen.findByRole('dialog')).toBeInTheDocument()

    const closeButtons = await screen.findAllByRole('button', { name: 'Close' })
    fireEvent.click(closeButtons[0])

    // check method call times
    expect(db.insert).toHaveBeenCalledTimes(1)
  })

  test("The registration process should not be completed if a user doesn't input information into the form.", async () => {
    spy.mockReturnValue(Promise.resolve(true))

    render(<Page />)

    fireEvent.click(await screen.findByRole('button', { name: '保存する' }))

    // don't show a registration complete dialog
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // check method call times
    expect(db.insert).toHaveBeenCalledTimes(0)
  })
})
