import { DeleteAlert } from "@/components/DeleteAlert";
import { auth } from "@/lib/auth";
import { Table } from "@heroui/react";
import { headers } from "next/headers";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`http://localhost:7000/booking/${user.id}`, {
    cache: "no-store",
  });

  const bookings = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">My Booking</h2>

      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-150">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Phone</Table.Column>
              <Table.Column>Tutor Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Cancel</Table.Column>
            </Table.Header>
            <Table.Body>
              {bookings?.map((booking) => (
                <Table.Row key={booking._id}>
                  <Table.Cell>{booking.userName}</Table.Cell>

                  <Table.Cell>{booking.userPhone}</Table.Cell>

                  <Table.Cell>{booking.tutorName}</Table.Cell>

                  <Table.Cell>{booking.userEmail}</Table.Cell>
                  <Table.Cell className={"text-green-600"}>success</Table.Cell>
                  <Table.Cell>
                    <DeleteAlert booking={booking} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default MyBookingPage;
