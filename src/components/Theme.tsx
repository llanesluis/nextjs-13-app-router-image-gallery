'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Theme() {
  //Resolved theme regresa 'dark' o 'light' segun lo que resulte del system color preference, theme regresa el valor del local storage
  const { resolvedTheme, theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted)
    return (
      <section>
        <select></select>
      </section>
    )

  return (
    <section>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className='bg-slate-100 dark:bg-slate-700'
      >
        <option value={'system'}>System</option>
        <option value={'light'}>Light</option>
        <option value={'dark'}>Dark</option>
      </select>
    </section>
  )
}
