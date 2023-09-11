import { Alert } from '@/components/bootsrap'
import { UnsplashImage } from '@/models/unsplash-image'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Static fetching - App Router',
}
export default async function StaticPage() {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' + process.env.UNSPLASH_API_KEY
  )
  const randomImg: UnsplashImage = await response.json()

  //console.log(randomImg)

  //Para calcular dinamicamente el minimo width y height de la imagen
  const width = Math.min(500, randomImg.width)
  const height = (width / randomImg.width) * randomImg.height

  return (
    <div className='d-flex flex-column align-items-center'>
      <Alert>
        This page <strong>fetches and caches data at build time</strong>. Even though the Unsplash
        API always returns a new image, we see the same image after refreshing the page until we
        compile and build the project again.
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
