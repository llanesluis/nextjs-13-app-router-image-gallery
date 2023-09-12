import { Alert } from '@/components/bootsrap'
import { UnsplashImage, UnsplashUser } from '@/models/unsplash-types'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface UserPageProps {
  params: { username: string }
}

async function getUser(username: string): Promise<UnsplashUser> {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_API_KEY}`
  )

  //Si no existe el usuario, redirigir a la pgina not-found
  if (res.status === 404) notFound()

  return await res.json()
}

//'generateMetadata()' puede ser async cuando necesita valores dinamicos, NEXT automaticamente se encarga de "de-duplicar" el fetch y solo toma un fetch como valdo y lo pasa al componente !!! SOLO FUNCIONA CON FETCH
export async function generateMetadata({ params: { username } }: UserPageProps): Promise<Metadata> {
  const user = await getUser(username)

  return { title: `${user.name || user.username}'s profile | App Router` }
}
//?const getUserCached = cache(getUser) > use cache if not using the native fetch

export default async function UserPage({ params: { username } }: UserPageProps) {
  //Fetch al usuario
  const user = await getUser(username)

  //Fetch a las fotos del usuario
  const resUserImgs = await fetch(`${user.links.photos}?client_id=${process.env.UNSPLASH_API_KEY}`)
  const userImgs: UnsplashImage[] = await resUserImgs.json()

  return (
    <section>
      <Alert>
        This profile page uses <strong>async - generateMetadata()</strong> to set the page title{' '}
        {` `}
        <strong>dinamically from the API response</strong>.
      </Alert>
      <div className='d-flex gap-4 mb-2'>
        <Image src={user.profile_image.large} alt={user.name} height={120} width={120} />
        <h3>{user.name}</h3>
      </div>
      <p>
        <strong>
          <a href={`https://unsplash.com/${user.username}`} target='_blank'>
            @{user.username}
          </a>
        </strong>
      </p>
      <p>{user.bio}</p>
      <p>Total photos: {user.total_photos}</p>
      <hr />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '10px',
          placeItems: 'center',
        }}
      >
        {userImgs.map((img) => {
          //Para calcular dinamicamente el minimo width y height de la imagen
          return (
            <div key={img.user.username} className='d-grid'>
              <Image
                key={img.user.username}
                alt={img.description}
                src={img.urls.raw}
                height={300}
                width={300}
                className='rounded shadow'
                style={{ objectFit: 'cover' }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
