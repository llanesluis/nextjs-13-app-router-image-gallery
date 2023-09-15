import { Alert } from '@/components/bootsrap'
import { UnsplashImage } from '@/models/unsplash-types'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface TopicPageProps {
  params: { topic: string }
}

export function generateMetadata({ params: { topic } }: TopicPageProps): Metadata {
  return { title: `${topic} | App Router` }
}

//?Si no quieres cachear la data
//export const revalidate = 0

//?Con 'export const dynamicParams = false' NEXT no renderizara ningun otro topic que no este especificado en generateStaticParams().
//export const dynamicParams = false

//Para indicar que paginas se renderizaran en build time >> Equivalente a getStaticPaths del pages router
export function generateStaticParams() {
  return ['health', 'wallpapers', 'coding'].map((topic) => ({ topic }))
}

export default async function TopicPage({ params: { topic } }: TopicPageProps) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_API_KEY}`
  )
  const photos: UnsplashImage[] = await res.json()

  return (
    <section>
      <Alert>
        This pase uses <strong>generateStaticParams()</strong> to render and cache static pages at
        build time, even though the URL allows a dynamic parameter. Pages that are not included in
        generateStaticParams() {` `}
        <strong>
          will be fetched and rendered on first access and then cached for subsequent requests
        </strong>
        , this can be disabled by setting <i>export const dynamicParams = false</i> and only the
        pages generated at build time will exist.
      </Alert>
      <Link href={'/topics'}>Go to all topics</Link>
      <h1>{topic}</h1>
      <hr />
      <div className='container w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2" justify-items-center'>
        {photos.map((photo, i) => {
          return (
            <div key={i}>
              <div className='flex w-[250px] h-[250px] overflow-hidden m-2'>
                <Image
                  alt={photo.description}
                  src={photo.urls.raw}
                  height={250}
                  width={250}
                  className='rounded shadow object-cover'
                />
              </div>
              <Link href={`/users/${photo.user.username}`}>{photo.user.username}</Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
