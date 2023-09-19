import { UnsplashImage, UnsplashUser } from '@/models/unsplash-types'
import Image from 'next/image'

interface UserProps {
  user: UnsplashUser
  userImgs: UnsplashImage[]
}

export default function User({ user, userImgs }: UserProps) {
  const { bio, name, username, total_photos, profile_image } = user

  return (
    <>
      <div className='d-flex gap-4 mb-2'>
        <Image src={profile_image.large} alt={name} height={120} width={120} />
        <h3>{name}</h3>
      </div>
      <p>
        <strong>
          <a href={`https://unsplash.com/${username}`} target='_blank'>
            @{username}
          </a>
        </strong>
      </p>
      <p>{bio}</p>
      <p>Total photos: {total_photos}</p>
      <hr />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '10px',
          placeItems: 'center',
        }}
      >
        <div className='container w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center'>
          {userImgs.map((img) => {
            //Para calcular dinamicamente el minimo width y height de la imagen
            return (
              <div key={img.user.username} className='flex w-[250px] h-[250px] overflow-hidden m-2'>
                <Image
                  key={img.user.username}
                  alt={img.description}
                  src={img.urls.raw}
                  height={300}
                  width={300}
                  className='rounded shadow object-cover'
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
