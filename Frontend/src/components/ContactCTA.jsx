import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="w-full py-4">
      <div className="w-full bg-black rounded-[40px] px-6 py-16 md:py-24 flex flex-col items-center text-center text-white">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Let’s Get you connected
        </h2>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          looking for a secure, modern an shameless meeting platform
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
          <div className="bg-[#D9D9D9] text-black w-full max-w-[320px] py-4 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-white transition-colors cursor-pointer group">
            <Mail
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-lg font-semibold">slink@gmail.com</span>
          </div>

          <div className="bg-[#D9D9D9] text-black w-full max-w-[320px] py-4 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-white transition-colors cursor-pointer group">
            <Phone
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-lg font-semibold">6958585858</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
