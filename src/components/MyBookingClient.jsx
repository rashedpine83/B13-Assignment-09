"use client";

import { useState } from "react";
import { Button, Table, Modal } from "@heroui/react";
import { X } from "lucide-react";

export default function MyBookingClient({ bookings: initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);

  // CANCEL BOOKING (PATCH)
  const handleCancel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${selectedId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "canceled" }),
      },
    );

    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedId ? { ...b, status: "canceled" } : b,
        ),
      );

      setOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16 overflow-x-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        My Booking
      </h2>

      <Table variant="secondary" className="min-w-[700px]">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Phone</Table.Column>
              <Table.Column>Tutor Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Cancel</Table.Column>
            </Table.Header>

            <Table.Body>
              {bookings.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center py-10">
                    No bookings found
                  </Table.Cell>
                </Table.Row>
              ) : (
                bookings.map((booking) => (
                  <Table.Row key={booking._id}>
                    <Table.Cell>{booking.userName}</Table.Cell>

                    <Table.Cell>{booking.userPhone}</Table.Cell>

                    <Table.Cell>{booking.tutorName}</Table.Cell>

                    <Table.Cell>{booking.userEmail}</Table.Cell>

                    {/* STATUS */}
                    <Table.Cell>
                      <span
                        className={
                          booking.status === "canceled"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {booking.status || "success"}
                      </span>
                    </Table.Cell>

                    {/* CANCEL BUTTON */}
                    <Table.Cell>
                      <Button
                        isDisabled={booking.status === "canceled"}
                        onPress={() => {
                          setSelectedId(booking._id);
                          setOpen(true);
                        }}
                        className="bg-white text-red-600 min-w-0 px-3"
                      >
                        <X size={18} />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* CONFIRM MODAL */}
      <Modal
        isOpen={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setSelectedId(null);
          }
        }}
      >
        <Modal.Backdrop>
          <Modal.Container className="px-4">
            <Modal.Dialog className="w-full max-w-md">
              <Modal.Header>Cancel Booking?</Modal.Header>

              <Modal.Body>
                Are you sure you want to cancel this booking?
              </Modal.Body>

              <Modal.Footer className="flex-col sm:flex-row gap-3">
                <Button
                  variant="bordered"
                  onPress={() => setOpen(false)}
                  className="w-full"
                >
                  No
                </Button>

                <Button
                  color="danger"
                  onPress={handleCancel}
                  className="w-full"
                >
                  Yes Cancel
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
