'use client'

import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto my-8">{children}</div>
}
