import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Recommended: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative px-6 py-4 md:px-16">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link className="text-3xl font-bold hover:underline z-50" to={'/'}>
          SLink
        </Link>

        {/* Desktop Menu (Hidden on mobile) */}
        <div className="hidden md:flex gap-8 items-center">
          <button className="text-black text-lg font-bold active:scale-95 transition-all capitalize cursor-pointer">
            join as guest
          </button>
          <button className="text-black text-lg font-bold active:scale-95 transition-all capitalize cursor-pointer">
            Sign-up
          </button>
          <button className="bg-black text-white border rounded-full px-8 py-2.5 font-bold cursor-pointer active:scale-95 transition-all">
            login
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden
      `}>
        <button onClick={() => setIsOpen(false)} className="text-2xl font-bold">join as guest</button>
        <button onClick={() => setIsOpen(false)} className="text-2xl font-bold">Sign-up</button>
        <button onClick={() => setIsOpen(false)} className="bg-black text-white rounded-full px-10 py-4 text-xl font-bold">
          login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
