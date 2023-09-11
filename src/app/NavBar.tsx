'use client'

import Link from 'next/link'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const pathname = usePathname()

  return (
    <Navbar bg='primary' variant='dark' sticky='top' expand='sm' collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} href='/'>
          Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav>
            <Nav.Link as={Link} href='/static' active={pathname == '/static'}>
              Static
            </Nav.Link>
            <Nav.Link as={Link} href='/' active={pathname == '/page2'}>
              Pag 2
            </Nav.Link>
            <Nav.Link as={Link} href='/' active={pathname == '/pag3'}>
              Pag 3
            </Nav.Link>
            <Nav.Link as={Link} href='/' active={pathname == '/pag4'}>
              Pag 4
            </Nav.Link>
            <Nav.Link as={Link} href='/' active={pathname == '/users'}>
              Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
