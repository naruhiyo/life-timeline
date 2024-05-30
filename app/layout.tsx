import '@/components/globals.css'
import { Navbar, NavbarBrand, Image, Spacer } from '@nextui-org/react'
import type { Metadata } from 'next'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: {
    template: '%s | Life-timeline',
    default: 'Life-timeline | 人生を振り返ってみよう!',
  },
  keywords: ['Life-timeline', 'Naruhiyo Project', 'comet', 'narugit'],
  authors: [{ name: 'team naruhiyo', url: 'https://naruhiyo.github.io/' }],
  description: '人生を振り返ってみよう!',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: [
    { rel: 'icon', url: '/images/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/images/apple-touch-icon.png' },
  ],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Life-timeline | 人生を振り返ってみよう!',
    description: '人生を振り返ってみよう!',
    siteName: 'Life-timeline',
    images: [
      {
        url: '/images/logo.png',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html
      lang='ja'
      className='dark'
      prefix='og: http://ogp.me/ns# website: http://ogp.me/ns/websaite#'
    >
      <body>
        <Navbar shouldHideOnScroll isBordered position='static'>
          <NavbarBrand>
            <Image height={36} width={36} isBlurred src='/images/logo.png' alt='Logo' />
            <Spacer x={4} />
            <p className='font-bold '>Lie-tfimeline</p>
          </NavbarBrand>
        </Navbar>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
