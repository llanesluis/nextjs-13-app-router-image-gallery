import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Container, SSRProvider } from '../components/bootsrap'
import NavBar from '../components/NavBar'

import Providers from '../providers'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Gallery App Router',
  description: 'Tutorial project using the NextJS 13 App router',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.className} bg-slate-100 dark:bg-gray-800  dark:text-white`}>
        <Providers>
          <SSRProvider>
            <header>
              <NavBar />
            </header>
            <main>
              <Container className='py-4'>{children}</Container>
            </main>
            <footer></footer>
          </SSRProvider>
        </Providers>
      </body>
    </html>
  )
}
