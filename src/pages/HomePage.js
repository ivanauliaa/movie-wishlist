import '../App.css';
import React, { Component } from 'react'
import { Container, Form, FormControl, Row, Button } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import axios from 'axios'
import { MovieCardComponent } from '../components';
import Cookies from 'js-cookie'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.textInput = React.createRef()
        this.state = {
            movies: [],
        }
    }

    componentDidMount() {
        const params = {
            apikey: 'b14cc9f3',
            s: 'avengers'
        }

        axios
            .get(API_URL + '?apikey=' + params.apikey + '&s=' + params.s)
            .then(res => {
                const movies = res.data.Search
                this.setState({ movies })
            })
            .catch(error => console.log(error))
    }

    onSearch() {
        this.setState({ movies: [] })
        
        const params = {
            apikey: 'b14cc9f3',
            s: this.textInput.current.value
        }

        axios
            .get(API_URL + '?apikey=' + params.apikey + '&s=' + params.s)
            .then(res => {
                const movies = res.data.Search
                this.setState({ movies })
            })
            .catch(error => console.log(error))
    }

    // componentDidUpdate(prevState) {
    //     if (this.state.movies !== prevState.movies) {
    //         const params = {
    //             apikey: 'b14cc9f3',
    //             s: this.textInput.current.value
    //         }

    //         axios
    //             .get(API_URL + '?apikey=' + params.apikey + '&s=' + params.s)
    //             .then(res => {
    //                 const movies = res.data.Search
    //                 this.setState({ movies })
    //             })
    //             .catch(error => console.log(error))
    //     }
    // }

    handleChange() {
        const value = this.textInput.current.value
        if(value) {
          console.log(value)
        }
    }

    render() {
        const { movies } = this.state

        return (
            <Container className="mt-3">
                <Form className="d-flex mt-3">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        ref={this.textInput}
                        onChange={() => this.handleChange()}
                    />
                    <Button variant="outline-success" onClick={() => this.onSearch()}>Search</Button>
                </Form>
                <Row className="mt-3">
                    {
                        movies && movies.map(movie => {
                            const inWishlist = Cookies.get('wishlist').includes(movie.Title)
                            return <MovieCardComponent movie={movie} inWishlist={inWishlist} />
                        }
                        )
                    }
                </Row>
            </Container>
        )
    }
}