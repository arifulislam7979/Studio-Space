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
      <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center space-y-3 mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span>Peace of Mind</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Book and host with absolute confidence backed by our industry-leading safety standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-zinc-800/60 border border-zinc-700/50 p-6 rounded-2xl backdrop-blur-sm space-y-3 hover:border-indigo-500/50 transition-all"
              >
                <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
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