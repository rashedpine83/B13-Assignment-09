"use client";

import {
  FieldError,
  Input,
  Label,
  ListBox,
  TextField,
  Select,
  Button,
  Card,
} from "@heroui/react";

import React from "react";
import toast from "react-hot-toast";

const AddTutorPage = () => {
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

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });
      const data = await res.json();
      toast.success("Tutor add Successfull");

      e.target.reset();
    } catch (error) {}

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/newtutors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tutorData),
        },
      );
      const data = await res.json();
      toast.success("Tutor add Successfull");
      e.target.reset();
    } catch (error) {}
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-4xl font-bold mb-6 text-center">Add Tutor</h2>

      <Card className="border">
        <form onSubmit={onSubmit} className="p-10 space-y-8 w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tutor Name */}
            <div className="md:col-span-2">
              <TextField name="tutorName" isRequired>
                <Label>Tutor Name</Label>

                <Input placeholder="Enter your name" className="rounded-2xl" />

                <FieldError />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="photo" isRequired>
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
                    <ListBox.Item id="Mathematics">Mathematics</ListBox.Item>
                    <ListBox.Item id="Physics">Physics</ListBox.Item>
                    <ListBox.Item id="Chemistry">Chemistry</ListBox.Item>
                    <ListBox.Item id="English">English</ListBox.Item>
                    <ListBox.Item id="Programming">Programming</ListBox.Item>
                    <ListBox.Item id="Biology">Biology</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Available Days */}
            <TextField name="availableDays" isRequired>
              <Label>Available Days</Label>
              <Input placeholder="Sun - Thu" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Start Time */}
            <TextField name="startTime" isRequired>
              <Label>Start Time</Label>
              <Input type="time" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* End Time */}
            <TextField name="endTime" isRequired>
              <Label>End Time</Label>
              <Input type="time" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Price */}
            <TextField name="price" type="number" isRequired>
              <Label>Hourly Fee (USD)</Label>
              <Input type="number" placeholder="25" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Total Slot */}
            <TextField name="totalSlot" type="number" isRequired>
              <Label>Total Slot</Label>
              <Input type="number" placeholder="10" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Session Start Date */}
            <TextField name="sessionStartDate" type="date" isRequired>
              <Label>Session Start Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Session Close Date */}
            <TextField name="sessionCloseDate" type="date" isRequired>
              <Label>Session Close Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Institution */}
            <TextField name="institution" isRequired>
              <Label>Institution</Label>
              <Input placeholder="Dhaka University" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Experience */}
            <TextField name="experience" isRequired>
              <Label>Experience</Label>
              <Input placeholder="5 Years" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Location */}
            <TextField name="location" isRequired>
              <Label>Location</Label>
              <Input placeholder="Dhaka, Bangladesh" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Teaching Mode */}
            <div>
              <Select
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
            <Button
              type="submit"
              variant="outline"
              className="transition-transform duration-300 group-hover:scale-105 rounded-none w-full text-white bg-linear-to-r from-[#8B6508] to-[#D4A017]"
            >
              Add Tutor
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTutorPage;
