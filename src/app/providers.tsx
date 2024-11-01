'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}
export function Providers({
  children, className, ...props
}: Props) {
  return (
    <NextUIProvider className={className} {...props} id="providers">
      <ThemeProvider attribute='class' defaultTheme='system'>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}
