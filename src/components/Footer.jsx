import Link from "next/link";
import Image from "next/image";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-24 bg-accent-soft-hover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex justify-center sm:justify-start">
            <Image
              src="/assets/logo1.png"
              alt="logo"
              width={300}
              height={300}
              className="w-auto"
            />
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Follow Us
            </p>

            <div className="flex justify-center sm:justify-start gap-4 text-xl">
              <Link href="#">
                <FaFacebook />
              </Link>
              <Link href="#">
                <FaInstagram />
              </Link>
              <Link href="#">
                <FaYoutube />
              </Link>
              <Link href="#">
                <FaLinkedin />
              </Link>
              <Link href="#">
                <FaPinterest />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">
              Learning Services
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/skill-development"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Skill Development
                </Link>
              </li>
              <li>
                <Link
                  href="/personalized-learning"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Personalized Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/exam-preparation"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Exam Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/career-gidance"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/academic-support"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Academic Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">
              Contact Information
            </h3>

            <div>
              <p>Email: support@tutorflow.com</p>
              <p>Phone: +880 1234-567890</p>
              <p>Address: Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} TutorFlow. All rights reserved.</p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <Link
              href="/privacy"
              className="hover:text-black dark:hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-black dark:hover:text-white transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
