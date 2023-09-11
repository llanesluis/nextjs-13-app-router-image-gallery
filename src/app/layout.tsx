import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Container, SSRProvider } from '../components/bootsrap'
import NavBar from './NavBar'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Gallery App Router',
  description: 'Tutorial project using the NextJS 13 App router',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <SSRProvider>
          <NavBar />
          <main>
            <Container className='py-4'>{children}</Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  )
}
