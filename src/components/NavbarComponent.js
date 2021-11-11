import React from 'react'
import { Container, Nav, Navbar, Badge } from 'react-bootstrap'
import Cookies from 'js-cookie'

const NavbarComponent = () => {
    const wishlistCount = JSON.parse(Cookies.get('wishlist')).length

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Movie Collector</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/wishlist">
                        Wishlist <Badge pill bg="danger">
                            {wishlistCount}
                        </Badge>{' '}
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent