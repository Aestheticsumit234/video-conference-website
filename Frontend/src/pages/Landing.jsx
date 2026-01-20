import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Landing = () => {
  return (
    <div className='w-full min-h-screen bg-white px-6 md:px-12 lg:px-20'>
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default Landing