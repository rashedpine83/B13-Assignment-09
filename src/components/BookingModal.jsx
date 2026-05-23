"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function BookingModal({ tutor }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [remainingSlot, setRemainingSlot] = useState(Number(tutor.totalSlot));

  const { _id, photo, price, location, subject, tutorName, sessionCloseDate } =
    tutor;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const closeDate = new Date(sessionCloseDate);
  closeDate.setHours(0, 0, 0, 0);

  const isExpired = closeDate < today;

  const isSlotFull = Number(remainingSlot) <= 0;

  const isDisabled = isExpired || isSlotFull;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isDisabled) return;

    const formData = new FormData(e.target);
    const tutorData = Object.fromEntries(formData.entries());

    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      userEmail: user?.email,
      userPhone: tutorData.phone,
      tutorName: tutorData.tutor,
      userReadingMode: tutorData.message,
      tutorId: _id,
      tutorImage: photo,
      tutorSubject: subject,
      tutorLocation: location,
      tutorPrice: price,
      status: "pending",
      bookingDate: new Date(),
    };
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Booking failed");
        return;
      }

      const slotRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/slot/${_id}`,
        {
          method: "PATCH",
        },
      );

      const slotData = await slotRes.json();

      if (!slotRes.ok) {
        toast.error(slotData?.message || "Slot update failed");
        return;
      }

      setRemainingSlot((prev) => Number(prev) - 1);

      toast.success("Booking successful");

      setOpen(false);
      e.target.reset();

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      {/* BUTTON */}
      <Button
        variant="secondary"
        disabled={isDisabled}
        onPress={() => {
          if (!isDisabled) setOpen(true);
        }}
        className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      >
        {isExpired
          ? "Session Closed"
          : isSlotFull
            ? "No Slot Available"
            : "Book Session"}
      </Button>

      {/* MODAL */}
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Book Session</Modal.Heading>
              <p className="mt-1.5 text-sm text-muted">
                Schedule your personalized learning session with an expert
                tutor.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField defaultValue={user?.name} name="name">
                    <Label>Name</Label>
                    <Input required />
                  </TextField>

                  <TextField defaultValue={user?.email} name="email">
                    <Label>Email</Label>
                    <Input required />
                  </TextField>

                  <TextField name="phone">
                    <Label>Phone</Label>
                    <Input required />
                  </TextField>

                  <TextField defaultValue={tutorName} name="tutor">
                    <Label>Tutor Name</Label>
                    <Input readOnly />
                  </TextField>

                  <TextField name="message">
                    <Label>Reading Mode</Label>
                    <Input required placeholder="Online / Offline" />
                  </TextField>

                  <div className="text-sm text-slate-500">
                    Remaining Slot:
                    <span className="font-semibold ml-1">{remainingSlot}</span>
                  </div>

                  <Modal.Footer>
                    <Button type="button" onPress={() => setOpen(false)}>
                      Cancel
                    </Button>

                    <Button type="submit" disabled={isDisabled}>
                      {isExpired
                        ? "Session Closed"
                        : isSlotFull
                          ? "No Slots"
                          : "Book Confirm"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
