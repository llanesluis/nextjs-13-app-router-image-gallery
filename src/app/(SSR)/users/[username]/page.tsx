import { UnsplashImage } from '@/models/unsplash-types'
import Image from 'next/image'

interface UserPageProps {
  params: { username: string }
}

export default async function UserPage({ params: { username } }: UserPageProps) {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}/photos?client_id=${process.env.UNSPLASH_API_KEY}`
  )
  const userImgs: UnsplashImage[] = await res.json()

  return (
    <section>
      <h1>
        User: <i>{username}</i>
      </h1>
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
          const width = Math.min(300, img.width)
          const height = (width / img.width) * img.height
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
