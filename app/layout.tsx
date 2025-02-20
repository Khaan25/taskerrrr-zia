import type { Metadata } from 'next'

import './globals.css'

import React from 'react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ReactScan } from '@/components/react-scan'
import RootLayout from '@/components/root-layout'
import TopLoadingBar from '@/components/top-loading-bar'

export const metadata: Metadata = {
  title: 'Task Management System',
  description: 'Some Desc.',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <ReactScan />
      <body className={cn('!mr-0 min-h-screen bg-background font-sans antialiased', GeistSans.variable, GeistMono.variable)} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TopLoadingBar />
          <RootLayout>{children}</RootLayout>
          <Toaster richColors closeButton className="font-manrope z-[1000]" />
        </ThemeProvider>
      </body>
    </html>
  )
}
