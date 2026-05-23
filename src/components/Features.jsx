import React from "react";
import TutorCard from "./TutorCard";

const Features = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/features`);
  const tutors = await res.json();
  return (
    <div className="dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 ">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#0c2461]">
          Powerful Features for Smarter Learning with{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#8B6508] to-[#D4A017]">
            TutorFlow
          </span>{" "}
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          TutorFlow provides everything students need for a smooth and effective
          tutoring experience — from verified tutors and real-time booking to
          flexible schedules, secure payments, and personalized learning
          support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors?.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
