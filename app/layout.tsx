'use client'
import '@/components/globals.css'
import { useEffect } from 'react'
import { DBLogic } from '@/api/DBLogic'
import { Providers } from '@/providers'

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const closeIndexedDB = async (): Promise<void> => {
    const logic = new DBLogic()
    await logic.close()
  }

  useEffect(() => {
    window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
      closeIndexedDB()
    })
  }, [])

  return (
    <html lang='ja' className='dark'>
      <head prefix='og: http://ogp.me/ns# website: http://ogp.me/ns/websaite#' />
      <title>Life-timeline</title>
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='title' content='Life-timeline' />
      <meta name='keywords' content='Life-timeline,Naruhiyo Project,hiyoko3,narugit' />
      <meta name='author' content='team naruhiyo' />
      <meta name='description' content='Your timeline-story' />
      <meta name='format-detection' content='telephone=no' />
      <link rel='canonical' href='/' />
      <link rel='icon' href='/images/favicon.ico' />
      <meta name='msapplication-TileImage' content='/images/favicon.ico' />
      <meta name='msapplication-TileColor' content='#f7f6f5' />
      <meta property='og:site_name' content='Life-timeline' />
      <meta property='og:title' content='Life-timeline' />
      <meta property='og:description' content='Your timeline-story' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='/' />
      <meta property='og:image' content='/images/favicon.ico' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='/' />
      <meta name='twitter:image' content='/images/favicon.ico' />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
