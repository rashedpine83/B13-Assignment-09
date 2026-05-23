import { Button, Chip } from "@heroui/react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    tutorName,
    photo,
    availableDays,
    price,
    availableTime,
    location,
    subject,
  } = tutor;
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden aspect-16/10">
        <Image
          alt="Course Image"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          src={photo}
          fill
        />

        <div className="absolute top-4 right-4">
          <Chip
            color="primary"
            variant="solid"
            className="font-bold shadow-lg shadow-blue-600/20"
          >
            {availableDays}
          </Chip>
        </div>
      </div>

      <div className="p-8 flex flex-col grow space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-[#0c2461] dark:hover:text-blue-300 transition-colors">
            {tutorName}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-300 font-medium flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Subject:
            <span className="text-slate-900 dark:text-white">{subject}</span>
          </p>
        </div>

        <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-300 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Hourly:
            <span className="text-[#0c2461] dark:text-yellow-400 text-2xl">
              ${price}
            </span>
          </p>

          <Link href={`/tutors/${_id}`}>
            <Button className="font-bold rounded-xl px-6 border-2 bg-[#D4A017] border-[#0c2461] hover:bg-[#0c2461] hover:text-white transition-colors">
              Book Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
