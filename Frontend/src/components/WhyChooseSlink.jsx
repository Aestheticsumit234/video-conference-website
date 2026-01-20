import React from "react";
import { Shield, Zap, Video, Users, MousePointer2, Lock } from "lucide-react";

const WhyChooseSlink = () => {
  const features = [
    {
      title: "End-to-End Encryption",
      desc: "Your meetings are private. We use industry-leading security to keep your data safe.",
      icon: <Lock className="text-white" size={32} />,
    },
    {
      title: "Crystal Clear HD",
      desc: "Adaptive 4K video and spatial audio that makes you feel like you're in the same room.",
      icon: <Video className="text-white" size={32} />,
    },
    {
      title: "Seamless Sharing",
      desc: "Share your entire screen or just a window with one click and zero latency.",
      icon: <MousePointer2 className="text-white" size={32} />,
    },
    {
      title: "Massive Meetings",
      desc: "Host up to 1,000 participants with no time limits on our professional tier.",
      icon: <Users className="text-white" size={32} />,
    },
    {
      title: "Lightning Fast",
      desc: "Built on a global edge network for the lowest possible ping and no lag.",
      icon: <Zap className="text-white" size={32} />,
    },
    {
      title: "Advanced Privacy",
      desc: "Virtual backgrounds and noise cancellation to keep the focus on you.",
      icon: <Shield className="text-white" size={32} />,
    },
  ];

  return (
    <section className="py-20  rounded-[40px] my-10 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-black">
          Why Teams Choose <br /> Slink
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-black p-8 rounded-3xl hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-white text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSlink;
