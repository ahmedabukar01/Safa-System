import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from './lib/apollo-wrapper'
import { AppProvider } from './lib/AppContext'
import LayoutTheme from './components/layouts/HomeLayout'
import { cookies } from 'next/headers'
import { CookiesProvider } from 'next-client-cookies'
import { ClientCookiesProvider } from './lib/clientCookie'
import { Providers } from './globalRedux/provider'
import { ConfigProvider } from 'antd'
import { customTheme } from './utils/config'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Safaa Online System',
  description: 'The POS System Built for Simplicity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
          {/* <AppProvider>  */}
          <Providers>
          <ClientCookiesProvider value={cookies().getAll()}>
            <ApolloWrapper>
              <ConfigProvider theme={customTheme}>
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </ConfigProvider>
            </ApolloWrapper>
            </ClientCookiesProvider>
            </Providers>
          {/* </AppProvider> */}
      </body>
    </html>
  )
}
