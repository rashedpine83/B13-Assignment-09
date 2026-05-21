"use client";
import { Button } from "@heroui/react";
import { ArrowRight, Star, Play } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Banner = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32  from-blue-50 via-slate-50 to-slate-50">
      <Swiper
        navigation
        pagination={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-[#0c2461] font-bold text-sm animate-bounce-slow">
                  <Star className="w-4 h-4 fill-blue-600" />
                  <span>Learn Smarter With Trusted Expert Tutors</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0c2461] leading-[1.1]">
                  Find the Right{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-[#8B6508] to-[#D4A017]">
                    Tutor
                  </span>{" "}
                  for Every Subject
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  TutorFlow helps students discover qualified tutors, schedule
                  flexible learning sessions, and grow with confidence from
                  anywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 ">
                  <Button
                    href="/courses"
                    size="lg"
                    className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 group bg-linear-to-r from-[#8B6508] to-[#D4A017] "
                  >
                    Explore Courses{" "}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-6 grayscale opacity-60">
                  <Link href={"/#"}>
                    <BsFacebook className="w-10 h-10" />
                  </Link>
                  <Link href={"/#"}>
                    <FaLinkedin className="w-10 h-10" />
                  </Link>
                  <Link href={"/#"}>
                    <IoLogoYoutube className="w-10 h-10" />
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                  <Image
                    src="https://i.ibb.co.com/QvShD3zv/ahmed-hindawi-bj-B2m-GI8-Pt-I-unsplash.jpg"
                    alt="Learning"
                    fill
                    className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-[#0c2461] font-bold text-sm animate-bounce-slow">
                  <Star className="w-4 h-4 fill-blue-600" />
                  <span>Learn Smarter With Trusted Expert Tutors</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0c2461] leading-[1.1]">
                  Find the Right{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-[#8B6508] to-[#D4A017]">
                    Tutor
                  </span>{" "}
                  for Every Subject
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  TutorFlow helps students discover qualified tutors, schedule
                  flexible learning sessions, and grow with confidence from
                  anywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 ">
                  <Button
                    href="/courses"
                    size="lg"
                    className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 group bg-linear-to-r from-[#8B6508] to-[#D4A017] "
                  >
                    Explore Courses{" "}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-6 grayscale opacity-60">
                  <Link href={"/#"}>
                    <BsFacebook className="w-10 h-10" />
                  </Link>
                  <Link href={"/#"}>
                    <FaLinkedin className="w-10 h-10" />
                  </Link>
                  <Link href={"/#"}>
                    <IoLogoYoutube className="w-10 h-10" />
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                  <Image
                    src="https://i.ibb.co.com/fGyDbwvR/annie-spratt-x-KJUn-Fwfz3s-unsplash.jpg"
                    alt="Learning"
                    fill
                    className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-[#0c2461] font-bold text-sm animate-bounce-slow">
                  <Star className="w-4 h-4 fill-blue-600" />
                  <span>Learn Smarter With Trusted Expert Tutors</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0c2461] leading-[1.1]">
                  Find the Right{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-[#8B6508] to-[#D4A017]">
                    Tutor
                  </span>{" "}
                  for Every Subject
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  TutorFlow helps students discover qualified tutors, schedule
                  flexible learning sessions, and grow with confidence from
                  anywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 group">
                  <Button
                    href="/courses"
                    size="lg"
                    className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 
    bg-linear-to-r from-[#8B6508] to-[#D4A017]
    transition-all duration-300 group-hover:scale-105"
                  >
                    Explore Courses
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="flex items-center gap-6 pt-6 grayscale opacity-60">
                  <Link href={"/#"}>
                    <BsFacebook className="w-10 h-10" />
                  </Link>
                  <Link href={"/#"}>
                    <FaLinkedin className="w-10 h-10" />
                  </Link>
                  <Link href={"/#"}>
                    <IoLogoYoutube className="w-10 h-10" />
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                  <Image
                    src="https://i.ibb.co.com/HD2PNgRt/nick-morrison-FHnnjk1-Yj7-Y-unsplash.jpg"
                    alt="Learning"
                    fill
                    className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
