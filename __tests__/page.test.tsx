import { render, screen } from '@testing-library/react'
import { IndexedDB } from '@/api/IndexedDB'
import Home from '@/page'
import '@test/util/appMock'

jest.mock('next/navigation', () => ({
  useRouter() {},
}))
describe('render home screen', () => {
  test('Display two life-timeline event items when the retrieve function is called once with IndexedDB.', async () => {
    const db = await IndexedDB.getSingleton()
    jest.spyOn(db, 'selectAll').mockImplementation(() =>
      Promise.resolve([
        {
          id: 'test-id',
          type: 'education',
          date: '2023-12-31',
          title: 'jest title',
          content: 'jest content',
        },
        {
          id: 'test-id-2',
          type: 'education',
          date: '2024-01-01',
          title: 'jest title 2',
          content: 'jest content 2',
        },
      ]),
    )

    render(<Home />)

    const main = await screen.findByRole('main')
    const firstItem = await screen.findByText('jest title')

    const verticalTimelineItems = main.querySelectorAll('.vertical-timeline-element')
    expect(verticalTimelineItems).toHaveLength(2)
    expect(firstItem).toBeInTheDocument()
  })

  test('Do not display life-timeline event items where the retrieve function returns an empty list.', async () => {
    const db = await IndexedDB.getSingleton()
    jest.spyOn(db, 'selectAll').mockImplementation(() => Promise.resolve([]))

    render(<Home />)

    const main = await screen.findByRole('main')

    const verticalTimelineItems = main.querySelectorAll('.vertical-timeline-element')
    expect(verticalTimelineItems).toHaveLength(0)
  })
})
