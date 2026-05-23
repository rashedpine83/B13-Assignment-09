import MyBookingClient from "@/components/MyBookingClient";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user.id}`,
    {
      cache: "no-store",
    },
  );

  const bookings = await res.json();

  return <MyBookingClient bookings={bookings} />;
};

export default MyBookingPage;
