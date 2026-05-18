import TutorCard from "@/components/TutorCard";
import TutorHeader from "@/components/TutorHeader";
import { Button } from "@heroui/react";
import { Filter } from "lucide-react";
import React from "react";
import { BiBookOpen } from "react-icons/bi";

const TutorsPage = async () => {
  const res = await fetch("http://localhost:7000/tutors");
  const tutors = await res.json();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <TutorHeader />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-[#0c2461]">
            <BiBookOpen className="w-6 h-6 text-[#D4A017]" />
            All Tutors
          </h2>
          <Button
            variant="flat"
            startContent={<Filter className="w-4 h-4" />}
            className="rounded-full font-bold"
          >
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors?.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TutorsPage;
