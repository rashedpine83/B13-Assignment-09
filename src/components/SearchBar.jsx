"use client";

import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { Filter, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Design exactly same ache, shudhu URL details variables update kora hoyeche
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [startDate, setStartDate] = useState(
    searchParams.get("sessionStartDate") || "",
  );
  const [closeDate, setCloseDate] = useState(
    searchParams.get("sessionCloseDate") || "",
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    // SEARCH
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    // START DATE (ISO format from input type="date")
    if (startDate) {
      params.set("sessionStartDate", startDate);
    } else {
      params.delete("sessionStartDate");
    }

    // CLOSE DATE
    if (closeDate) {
      params.set("sessionCloseDate", closeDate);
    } else {
      params.delete("sessionCloseDate");
    }

    router.push(`/tutors?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setCloseDate("");

    router.push("/tutors");
  };

  return (
    <div className="w-full flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4 items-end">
        <div className="w-full lg:w-[60%]">
          <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all overflow-hidden h-16">
            <div className="pl-5 text-slate-400">
              <Search className="w-5 h-5" />
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for tutors (e.g. subject, name and date)"
              className="w-full flex-1 h-full px-4 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
            />

            <button
              onClick={handleSearch}
              className="h-10 px-6 mr-2 rounded-xl bg-[#0c2461] text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[30%] flex flex-col sm:flex-row items-end gap-3">
          {/* START DATE */}
          <div className="w-full">
            <TextField name="sessionStartDate">
              <Label className="text-[#0c2461] font-bold">Start Date</Label>

              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>
          </div>

          {/* CLOSE DATE */}
          <div className="w-full">
            <TextField name="sessionCloseDate">
              <Label className="text-[#0c2461] font-bold">Close Date</Label>

              <Input
                type="date"
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>
          </div>

          {/* RESET BUTTON */}
          <div className="w-full sm:w-auto">
            <Button
              onPress={handleReset}
              variant="flat"
              startContent={<Filter className="w-4 h-4" />}
              className="rounded-xl font-bold w-full sm:w-auto h-14 px-6 bg-[#0c2461] text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
