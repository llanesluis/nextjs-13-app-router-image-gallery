import { Alert } from '@/components/bootsrap'
import { UnsplashImage, UnsplashUser } from '@/models/unsplash-types'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import User from './User'

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
      <User user={user} userImgs={userImgs} />
    </section>
  )
}
