"use client";

import { Calculator, Atom, FlaskConical, Dna } from "lucide-react";

const subjects = [
  {
    name: "Math",
    icon: Calculator,
    bg: "bg-yellow-100",
    iconBg: "bg-yellow-200",
    iconColor: "text-yellow-600",
  },
  {
    name: "Physics",
    icon: Atom,
    bg: "bg-purple-100",
    iconBg: "bg-purple-200",
    iconColor: "text-purple-600",
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    bg: "bg-cyan-100",
    iconBg: "bg-cyan-200",
    iconColor: "text-cyan-600",
  },
  {
    name: "Biology",
    icon: Dna,
    bg: "bg-green-100",
    iconBg: "bg-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "English",
    icon: Calculator,
    bg: "bg-pink-100",
    iconBg: "bg-pink-200",
    iconColor: "text-pink-600",
  },
  {
    name: "Programming",
    icon: Atom,
    bg: "bg-orange-100",
    iconBg: "bg-orange-200",
    iconColor: "text-orange-600",
  },
  {
    name: "ICT",
    icon: FlaskConical,
    bg: "bg-blue-100",
    iconBg: "bg-blue-200",
    iconColor: "text-blue-600",
  },
  {
    name: "Economics",
    icon: Dna,
    bg: "bg-emerald-100",
    iconBg: "bg-emerald-200",
    iconColor: "text-emerald-600",
  },
];

export default function SubjectSlider() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B2B5B]">
            Find Your Subject Specialist
          </h2>

          <p className="text-gray-500 text-lg mt-4">
            Find Our Specialist to reach your dream goal
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-slide gap-6">
            {[...subjects, ...subjects].map((subject, index) => {
              const Icon = subject.icon;

              return (
                <div
                  key={index}
                  className={`${subject.bg} min-w-[280px] md:min-w-[300px] h-[180px] rounded-3xl flex flex-col justify-center items-center shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer group`}
                >
                  {/* Icon */}
                  <div
                    className={`${subject.iconBg} w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}
                  >
                    <Icon className={`${subject.iconColor} w-10 h-10`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-gray-800">
                    {subject.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        .animate-slide {
          animation: slide 25s linear infinite;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }

        @keyframes slide {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
