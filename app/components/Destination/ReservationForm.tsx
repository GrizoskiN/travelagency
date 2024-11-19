/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

// Form validation schema using yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  guests: yup.string().required("Please select the number of guests"),
  meta_title: yup.string().required(), 
}).required();

interface FormData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  meta_title: string;
}

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data: FormData) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setShowSuccessPopup(true); // Show success popup
      reset(); // Reset form fields
    } catch (error) {
      console.error("Error sending email:", error);
      setShowErrorPopup(true); // Show error popup
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  return (
    <div className="bg-backgroundColor sticky top-0 p-4 xl:p-6 rounded-xl">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Success!</h2>
            <p>Your reservation request has been sent successfully!</p>
            <button
              className="mt-4 bg-primary text-white py-2 px-4 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Error</h2>
            <p>There was an error sending your request. Please try again.</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Desktop Version - Visible only on larger screens */}
      <div className="hidden lg:block">
        <div className="relative">
          <Image
            src={image}
            alt={meta_title}
            className="rounded-xl w-full h-60 object-cover mb-4"
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
        <form className="space-y-4 mt-6" onSubmit={handleSubmit(submitHandler)}>
          {/* Hidden input for meta_title */}
          <input
            type="hidden"
            {...register("meta_title")}
            value={meta_title}
          />

          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full p-3 border rounded-xl"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border rounded-xl"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phone")}
            className="w-full p-3 border rounded-xl"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <select
            {...register("guests")}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Guests</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
          {errors.guests && <p className="text-red-500">{errors.guests.message}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-full mt-4"
          >
            Reserve
          </button>
        </form>
        <p className="text-sm text-center text-primary-foreground mt-2">
          You don't have to pay now!
        </p>
      </div>

      {/* Mobile Version - Fixed Bottom Bar and Drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-primary p-4 flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold text-white">{price}</p>
          <p className="text-sm text-primary-foreground">
            {startDate} - {endDate}
          </p>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="bg-white text-primary rounded-full w-1/3">
              Reserve
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[75vh]">
            <DrawerHeader>
              <DrawerTitle>{meta_title}</DrawerTitle>
              <DrawerDescription>
                {startDate} - {endDate}
              </DrawerDescription>
              <DrawerDescription>
                Reserve Your Spot & Fill out your details below:
              </DrawerDescription>
            </DrawerHeader>
            {/* Reservation Form Inside Drawer */}
            <div className="p-4 mt-5">
              <form
                className="space-y-4"
                onSubmit={handleSubmit(submitHandler)}
              >
                {/* Hidden input for meta_title */}
                <input
                  type="hidden"
                  {...register("meta_title")}
                  value={meta_title}
                />

                <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className="w-full p-3 border rounded-xl"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full p-3 border rounded-xl"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full p-3 border rounded-xl"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                <select
                  {...register("guests")}
                  className="w-full p-3 border rounded-xl"
                >
                  <option value="">Select Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
                {errors.guests && <p className="text-red-500">{errors.guests.message}</p>}

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-full"
                >
                  Reserve
                </button>
              </form>
            </div>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default ReservationForm;
