"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DestinationIcon } from "../Icons/SvgIcons";
import { motion, AnimatePresence } from "framer-motion";

type Destination = {
  value: string;
  label: string;
};

type DestinationSelectProps = {
  destinations: Destination[];
  initialCountry: string;
  onCountryChange: (value: string) => void;
};

const DestinationSelect: React.FC<DestinationSelectProps> = ({
  destinations,
  initialCountry,
  onCountryChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = React.useState({
    left: 0,
    right: 0,
  });

  // Filter destinations based on search term
  const filteredDestinations = destinations.filter((destination) =>
    destination.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate drag constraints whenever the filtered destinations change
  React.useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && listRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const listWidth = listRef.current.scrollWidth;
        const rightConstraint = 0;
        const leftConstraint = containerWidth - listWidth;

        setDragConstraints({
          left: Math.min(leftConstraint, 0), // Ensure we don't set a positive left constraint
          right: rightConstraint,
        });
      }
    };

    // Calculate initially and add resize listener
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);

    // Cleanup
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [filteredDestinations]);

  // Close popover when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (value: string) => {
    if (!isDragging) {
      onCountryChange(value);
      setSearchTerm("");
      setIsEditing(false);
      setOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (isEditing) return searchTerm;
    if (initialCountry && initialCountry !== "all" && !searchTerm) {
      const selectedDestination = destinations.find(
        (dest) => dest.value === initialCountry,
      );
      return selectedDestination ? selectedDestination.label : "";
    }
    return searchTerm;
  };

  return (
    <div className="relative  bg-white lg:hover:bg-[#ececec] rounded-xl lg:rounded-full px-6 lg:pl-7 h-24 lg:h-16 p-2 ">
      <p className="text-black lg:text-gray-500 lg:text-sm font-light mb-1 text-left">
        Where to?
      </p>

      <div
        className="flex items-center w-full lg:w-[9rem] cursor-pointer border rounded-full lg:border-none lg:rounded-none "
        onClick={() => !isDragging && setOpen(true)}>
        <DestinationIcon />
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsEditing(true);
            setOpen(true);
          }}
          placeholder="Select a Country"
          className="w-full  bg-transparent text-black placeholder-black xl:text-lg focus:outline-none font-light"
          onFocus={() => {
            if (!isDragging) {
              setOpen(true);
              setIsEditing(true);
            }
          }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:absolute top-[4rem] left-0  lg:w-[43rem]  mt-3 lg:bg-white  lg:rounded-full lg:shadow-md z-10 overflow-hidden"
            ref={containerRef}>
            <div className="overflow-hidden">
              <motion.div
                ref={listRef}
                className="grid grid-rows-1 grid-flow-col gap-3 py-2 px-3 "
                drag="x"
                dragConstraints={dragConstraints}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => {
                  setTimeout(() => setIsDragging(false), 100);
                }}
                dragElastic={0.2}
                style={{
                  touchAction: "none",
                }}>
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination) => (
                    <motion.button
                      key={destination.value}
                      onClick={() => handleCountrySelect(destination.value)}
                      className={cn(
                        "py-1 px-6 rounded-full text-black text-sm  bg-[#ececec] flex items-center justify-center",
                        initialCountry === destination.value
                          ? ""
                          : "hover:bg-accentRed hover:text-white",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}>
                      {destination.label}
                      {initialCountry === destination.value}
                    </motion.button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 w-full">
                    No destinations found
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationSelect;
