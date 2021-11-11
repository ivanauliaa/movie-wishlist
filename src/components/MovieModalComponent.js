import React, { Component } from 'react'
import { Modal, Row, Col, Image, ListGroup } from 'react-bootstrap';

export default class MovieModalComponent extends Component {
    constructor(props) {
        super(props)

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            show: false,
        }
    }

    handleShow = () => this.setState({ show: true })
    handleClose = () => this.setState({ show: false })

    render() {
        const { movie } = this.props
        
        return (
            <>
                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Image src={movie.Poster} />
                            </Col>
                            <Col>
                                <ListGroup>
                                    <ListGroup.Item>Title: {movie.Title}</ListGroup.Item>
                                    <ListGroup.Item>Year: {movie.Year}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}