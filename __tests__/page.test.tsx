import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { select } from 'react-select-event'
import { Downloader } from '@/api/Downloader'
import { IndexedDB } from '@/api/IndexedDB'
import Home from '@/page'
import '@test/util/appMock'

jest.mock('next/navigation', () => ({
  useRouter() {},
}))

describe('render home screen', () => {
  let container: HTMLElement
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

    await act(() => {
      const renderedComponent = render(<Home />)
      container = renderedComponent.container
    })

    const firstItem = await screen.findByText('jest title')

    const verticalTimelineItems = container.querySelectorAll('.vertical-timeline-element')
    expect(verticalTimelineItems).toHaveLength(2)
    expect(firstItem).toBeInTheDocument()
  })

  test('Do not display life-timeline event items where the retrieve function returns an empty list.', async () => {
    const db = await IndexedDB.getSingleton()
    jest.spyOn(db, 'selectAll').mockImplementation(() => Promise.resolve([]))

    await act(() => {
      const renderedComponent = render(<Home />)
      container = renderedComponent.container
    })

    const verticalTimelineItems = container.querySelectorAll('.vertical-timeline-element')
    expect(verticalTimelineItems).toHaveLength(0)
  })
})

describe('Download screen', () => {
  it('Download svg when the `SVG` clicked.', async () => {
    const user = userEvent.setup()

    render(<Home />)

    const downloaderMock = await jest
      .spyOn(Downloader.prototype, 'download')
      .mockReturnValue(Promise.resolve(true))

    act(async () => {
      // download svg
      user.click(await screen.findByTestId('DownloadIcon'))
      user.click(await screen.findByRole('menuitem', { name: 'SVG' }))
      await select(await screen.findByRole('menu')!, 'SVG')
      expect(downloaderMock).toHaveBeenCalled()
    })
  })

  it('Download png when the `PNG` clicked.', async () => {
    const user = userEvent.setup()

    render(<Home />)

    const downloaderMock = await jest
      .spyOn(Downloader.prototype, 'download')
      .mockReturnValue(Promise.resolve(true))
    act(async () => {
      // download png
      user.click(await screen.findByTestId('DownloadIcon'))
      user.click(await screen.findByRole('menuitem', { name: 'PNG' }))
      await select(await screen.findByRole('menu'), 'PNG')

      expect(downloaderMock).toHaveBeenCalled()
    })
  })

  it('Download png when the `PDF` clicked.', async () => {
    const user = userEvent.setup()

    render(<Home />)

    const downloaderMock = await jest
      .spyOn(Downloader.prototype, 'download')
      .mockReturnValue(Promise.resolve(true))
    act(async () => {
      // download png
      user.click(await screen.findByTestId('DownloadIcon'))
      user.click(await screen.findByRole('menuitem', { name: 'PDF' }))
      await select(await screen.findByRole('menu'), 'PDF')

      expect(downloaderMock).toHaveBeenCalled()
    })
  })
})
