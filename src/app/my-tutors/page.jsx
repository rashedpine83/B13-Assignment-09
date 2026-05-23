import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModalMyTutor } from "@/components/EditModal";
import { Table } from "@heroui/react";

const MyTutorPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newTutors`, {
    cache: "no-store",
  });
  const tutors = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 ">
      <h2 className="text-3xl font-bold mb-8 text-center">My Tutors</h2>

      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-150">
            <Table.Header>
              <Table.Column isRowHeader>Tutor Name</Table.Column>
              <Table.Column>Subject</Table.Column>
              <Table.Column>Available</Table.Column>
              <Table.Column>Hourly Fee</Table.Column>
              <Table.Column>Total Slot</Table.Column>
              <Table.Column className={"text-center"}>Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {tutors?.length > 0 ? (
                tutors.map((tutor, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{tutor.tutorName}</Table.Cell>

                    <Table.Cell>{tutor.subject}</Table.Cell>

                    <Table.Cell>
                      {tutor.startTime}-{tutor.endTime}
                    </Table.Cell>

                    <Table.Cell className={"text-center"}>
                      ${tutor.price}
                    </Table.Cell>

                    <Table.Cell className={"text-center"}>
                      {tutor.totalSlot}
                    </Table.Cell>

                    <Table.Cell
                      className={"flex justify-center items-center gap-2"}
                    >
                      <DeleteAlert tutor={tutor} />
                      {/* edit modal */}
                      <EditModalMyTutor tutor={tutor} />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>
                    <p className="text-center py-10 text-red-500 text-3xl flex justify-center">
                      No tutor available
                    </p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default MyTutorPage;
