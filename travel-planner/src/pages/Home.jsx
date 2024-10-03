import React from 'react';
import Header from '../components/Header';
import Destinations from '../components/Destinations';
import Offer from '../components/Offer'
import Activities from '../components/Activities';
import Testimonial from '../components/Testimonial';
import Blog from '../components/Blog';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Destinations />
      <Offer />
      <Activities  />
      <Testimonial />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
