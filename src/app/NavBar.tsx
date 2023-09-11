'use client'

import Link from 'next/link'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const pathname = usePathname()

  return (
    <Navbar bg='black' variant='dark' sticky='top' expand='sm' collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} href='/'>
          Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav>
            <Nav.Link as={Link} href='/static' active={pathname == '/static'}>
              Static fetching
            </Nav.Link>
            <Nav.Link as={Link} href='/dynamic' active={pathname == '/dynamic'}>
              Dynamic fetching
            </Nav.Link>
            <Nav.Link as={Link} href='/isr' active={pathname == '/isr'}>
              ISR
            </Nav.Link>
            <NavDropdown title='Topics' id='topics-dropdown'>
              <NavDropdown.Item as={Link} href='/topics/health'>
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href='/topics/wallpapers'>
                Wallpapers
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href='/topics/coding'>
                Coding
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} href='/users' active={pathname == '/users'}>
              Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
