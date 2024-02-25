import domtoimage from 'dom-to-image'

export class Downloader {
  private readonly fileName: string = 'life-timeline'

  /**
   * Downloads a file specified with the format
   * @param targetElementId The id of the HTML element to download.
   * @param format The format to download.
   * @returns A Promise<boolean> indicating whether the download was successful.
   */
  async download(targetElementId: string, format: string): Promise<boolean> {
    const targetElement = document.getElementById(targetElementId)
    if (targetElement == null) {
      console.error(`Could not get element to download: ${targetElementId}`)
      return false
    }
    let downloadElement: HTMLAnchorElement
    let bgColor: string
    switch (format) {
      case 'svg':
        downloadElement = document.createElement('a')
        bgColor = window.getComputedStyle(document.body).backgroundColor
        downloadElement.href = await domtoimage.toSvg(targetElement, {
          width: targetElement.clientWidth,
          height: targetElement.clientHeight,
          bgcolor: bgColor,
        })
        downloadElement.download = `${this.fileName}.svg`
        break
      case 'png':
        downloadElement = document.createElement('a')
        downloadElement.href = await domtoimage.toPng(targetElement, {
          width: targetElement.clientWidth,
          height: targetElement.clientHeight,
        })
        downloadElement.download = `${this.fileName}.png`
        break
      case 'pdf':
        console.log('pdf will be supported in the future')
        return false
      default:
        console.error(`Invalid download format. ${format}`)
        return false
    }
    downloadElement.click()
    return true
  }
}
