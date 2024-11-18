"use client";
/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"; // Import the drawer components from shadcn

interface ReservationFormProps {
  image: string;
  price: string;
  startDate: string;
  endDate: string;
  meta_title: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  image,
  price,
  startDate,
  endDate,
  meta_title,
}) => {
  return (
    <div className="bg-backgroundColor sticky top-0 p-4 xl:p-6 rounded-xl">
      {/* Desktop Version - Visible only on larger screens */}
      <div className="hidden lg:block ">
        <div className="relative">
        <Image
          src={image}
          alt={meta_title}
          className="rounded-xl w-full h-60 object-cover mb-4 "
          width={300}
          height={200}
        />
        <div className="absolute bottom-2 xl:bottom-4 right-2 text-right xl:right-4 bg-white text-primary p-2 rounded-xl">
          <p className="text-lg font-bold">{price}</p>
          <p className="text-sm">Total / per person</p>
        </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">{meta_title}</h2>
        <div className="flex gap-2 justify-between mt-4 bg-white p-2 rounded-xl">
          <div className="bg-backgroundColor w-full p-2 rounded-xl">
            <p className="text-xs text-primary-foreground">Departure date</p>
            <p className="xl:text-lg font-medium">{startDate}</p>
          </div>
          <div className="bg-backgroundColor w-full p-2 rounded-xl">
            <p className="text-xs text-primary-foreground">End date</p>
            <p className="xl:text-lg font-medium">{endDate}</p>
          </div>
        </div>
        <form className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-xl"
          />
          <select className="w-full p-3 border rounded-xl">
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
          </select>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-full mt-4">
            Reserve
          </button>
        </form>
        <p className="text-sm text-center text-primary-foreground mt-2">
          You don't have to pay now!
        </p>
      </div>

      {/* Mobile Version - Fixed Bottom Bar and Drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">{price}</p>
          <p className="text-sm">
            {startDate} - {endDate}
          </p>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="bg-primary text-white rounded-full  w-1/3">
              Reserve
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>{meta_title}</DrawerTitle>
              <DrawerDescription>{startDate} - {endDate}</DrawerDescription>
              
              <DrawerDescription>Reserve Your Spot & Fill out your details below:</DrawerDescription>
            </DrawerHeader>
            {/* Reservation Form Inside Drawer */}
            <div className="p-6">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded-xl"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-xl"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-xl"
                />
                <select className="w-full p-3 border rounded-xl">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-full mt-4">
                  Reserve
                </button>
              </form>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="mt-4">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default ReservationForm;
