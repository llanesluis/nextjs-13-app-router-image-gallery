'use client'

import { UnsplashImage } from '@/models/unsplash-types'
import { FormEvent, useState } from 'react'
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Spinner,
} from 'react-bootstrap'

export default function SearchPage() {
  //TODO: Cambiar a SWR para fetch desde el cliente
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null)
  const [searchResultsLoading, setSearchResultsLoading] = useState(false)
  const [searchResultsIsError, setSearchResultsIsError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const formData = new FormData(form)
    const query = formData.get('query')?.toString().trim()

    // TODO: Mandar query a la API
    if (query) {
      try {
        setSearchResults(null)
        setSearchResultsIsError(false)
        setSearchResultsLoading(true)

        const res = await fetch(`/api/search?query=${query}`)
        const images: UnsplashImage[] = await res.json()

        setSearchResults(images)
      } catch (error) {
        console.log(error)

        setSearchResultsIsError(true)
      } finally {
        setSearchResultsLoading(false)
      }
    }

    form.reset()
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not leak API credentials,
        the request is sent to a NEXTjs <strong>route handler</strong> that runs on the server. This
        route handler then fetches the data from the Unsplash API and returns it to the client.
      </Alert>

      <Form onSubmit={handleSubmit}>
        <FormGroup className='mb-3' controlId='search-input'>
          <FormLabel>Search query</FormLabel>
          <FormControl name='query' placeholder='E.g. cats, holidays, fitness...' />
        </FormGroup>
        <Button className='mb-3' type='submit' disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>

      <div className='d-flex flex-column align-items-center'>
        {searchResultsLoading && <Spinner animation='border' />}
        {searchResultsIsError && <p>Something went wrong, please try again...</p>}
        {searchResults?.length === 0 && <p>Nothing found, try another query...</p>}
      </div>

      {searchResults && (
        <>
          {searchResults.map((img) => (
            <Image
              key={img.urls.raw}
              src={img.urls.raw}
              alt={img.description}
              width={250}
              height={250}
              className='rounded shadow'
              style={{ objectFit: 'cover', margin: 4 }}
            />
          ))}
        </>
      )}
    </div>
  )
}
