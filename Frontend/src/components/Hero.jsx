import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Assets01 from "../assets/Assets001.jpg";
import Assets02 from "../assets/Assets002.jpg";
import Assets03 from "../assets/Assets003.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const words = [
    "Let's Connect",
    "Let's meet private",
    "Keep meeting",
    "Let's meet",
    "Hamsika",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center lg:items-start py-5 md:py-5">
      <div className="mb-8 self-start lg:self-auto">
        <div className="relative p-[1.5px] overflow-hidden rounded-full flex items-center justify-center">
          <div
            className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 90deg at 50% 50%, #000 0%, #D9D9D9 25%, #000 50%, #D9D9D9 75%, #000 100%)",
            }}
          />
          <div className="relative px-6 py-2 md:px-10 md:py-2 rounded-full bg-[#f9f9f9] flex items-center justify-center min-w-[180px] md:min-w-[220px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-sm md:text-lg font-semibold text-black"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
        <div className="max-w-2xl text-center lg:text-left z-10">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1] mb-6">
            Connect <span className="font-normal text-gray-400">with</span>
            <br />
            Confidence
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-lg mx-auto lg:mx-0 mb-5">
            High-quality video meeting build for speed, security and seamless
            collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to={"/register"} className="px-10 py-4 rounded-full border border-black text-xl font-medium hover:bg-black hover:text-white transition-all w-full sm:w-auto">
              Get Started
            </Link>
            <button className="px-10 py-4 rounded-full border border-gray-400 text-xl font-medium hover:bg-black hover:text-white transition-all w-full sm:w-auto">
              Join as Guest
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[320px] h-[400px] md:max-w-[450px] md:h-[550px] mx-auto lg:mx-0 scale-90 sm:scale-100">
          {/* Back Card */}
          <div className="absolute top-0 left-4 md:left-10 w-36 h-48 md:w-64 md:h-80 bg-black rounded-2xl transform -rotate-12 shadow-xl overflow-hidden">
            <img
              src={Assets03}
              className="w-full h-full object-cover opacity-80"
              alt="UI 1"
            />
          </div>

          <div className="absolute top-12 right-4 md:right-0 w-36 h-48 md:w-64 md:h-80 bg-[#000000] rounded-2xl transform rotate-12 shadow-xl overflow-hidden">
            <img
              src={Assets02}
              className="w-full h-full object-cover opacity-80"
              alt="UI 2"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-52 md:w-64 md:h-80 bg-[#090909] rounded-3xl transform -rotate-3 shadow-2xl overflow-hidden z-20 border-4 border-white">
            <img
              src={Assets01}
              className="w-full h-full object-cover"
              alt="UI 3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
