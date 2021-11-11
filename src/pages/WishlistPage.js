import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class Wishlist extends Component {
    removeWishlist = (movie) => {
        let wishlist = JSON.parse(Cookies.get('wishlist'))
        let inWishlist = false

        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].imdbID == movie.imdbid) {
                inWishlist = true
                break
            }
        }

        wishlist = wishlist.filter(wishlistMovie => wishlistMovie.Title != movie.Title)

        wishlist = JSON.stringify(wishlist)
        Cookies.set('wishlist', wishlist)
    }

    render() {
        const movies = JSON.parse(Cookies.get('wishlist'))

        return (
            <Container className="mt-3">
                <Row>
                    <h5>Movie Wishlist</h5>
                    <Col>
                        <ListGroup>
                            {
                                movies
                                    ? movies.map(movie =>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={movie.Poster} width="32" />
                                                </Col>
                                                <Col>
                                                    <p>{movie.Title}</p>
                                                </Col>
                                                <Col className="d-flex justify-content-end">
                                                    <Button variant="outline-danger" size="sm" onClick={() => this.removeWishlist(movie)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)
                                    : <p>Empty wishlist</p>
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}
