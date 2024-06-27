'use client'
import domtoimage from 'dom-to-image'

export class Downloader {
  private readonly fileName: string = 'life-timeline'

  /**
   * Downloads a file specified with the format
   * @param targetElement The HTML element to download.
   * @param format The format to download.
   * @returns A Promise<boolean> indicating whether the download was successful.
   */
  async download(targetElement: HTMLElement, format: string): Promise<boolean> {
    let downloadElement: HTMLAnchorElement
    const bgColor: string = '#f7f6ea'
    switch (format) {
      case 'svg':
        downloadElement = document.createElement('a')
        downloadElement.href = await domtoimage.toSvg(targetElement, {
          width: targetElement.clientWidth,
          height: targetElement.clientHeight,
          bgcolor: bgColor,
        })
        downloadElement.download = `${this.fileName}.svg`
        downloadElement.click()
        break
      case 'png':
        downloadElement = document.createElement('a')
        downloadElement.href = await domtoimage.toPng(targetElement, {
          width: targetElement.clientWidth,
          height: targetElement.clientHeight,
          bgcolor: bgColor,
        })
        downloadElement.download = `${this.fileName}.png`
        downloadElement.click()
        break
      case 'pdf':
        if (typeof window !== 'undefined') {
          const html2pdf = (await import('html2pdf.js')).default
          downloadElement = document.createElement('a')
          const svgUri = await domtoimage.toSvg(targetElement, {
            width: targetElement.clientWidth,
            height: targetElement.clientHeight,
            bgcolor: bgColor,
          })

          const svgRegex = /<svg[\s\S].*<\/svg>/
          const match = svgUri.match(svgRegex)
          if (!match) {
            console.error('Content to export is not found.')
            return false
          }
          const svg = match[0]

          const fileName = `${this.fileName}.pdf`

          const opt = {
            filename: fileName,
          }

          if (typeof self !== 'undefined') {
            const blob = await html2pdf().set(opt).from(svg).output('blob')
            const pdfUrl = URL.createObjectURL(blob)
            downloadElement.href = pdfUrl
            downloadElement.download = fileName
            downloadElement.click()
            URL.revokeObjectURL(pdfUrl)
          }
        }
        break
      default:
        console.error(`Invalid download format. ${format}`)
        return false
    }
    return true
  }
}
