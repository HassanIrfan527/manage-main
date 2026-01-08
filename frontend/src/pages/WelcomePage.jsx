import React from 'react';
import Hero from '../components/welcome/Hero';
import Features from '../components/welcome/Features';
import FAQ from '../components/welcome/FAQ';
import Footer from '../components/welcome/Footer';
import Navbar from '../components/ui/navbar';
const WelcomePage = () => {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
};

export default WelcomePage;
