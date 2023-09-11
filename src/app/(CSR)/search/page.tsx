import SearchPage from './SearchPage'

export const metadata = {
  title: 'Search | App Router',
}

export default function Page() {
  //Como esta pagina debe ser ejecutada en el cliente, pero el metadata en el servidor, se crea un componente que se ejecutara en el cliente y sera importado aqui.
  return <SearchPage />
}
