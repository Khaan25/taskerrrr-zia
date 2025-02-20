'use client'

// react-scan must be imported before react

// eslint-disable-next-line prettier/prettier
import { JSX, useEffect } from 'react'
import { scan } from 'react-scan'

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return <></>
}
