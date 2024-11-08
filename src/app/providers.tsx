'use client'
import LayoutProvider from '@/provider/layoutContext'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'

export function Providers({
  children, className, ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <NextUIProvider className={className} {...props} id="providers">
      <ThemeProvider attribute='class' defaultTheme='system'>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}
