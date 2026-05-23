import { BookingModal } from "@/components/BookingModal";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TutorDetails = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const tutor = await res.json();

  const {
    tutorName,
    photo,
    availableDays,
    price,
    availableTime,
    location,
    subject,
    institution,
    experience,
    teachingMode,
    sessionStartDate,
    sessionCloseDate,
    totalSlot,
  } = tutor;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // session close check
  const isSessionClosed = new Date(sessionCloseDate) < new Date();

  // button disable check
  const isBookingDisabled = totalSlot === 0 || isSessionClosed;

  const featuredItems = [
    { icon: Clock, label: availableTime },
    { icon: MdEventAvailable, label: availableDays },
    { icon: FaLocationDot, label: location },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
            <Image src={photo} alt={tutorName} fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-4xl font-black text-slate-900">{tutorName}</h1>

            <p className="text-xl text-slate-500">{subject}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t">
            {featuredItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-slate-100 px-5 py-3 rounded-xl"
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="sticky top-24 bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <div>
            <p className="text-sm text-slate-500">Hourly Price</p>

            <span className="text-4xl font-black text-blue-600">${price}</span>
          </div>

          <div className="space-y-2 text-slate-600">
            <p>
              <b>Institution:</b> {institution}
            </p>

            <p>
              <b>Experience:</b> {experience}
            </p>

            <p>
              <b>Teaching Mode:</b> {teachingMode}
            </p>

            <p>
              <b>Session Start:</b> {formatDate(sessionStartDate)}
            </p>

            <p>
              <b>Session Close:</b> {formatDate(sessionCloseDate)}
            </p>

            <p>
              <b>Remaining Slot:</b> {totalSlot}
            </p>

            {totalSlot === 0 && (
              <p className="text-red-500 font-semibold">No Slot Available</p>
            )}

            {isSessionClosed && (
              <p className="text-red-500 font-semibold">Session Closed</p>
            )}
          </div>

          <BookingModal tutor={tutor} disabled={isBookingDisabled} />
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
