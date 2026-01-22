import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContactCTA from "../components/ContactCTA";
import WhyChooseSlink from "../components/WhyChooseSlink";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="w-full min-h-screen bg-white px-6 md:px-12 lg:px-12">
      <Hero />
      <ContactCTA />
      <WhyChooseSlink />
    </div>
  );
};

export default Landing;
