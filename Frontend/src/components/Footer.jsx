import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        "Video Quality",
        "Security",
        "Screen Sharing",
        "Recording",
        "Integrations",
      ],
    },
    {
      title: "Solutions",
      links: [
        "For Education",
        "For Enterprise",
        "For Healthcare",
        "Remote Work",
      ],
    },
    {
      title: "Support",
      links: ["Help Center", "Status", "Developer API", "Community"],
    },
  ];

  return (
    <footer className="w-full bg-white pt-20 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
        <div className="col-span-2">
          <Link to="/" className="text-3xl font-bold mb-6 block">
            SLink
          </Link>
          <p className="text-gray-500 text-lg max-w-xs mb-8">
            The next generation of video conferencing built for speed, privacy,
            and seamless global collaboration.
          </p>
          <div className="flex gap-4">
            <div className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all cursor-pointer">
              <Twitter size={20} />
            </div>
            <div className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all cursor-pointer">
              <Linkedin size={20} />
            </div>
            <div className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all cursor-pointer">
              <Github size={20} />
            </div>
          </div>
        </div>

        {footerLinks.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-bold text-lg mb-6">{section.title}</h4>
            <ul className="space-y-4">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black hover:underline transition-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 mb-10" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          <Globe size={18} />
          <span>English (US)</span>
        </div>

        <div className="text-gray-400 text-sm">
          © 2026 SLink Inc. All rights reserved.
        </div>

        <div className="flex gap-8 text-sm font-semibold text-gray-600">
          <a href="#" className="hover:text-black">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black">
            Terms of Service
          </a>
          <a href="#" className="hover:text-black">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
