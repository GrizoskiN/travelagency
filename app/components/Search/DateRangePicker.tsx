"use client";

import * as React from "react";
import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DurationIcon } from "../Icons/SvgIcons";

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
  const [numberOfMonths, setNumberOfMonths] = React.useState(2); // Default to 2 months

  // Adjust the number of months based on the window size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNumberOfMonths(1); // Mobile view
      } else {
        setNumberOfMonths(2); // Tablet and larger
      }
    };

    // Set the initial number of months
    handleResize();

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("grid gap-2 lg:grid-cols-2 w-full lg:w-auto ", className)}>
      {/* Check-in Button */}
      <div className="flex lg:flex-col  justify-between lg:items-start items-center bg-white lg:bg-transparent p-1 rounded-full lg:rounded-none">
        <p className="text-gray-500 text-left text-sm pl-4 ">Check In</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="check-in"
              variant={"outline"}
              className={cn(
                "lg:w-auto w-2/3 h-auto p-1 pr-4 lg:p-none lg:pr-none bg-[#ececec] rounded-full lg:bg-transparent lg:rounded-none flex justify-between lg:justify-start shadow-none border-none text-xl text-black "
               
              )}
              onClick={() => setOpen(true)}>
              <DurationIcon/>
              {date?.from ? (
                format(date.from, "LLL dd, y")
              ) : (
                <span>Check-in Date</span>
              )}
            </Button>
          </PopoverTrigger>
        </Popover>
      </div>
      {/* Check-out Button */}
      <div className="flex  lg:flex-col justify-between lg:items-start items-center bg-white lg:bg-transparent p-1 rounded-full lg:rounded-none">
        <p className="text-gray-500 text-left text-sm pl-4 ">Check Out</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="check-out"
              variant={"outline"}
              className={cn(
                "lg:w-auto w-2/3 h-auto p-1 pr-4 lg:p-none lg:pr-none bg-[#ececec] rounded-full lg:bg-transparent lg:rounded-none flex justify-between lg:justify-start shadow-none border-none text-xl text-black "
              )}
              onClick={() => setOpen(true)}>
             <DurationIcon/>
              {date?.to ? (
                format(date.to, "LLL dd, y")
              ) : (
                <span>Check-out Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" lg:w-auto  lg:-ml-40" align="center">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                onChange(range);
              }}
              numberOfMonths={numberOfMonths} // Use dynamic number of months
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
