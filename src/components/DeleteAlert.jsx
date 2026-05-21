"use client";

import { AlertDialog, Button } from "@heroui/react";

import { IoTrashBin } from "react-icons/io5";

export function DeleteAlert({ tutor }) {
  const { tutorName, _id } = tutor;

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:7000/newTutors/${_id}`, {
        method: "DELETE",
      });

      await fetch(`http://localhost:7000/tutors/${_id}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <Button className={"text-red-600 bg-white"}>
        <IoTrashBin />
      </Button>{" "}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Delete booking permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{tutorName}</strong>. This
                action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button onPress={handleDelete} variant="danger">
                Delete Confirm
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
