import domtoimage from 'dom-to-image'
import 'fake-indexeddb/auto'
import { Downloader } from '@/api/Downloader'

jest.mock('html2pdf.js', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    output: jest.fn().mockResolvedValue(new Blob(['test_pdf'], { type: 'application/pdf' })),
  })),
}))

describe('Downloader Test', () => {
  describe('download()', () => {
    const mockSvgUri =
      'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="873" height="205"><foreignObject x="0" y="0" width="100%" height="100%"><div id="target-download-component-id"></div></foreignObject></svg>'
    const mockPngUri = 'data:image/png;base64,test_png'
    const mockPdfUri = 'blob:url'
    const testData = [
      { format: 'svg', expectedHref: mockSvgUri },
      { format: 'png', expectedHref: mockPngUri },
      { format: 'pdf', expectedHref: mockPdfUri },
    ]
    let mockAnchor: HTMLAnchorElement

    beforeAll(() => {
      // mock anchor in download event
      mockAnchor = document.createElement('a')
      mockAnchor.download = ''
      mockAnchor.click = jest.fn()

      jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor)

      // mock domtoimage
      jest.spyOn(domtoimage, 'toSvg').mockReturnValue(Promise.resolve(mockSvgUri))
      jest.spyOn(domtoimage, 'toPng').mockReturnValue(Promise.resolve(mockPngUri))

      global.URL.createObjectURL = jest.fn().mockReturnValue(mockPdfUri)
      global.URL.revokeObjectURL = jest.fn()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    testData.forEach(({ format, expectedHref }) => {
      test(`Download with "${format}".`, async () => {
        const testDom = document.createElement('div')
        testDom.innerHTML = `<p>Hello Test with ${format}</p>`
        testDom.setAttribute('clientWidth', '100')
        testDom.setAttribute('clientHeight', '100')

        const downloader: Downloader = new Downloader()
        await downloader.download(testDom, format)

        expect(mockAnchor.href).toEqual(expectedHref)
        expect(mockAnchor.download).toEqual(`life-timeline.${format}`)
        expect(mockAnchor.click).toHaveBeenCalled()
      })
    })
  })
})
