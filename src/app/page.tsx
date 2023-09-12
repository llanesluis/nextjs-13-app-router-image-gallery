import { Alert } from '../components/bootsrap'

export default function Home() {
  return (
    <>
      <Alert>
        <p>
          This is a sample project to showcase and learn the new{' '}
          <strong>NextJS App directory Router</strong> and its features, including:{' '}
        </p>
        <ul>
          <li>Static and Dynamic Server-Side Rendering (SSR)</li>
          <li>Incremental Static Regeneration (ISR)</li>
          <li>Client-Side Rendering</li>
          <li>Route handles (API endpoints)</li>
          <li>Metadata API</li>
        </ul>
        <p>
          Every page uses a different approach for <strong>fetching and caching data</strong>.
        </p>
      </Alert>
      <Alert variant='secondary'>
        <p>
          <strong>Note:</strong> In order to load the data on this site, you need to get a{' '}
          <a href='https://unsplash.com/developers' target='_blank'>
            free API key from Unsplash{' '}
          </a>
          and add it to your <small>.env.local</small> file as UNSPLASH_API_KEY.
        </p>
        <p>Unsplash has a free quota of 50 requests per hour.</p>
      </Alert>
    </>
  )
}
