import domtoimage from 'dom-to-image'
import 'fake-indexeddb/auto'
import { Downloader } from '@/api/Downloader'

describe('Downloader Test', () => {
  describe('download()', () => {
    let mockAnchor: HTMLAnchorElement

    beforeAll(() => {
      // mock anchor in download event
      mockAnchor = document.createElement('a')
      mockAnchor.download = ''
      mockAnchor.click = jest.fn()

      jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor)

      // mock domtoimage
      jest.spyOn(domtoimage, 'toSvg').mockReturnValue(Promise.resolve('test_svg'))
      jest.spyOn(domtoimage, 'toPng').mockReturnValue(Promise.resolve('test_png'))
    })

    afterEach(() => {
      jest.clearAllMocks()
    })
    ;['svg', 'png'].forEach((format: string) => {
      test(`Download with "${format}".`, async () => {
        const testDom = document.createElement('div')
        testDom.innerHTML = `<p>Hello Test with ${format}</p>`
        testDom.setAttribute('clientWidth', '100')
        testDom.setAttribute('clientHeight', '100')

        const downloader: Downloader = new Downloader()
        await downloader.download(testDom, format)

        expect(mockAnchor.href).toEqual(`http://localhost/test_${format}`)
        expect(mockAnchor.download).toEqual(`life-timeline.${format}`)
        expect(mockAnchor.click).toHaveBeenCalled()
      })
    })
  })
})
