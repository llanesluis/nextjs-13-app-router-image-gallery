import { Alert } from '@/components/bootsrap'
import { UnsplashImage } from '@/models/unsplash-image'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Incremental Static Regeneration - App Router',
}

//?Ponerlo afuera aplica para toda la pagina, ponerlo adentro es para decirle a next que aplique para un fetch en especifico
export const revalidate = 15
//O poner esto como segundo parametro al fetch:
//{ next: {revalidate: x } }

////{ cache: 'no-cache' } o { cache: 'no-store' } porque necesitan estar en cache por un periodo de tiempo

export default async function ISRPage() {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' + process.env.UNSPLASH_API_KEY,
    {
      // next: { revalidate: x }
    }
  )
  const randomImg: UnsplashImage = await response.json()

  //Para calcular dinamicamente el minimo width y height de la imagen
  const width = Math.min(500, randomImg.width)
  const height = (width / randomImg.width) * randomImg.height

  return (
    <div className='d-flex flex-column align-items-center'>
      <Alert>
        This page uses <strong>Incremental Static Regeneration (ISR)</strong>. The user will request
        a fetch and will get an image, if the page is refreshed before x time, the image will not be
        rendered again, until the page is refreshed after some x time.
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
