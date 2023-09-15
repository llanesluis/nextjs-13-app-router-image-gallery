import { UnsplashTopic } from '@/models/unsplash-types'
import Link from 'next/link'

export const metadata = {
  title: 'Topics | App Router',
}

export default async function TopicsPage() {
  const res = await fetch(
    `https://api.unsplash.com/topics?client_id=${process.env.UNSPLASH_API_KEY}&per_page=20`
  )
  const topics: UnsplashTopic[] = await res.json()

  return (
    <section>
      <h1>Topics</h1>
      <p>
        View from <strong>{topics.length}</strong> topics
      </p>
      <hr />
      <ul>
        {topics.map((topic) => (
          <>
            {' '}
            <li key={topic.id} id={topic.slug}>
              <Link href={`/topics/${topic.slug}`}>{topic.title}</Link> |{' '}
              <small>{topic.total_photos} photos</small>
            </li>
            <hr />
          </>
        ))}
      </ul>
    </section>
  )
}
