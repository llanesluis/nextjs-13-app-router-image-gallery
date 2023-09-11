'use client'

import Link from 'next/link'
import { Button } from 'react-bootstrap'

interface RootErrorProps {
  error: Error
  reset: () => void
}
export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <main>
      <h1>{error.message}</h1>
      <p>Something went wrong!</p>
      <p></p>
      <Button onClick={reset}>Try again</Button>
      <Link href={'/'}>Go home</Link>
    </main>
  )
}
