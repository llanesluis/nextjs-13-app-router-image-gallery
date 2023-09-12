import { UnplashSearchResponse } from '@/models/unsplash-types'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  //Como desde el componente le pasamos la query en los search params < await fetch(`/api/search?query=${query}`) >
  //para acceder a "query" debemos sacarlos de la URL
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  //Si no existe "query" mandar al cliente un mensaje de error
  if (!query) {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 })
  }

  //Entonces si existe "query" se hace la consulta a la API externa y se extraen los datos para ser pasados al cliente
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_API_KEY}`
  )
  //se regresa data:{ results:[....] } y se destructura directamente
  //const data: UnplashSearchResponse = await response.json()
  //const { results } = data

  const { results }: UnplashSearchResponse = await response.json()

  return NextResponse.json({ results })
}
