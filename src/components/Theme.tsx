'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Theme() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section>
      <select
        value={resolvedTheme}
        onChange={(e) => setTheme(e.target.value)}
        className='bg-slate-100'
      >
        <option value={'system'}>System</option>
        <option value={'light'}>Light</option>
        <option value={'dark'}>Dark</option>
      </select>
    </section>
  )
}
