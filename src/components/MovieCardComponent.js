import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Card, Col, Button, Row } from 'react-bootstrap'
import { MovieModalComponent } from '.'
import Cookies from 'js-cookie'

export default class MovieCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            wishlist: []
        }
    }

    detailsModalRef = (obj) => {
        this.showModal = obj && obj.handleShow
    }

    onViewMoreClick = () => {
        this.showModal()
    }

    wishlistCheck = (movie) => {
        let wishlist = JSON.parse(Cookies.get('wishlist'))
        let inWishlist = false
        
        for(let i = 0; i < wishlist.length; i++) {
            if(wishlist[i].imdbID == movie.imdbid) {
                inWishlist = true
                break
            }
        }

        if (inWishlist) {
            wishlist = wishlist.filter(wishlistMovie => wishlistMovie.Title != movie.Title)
        } else {
            wishlist.push(movie)
        }

        wishlist = JSON.stringify(wishlist)
        Cookies.set('wishlist', wishlist)
    }

    componentDidUpdate(prevState) {
        if (JSON.parse(Cookies.get('wishlist')) !== prevState.wishlist) {
            console.log('OK')
            this.setState({ wishlist: JSON.parse(Cookies.get('wishlist')) })
        }
    }

    render() {
        const { movie, inWishlist } = this.props

        return (
            <Col md={3} className="mb-3">
                <Card>
                    <Card.Img variant="top" src={movie.Poster} />
                    <Card.Body>
                        <Card.Text>{movie.Title} <strong>({movie.Year})</strong></Card.Text>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary" size="sm" onClick={() => this.onViewMoreClick()} className="me-2"><FontAwesomeIcon icon={faEye} /></Button>
                                <Button variant={inWishlist ? "danger" : "outline-danger"} size="sm" onClick={() => this.wishlistCheck(movie)}><FontAwesomeIcon icon={faHeart} /></Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <MovieModalComponent ref={this.detailsModalRef} movie={movie} />
            </Col>
        )
    }
}
