"use client";

import { Users, GraduationCap, BriefcaseBusiness, Star } from "lucide-react";

const statsData = [
  {
    id: 1,
    number: "624550+",
    title: "TOTAL APPLIED",
    icon: Users,
    border: "border-cyan-400",
    iconColor: "text-cyan-400",
    bg: "from-[#1f2557] to-[#3b235f]",
  },
  {
    id: 2,
    number: "155600+",
    title: "TOTAL TUTORS",
    icon: GraduationCap,
    border: "border-emerald-400",
    iconColor: "text-emerald-400",
    bg: "from-[#252b63] to-[#44306d]",
  },
  {
    id: 3,
    number: "1004+",
    title: "LIVE TUITION JOBS",
    icon: BriefcaseBusiness,
    border: "border-yellow-400",
    iconColor: "text-yellow-400",
    bg: "from-[#2a275f] to-[#4a2f73]",
  },
  {
    id: 4,
    number: "4.7",
    title: "AVERAGE RATING",
    icon: Star,
    border: "border-pink-400",
    iconColor: "text-pink-400",
    bg: "from-[#2d275d] to-[#5b2e6f]",
  },
];

export default function TutorStats() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-[#171d4b] via-[#2a2159] to-[#4a1f58]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute top-24 left-72 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-16 right-80 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute bottom-16 left-1/3 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-24 w-2 h-2 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.bg} border border-white/10 rounded-3xl p-7 flex items-center gap-5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-white/20 group`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl border ${item.border} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className={`${item.iconColor} w-9 h-9`} />
                </div>

                <div>
                  <h2 className="text-4xl font-extrabold text-white leading-none">
                    {item.number}
                  </h2>

                  <p className="text-gray-300 mt-3 text-sm tracking-wide font-semibold">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
