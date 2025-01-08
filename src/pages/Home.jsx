import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { Announcement } from '../components/Announcement/Announcement'
import { Slider } from '../components/Slider/Slider'
import { Categories } from '../components/Categories/Categories'
import { Products } from '../components/Products/Products'
import { Newsletter } from '../components/Newsletter/Newsletter'
import { Footer } from '../components/Footer/Footer'

export default function Home() {

  return (
    <div>
        <Announcement />
        <Navbar />
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
        <Footer />
    </div>
  )
}