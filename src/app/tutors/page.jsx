import TutorCard from "@/components/TutorCard";
import TutorHeader from "@/components/TutorHeader";
import { BiBookOpen } from "react-icons/bi";

const fetchTutors = async (search = "") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?search=${search}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  return res.json();
};
const TutorsPage = async ({ searchParams }) => {
  const search = await searchParams;

  let tutors = [];

  try {
    tutors = await fetchTutors(search?.search);
  } catch (error) {}

  return (
    <div className="min-h-screen bg-slate-50">
      <TutorHeader />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-[#0c2461]">
            <BiBookOpen className="w-6 h-6 text-[#D4A017]" />
            All Tutors
          </h2>
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
