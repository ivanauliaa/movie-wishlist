import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, WishlistPage } from './pages'
import { NavbarComponent } from './components'
import Cookies from 'js-cookie'

export default class App extends Component {
  render() {
    if (Cookies.get('wishlist') === undefined) {
      Cookies.set('wishlist', JSON.stringify([]), {path: '/'})
    }

    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/wishlist" element={<WishlistPage />} exact />
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}
