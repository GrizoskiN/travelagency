"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// DatePickerWithRange component
type DatePickerWithRangeProps = {
  date: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  className?: string;
};

export function DatePickerWithRange({
  date,
  onChange,
  className,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-auto bg-transparent border-none rounded-full shadow-none justify-start text-left font-normal text-white",
              !date && "text-white"
            )}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date && date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={(range) => {
              onChange(range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
