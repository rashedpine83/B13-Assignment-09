"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";

export function BookingModal({ tutor }) {
  const [open, setOpen] = useState(false);

  const [remainingSlot, setRemainingSlot] = useState(tutor.totalSlot);

  const { _id, photo, price, location, subject, tutorName, sessionCloseDate } =
    tutor;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isExpired = new Date(sessionCloseDate) < new Date();

  const isDisabled = remainingSlot <= 0 || isExpired;

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
    };

    try {
      const res = await fetch("http://localhost:7000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking successful");

        setRemainingSlot((prev) => prev - 1);

        setOpen(false);
        e.target.reset();
      } else {
        toast.error(data?.message || "Booking failed");
      }
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button
        onPress={() => setOpen(true)}
        variant="secondary"
        disabled={isDisabled}
      >
        {isExpired
          ? "Session Closed"
          : remainingSlot <= 0
            ? "No Slot Available"
            : "Book Session"}
      </Button>

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
                  <TextField className="w-full" name="name" type="text">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" required />
                  </TextField>

                  <TextField
                    defaultValue={user?.email}
                    className="w-full"
                    name="email"
                    type="email"
                  >
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" required />
                  </TextField>

                  <TextField className="w-full" name="phone" type="tel">
                    <Label>Phone</Label>
                    <Input placeholder="Enter your phone number" required />
                  </TextField>

                  <TextField
                    defaultValue={tutorName}
                    className="w-full"
                    name="tutor"
                  >
                    <Label>Tutor Name</Label>
                    <Input readOnly />
                  </TextField>

                  <TextField className="w-full" name="message">
                    <Label>Reading Mode</Label>
                    <Input placeholder="Online / Offline" required />
                  </TextField>

                  <Modal.Footer>
                    <Button type="button" onPress={() => setOpen(false)}>
                      Cancel
                    </Button>

                    <Button type="submit" disabled={isDisabled}>
                      {isExpired
                        ? "Session Closed"
                        : remainingSlot <= 0
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
