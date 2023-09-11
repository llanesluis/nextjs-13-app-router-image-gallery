import { UnplashSearchResponse } from '@/models/unsplash-types'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 })
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_API_KEY}`
  )

  const { results }: UnplashSearchResponse = await response.json()

  return NextResponse.json(results)
}
