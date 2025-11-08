"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar22() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="bg-white text-black" asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal bg-white text-black"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon className="bg-white text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 bg-white text-black"
          align="start"
        >
          <Calendar
            className="bg-white text-black"
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
