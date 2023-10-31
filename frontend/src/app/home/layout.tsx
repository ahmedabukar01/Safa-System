import React from 'react'
import LayoutTheme from '../components/layouts/HomeLayout'

export default function HomeLayout({children}: any) {
  return (
    <LayoutTheme>{children}</LayoutTheme>
  )
}
