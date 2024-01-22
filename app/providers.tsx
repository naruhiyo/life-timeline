'use client'

import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return <NextUIProvider>{children}</NextUIProvider>
}
