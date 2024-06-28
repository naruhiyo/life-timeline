'use client'
import domtoimage from 'dom-to-image'

export class Downloader {
  private readonly fileName: string = 'life-timeline'

  private replaceEncodedNewlines(input: string): string {
    return input.replace(/<p([^>]*)>(.*?)<\/p>/g, (match, p1, p2) => {
      const replacedContent = p2.replace(/%0A/g, '\n')
      return `<p${p1}>${replacedContent}</p>`
    })
  }

  private updateSvgScale(svgString: string, scaleFactor: number): string {
    const svgTagMatch = svgString.match(/<svg[^>]*>/)
    if (!svgTagMatch) {
      throw new Error('Could not find svg tag')
    }
    const svgTag = svgTagMatch[0]
    const viewBoxMatch = svgTag.match(/viewBox="([^"]*)"/)

    if (viewBoxMatch) {
      const viewBox = viewBoxMatch[1]
      const [minX, minY, width, height] = viewBox.split(' ').map(Number)
      const newWidth = width / scaleFactor
      const newHeight = height / scaleFactor
      const newViewBox = `${minX} ${minY} ${newWidth} ${newHeight}`
      return svgString.replace(viewBox, newViewBox)
    } else {
      const widthMatch = svgTag.match(/width="([^"]*)"/)
      const heightMatch = svgTag.match(/height="([^"]*)"/)

      if (!widthMatch || !heightMatch) {
        throw new Error('Could not find width, height in svg')
      }

      const width = parseFloat(widthMatch[1])
      const height = parseFloat(heightMatch[1])

      const newWidth = width / scaleFactor
      const newHeight = height / scaleFactor
      const newViewBox = `viewBox="0 0 ${newWidth} ${newHeight}"`

      return svgString.replace(svgTag, svgTag.replace(/>$/, ` ${newViewBox}>`))
    }
  }

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
          const svgWithoutNewLine = match[0]
          const svg = this.replaceEncodedNewlines(svgWithoutNewLine)
          // 794px is A4 width
          const scale = targetElement.offsetWidth > 794 ? 794 / targetElement.offsetWidth : 1
          const ScaledSvg = this.updateSvgScale(svg, scale)

          const fileName = `${this.fileName}.pdf`

          const opt = {
            filename: fileName,
          }

          if (typeof self !== 'undefined') {
            const blob = await html2pdf().set(opt).from(ScaledSvg).output('blob')
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
