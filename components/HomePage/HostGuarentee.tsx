import { ShieldCheck, UserCheck, Lock, Headphones } from "lucide-react";

const guarantees = [
  {
    title: "Liability Protection",
    desc: "Comprehensive coverage ensuring peace of mind for both creators and venue hosts during bookings.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    desc: "Every host and creator goes through identity verification to maintain a safe, trusted community.",
    icon: UserCheck,
  },
  {
    title: "Equipment Safety",
    desc: "Secure guidelines and damage protection policies designed to safeguard high-end production gear.",
    icon: Lock,
  },
  {
    title: "24/7 Host Support",
    desc: "Our dedicated support team is available around the clock to assist you with any inquiries or emergencies.",
    icon: Headphones,
  },
];

export default function HostGuarantee() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl border border-zinc-800">
        
        {/* 1. Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500 hover:scale-105"
          style={{ 
            backgroundImage: `url('/images/host-img.jpg')` 
          }}
        />
        
        {/* 2. Dark Gradient Overlay (লেখা স্পষ্ট দেখানোর জন্য) */}
        <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-xs z-0" />

        {/* 3. Glowing Background Blob Effect */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none z-0" />
        
        {/* Header Section */}
        <div className="text-center space-y-3 mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <span>Peace of Mind</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-sm text-zinc-300 max-w-md mx-auto">
            Book and host with absolute confidence backed by our industry-leading safety standards.
          </p>
        </div>

        {/* Grid Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-zinc-900/60 border border-zinc-700/50 p-6 rounded-2xl backdrop-blur-md space-y-3 hover:border-indigo-500/60 hover:bg-zinc-900/80 transition-all duration-300 shadow-md"
              >
                <div className="p-3 rounded-xl bg-indigo-600/30 text-indigo-400 w-fit border border-indigo-500/30">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}