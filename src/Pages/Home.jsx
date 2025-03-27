import React from 'react'
import Hero from '../Components/Hero/Hero'
import LandingServices from '../Components/LandingServices/LandingServices'
import LandingProperties from '../Components/LandingProperties/LandingProperties'
import Footer from '../Components/Footer/Footer'
import Lnews from '../Components/LatestNews/Lnews'
import Instagram from '../Components/Instagram/Instagram'
import SubscriptionModal from './../Components/SubscriptionModal/SubscriptionModal';
import Testimonials from '../Components/Testimonials/Testimonials'
import Partners from '../Components/Partners/Partners'

const Home = () => {
  return (
    <>
    {/* <SubscriptionModal /> */}
    <Hero />
    <div className='divider'></div>
    <LandingServices />
    <LandingProperties />
    <Lnews />
    <Testimonials />
    {/* <Partners /> */}
    {/* <Instagram /> */}
    <Footer />
    </>
  )
}

export default Home