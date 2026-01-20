import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Globe, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Video Quality", "Security", "Screen Sharing", "Recording"],
    },
    {
      title: "Solutions",
      links: ["Education", "Enterprise", "Healthcare", "Remote Work"],
    },
    {
      title: "Support",
      links: ["Help Center", "Status", "API Docs", "Community"],
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
     
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="text-4xl font-black tracking-tighter mb-6 block">
              SLink<span className="text-gray-400">.</span>
            </Link>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm mb-8">
              Connecting teams globally with secure, high-definition video conferencing. Built for speed and privacy.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <div key={i} className="p-2.5 rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>

          
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-black uppercase tracking-widest text-sm mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-500 hover:text-black transition-colors duration-200 text-base">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

         
        <div className="h-[1px] w-full bg-gray-100 mb-8" />

         
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Globe size={16} />
              <span>English (US)</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 SLink Inc.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Cookies</a>
            <a href="#" className="hover:text-black transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;