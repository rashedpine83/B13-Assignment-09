"use client";

import {
  Button,
  Description,
  FieldError,
  Input,
  TextField,
} from "@heroui/react";

import Link from "next/link";

import { Mail, Lock, ArrowRight } from "lucide-react";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LogInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });

    if (data) {
      toast.success("Login successful");
      redirect("/");
    }
    if (error) {
      toast.error("Login failed");
      return;
    }
  };
  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome <span className="text-blue-600">Back</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Continue your learning journey today
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignUp}
                variant="bordered"
                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
              >
                <FcGoogle />
                Sign in with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <TextField
                className="space-y-2"
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>
                <Input
                  placeholder="john@example.com"
                  startadornment={<Mail className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-10 bg-white w-full rounded-2xl"
                />
              </TextField>

              <TextField
                className="space-y-2"
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>
                <Input
                  placeholder="Enter your password"
                  startadornment={<Mail className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-10 bg-white w-full rounded-2xl"
                />
                <Description>
                  Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError />
              </TextField>
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-bold text-blue-600 hover:underline underline-offset-4 transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                color="primary"
                type="submit"
                className="w-full h-10 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
              >
                Sign In{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                New User?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
