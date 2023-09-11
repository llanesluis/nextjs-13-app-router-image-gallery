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
      <Link href={'/topics'}>Go to all topics</Link>
      <h1>{topic}</h1>
      <hr />
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '10px',
          placeItems: 'center',
        }}
      >
        {photos.map((photo) => {
          return (
            <div key={photo.user.username} className='d-grid'>
              <Image
                //key={photo.user.username}
                alt={photo.description}
                src={photo.urls.raw}
                height={250}
                width={250}
                className='rounded shadow-sm'
                style={{ objectFit: 'cover' }}
              />
              <Link href={`/users/${photo.user.username}`}>{photo.user.username}</Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
