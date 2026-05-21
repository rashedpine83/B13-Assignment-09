"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export function EditModalMyTutor({ tutor }) {
  const {
    _id,
    tutorName,
    photo,
    subject,
    price,
    availableDays,
    startTime,
    endTime,
    totalSlot,
    sessionStartDate,
    sessionCloseDate,
    institution,
    experience,
    location,
    teachingMode,
  } = tutor;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const tutorData = Object.fromEntries(formData.entries());
    const formatTime = (time) => {
      const [hour, minute] = time.split(":");

      const h = hour % 12 || 12;
      const ampm = hour >= 12 ? "PM" : "AM";
      return `${h}:${minute} ${ampm}`;
    };

    tutorData.availableTime = `${formatTime(
      tutorData.startTime,
    )} - ${formatTime(tutorData.endTime)}`;

    try {
      const res = await fetch(`http://localhost:7000/tutors/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });
      const data = await res.json();
      router.refresh();
      e.target.reset();
    } catch (error) {}

    try {
      const res = await fetch(`http://localhost:7000/newtutors/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });
      const data = await res.json();
      router.refresh();
      e.target.reset();
    } catch (error) {}
  };

  return (
    <Modal>
      <Button className={"text-green-600 bg-white"}>
        <Edit />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Tutor</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={onSubmit}
                  className="p-10 space-y-8 w-full mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tutor Name */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={tutorName}
                        name="tutorName"
                        isRequired
                      >
                        <Label>Tutor Name</Label>

                        <Input
                          placeholder="Enter your name"
                          className="rounded-2xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={photo} name="photo" isRequired>
                        <Label>Image URL</Label>

                        <Input
                          type="url"
                          placeholder="https://example.com/tutor.jpg"
                          className="rounded-2xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Subject */}
                    <div>
                      <Select
                        defaultValue={subject}
                        name="subject"
                        isRequired
                        className="w-full"
                        placeholder="Select subject"
                      >
                        <Label>Subject</Label>

                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Mathematics">
                              Mathematics
                            </ListBox.Item>
                            <ListBox.Item id="Physics">Physics</ListBox.Item>
                            <ListBox.Item id="Chemistry">
                              Chemistry
                            </ListBox.Item>
                            <ListBox.Item id="English">English</ListBox.Item>
                            <ListBox.Item id="Programming">
                              Programming
                            </ListBox.Item>
                            <ListBox.Item id="Biology">Biology</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Available Days */}
                    <TextField
                      defaultValue={availableDays}
                      name="availableDays"
                      isRequired
                    >
                      <Label>Available Days</Label>
                      <Input placeholder="Sun - Thu" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Start Time */}
                    <TextField
                      defaultValue={startTime}
                      name="startTime"
                      isRequired
                    >
                      <Label>Start Time</Label>
                      <Input type="time" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* End Time */}
                    <TextField defaultValue={endTime} name="endTime" isRequired>
                      <Label>End Time</Label>
                      <Input type="time" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Price */}
                    <TextField
                      defaultValue={price}
                      name="price"
                      type="number"
                      isRequired
                    >
                      <Label>Hourly Fee (USD)</Label>
                      <Input
                        type="number"
                        placeholder="25"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Total Slot */}
                    <TextField
                      defaultValue={totalSlot}
                      name="totalSlot"
                      type="number"
                      isRequired
                    >
                      <Label>Total Slot</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Session Start Date */}
                    <TextField
                      defaultValue={sessionStartDate}
                      name="sessionStartDate"
                      type="date"
                      isRequired
                    >
                      <Label>Session Start Date</Label>
                      <Input type="date" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Session Close Date */}
                    <TextField
                      defaultValue={sessionCloseDate}
                      name="sessionCloseDate"
                      type="date"
                      isRequired
                    >
                      <Label>Session Close Date</Label>
                      <Input type="date" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Institution */}
                    <TextField
                      defaultValue={institution}
                      name="institution"
                      isRequired
                    >
                      <Label>Institution</Label>
                      <Input
                        placeholder="Dhaka University"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Experience */}
                    <TextField
                      defaultValue={experience}
                      name="experience"
                      isRequired
                    >
                      <Label>Experience</Label>
                      <Input placeholder="5 Years" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Location */}
                    <TextField
                      defaultValue={location}
                      name="location"
                      isRequired
                    >
                      <Label>Location</Label>
                      <Input
                        placeholder="Dhaka, Bangladesh"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Teaching Mode */}
                    <div>
                      <Select
                        defaultValue={teachingMode}
                        name="teachingMode"
                        isRequired
                        className="w-full"
                        placeholder="Select mode"
                      >
                        <Label>Teaching Mode</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Online">Online</ListBox.Item>
                            <ListBox.Item id="Offline">Offline</ListBox.Item>
                            <ListBox.Item id="Both">Both</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="group">
                    <Modal.Footer>
                      <Button
                        slot="close"
                        variant="secondary"
                        className="transition-transform duration-300 group-hover:scale-105 rounded-none w-full text-white bg-linear-to-r from-[#8B6508] to-[#D4A017]"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        slot="close"
                        className="transition-transform duration-300 group-hover:scale-105 rounded-none w-full text-white bg-linear-to-r from-[#8B6508] to-[#D4A017]"
                      >
                        Save
                      </Button>
                    </Modal.Footer>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
