export interface UnsplashImage {
  description: string
  user: {
    username: string
  }
  urls: {
    raw: string
  }
  width: number
  height: number
}

export interface UnsplashTopic {
  id: string
  slug: string
  title: string
  description: string
  total_photos: number
}

export interface UnsplashUser {
  id: string
  username: string
  name: string
  bio: string
  profile_image: { large: string }
  total_photos: number
  links: { photos: string }
}
