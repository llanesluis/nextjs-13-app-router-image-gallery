import { Alert } from '@/components/bootsrap'
import { UnsplashImage } from '@/models/unsplash-types'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Dynamic fetching | App Router',
}

//Equivalente a getServerSideProps del pages router
//?Ponerlo afuera aplica para toda la pagina, ponerlo adentro es para decirle a next que aplique para un fetch en especifico
//export const revalidate = 0

//O poner esto como segundo parametro al fetch:
//{ cache: 'no-cache' }
//{ cache: 'no-store' }
//{ next: {revalidate: 0 } }

export default async function DynamicPage() {
  const res = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' + process.env.UNSPLASH_API_KEY,
    {
      cache: 'no-cache',
      // cache: 'no-store'
      // next: { revalidate: 0 }
    }
  )
  const randomImg: UnsplashImage = await res.json()

  //Para calcular dinamicamente el minimo width y height de la imagen
  const width = Math.min(500, randomImg.width)
  const height = (width / randomImg.width) * randomImg.height

  return (
    <div className='d-flex flex-column align-items-center'>
      <Alert>
        This page <strong>fetches data dynamically</strong>. Every time the page is refreshed, a new
        image is rendered.
      </Alert>
      <Image
        src={randomImg.urls.raw}
        height={height}
        width={width}
        className='rounded shadow mw-100 h-100'
        alt={randomImg.description}
      />
      by <Link href={`/users/${randomImg.user.username}`}>{randomImg.user.username}</Link>
    </div>
  )
}
