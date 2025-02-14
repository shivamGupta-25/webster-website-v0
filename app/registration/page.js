"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const formSchema = z.object({
  eventCategory: z.enum(["Workshop", "Techloans-25"]),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  name: z.string().min(2, "Name is required"),
  rollNo: z.string().min(2, "Roll No. is required"),
  course: z.string().min(2, "Course is required"),
  year: z.enum(["1st Year", "2nd Year", "3rd Year"]),
  college: z.enum(["Shivaji College", "Other"]),
  otherCollege: z.string().optional(),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  event: z.enum(["UI/UX Workshop", "Gaming Event", "Coding Event"]),
  query: z.string().optional(),
});

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0Ah_IDoOZ2AaSSl5diSFRegf1Qf9BdbaephiR74Jxu-ZxxB0p-hHy4lL8RKJDqXi8/exec";

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const college = watch("college");

  const resetForm = () => {
    reset();
  };

  const checkDuplicate = async (email, event) => {
    try {
      const response = await fetch(
        `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}&event=${encodeURIComponent(event)}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result.status === "duplicate";
    } catch (error) {
      console.error("Error checking duplicate:", error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const isDuplicate = await checkDuplicate(data.email, data.event);
      if (isDuplicate) {
        toast.error(`The email "${data.email}" is already registered for ${data.event}.`);
        resetForm();
        return;
      }

      const formData = {
        ...data,
        college: data.college === "Other" ? data.otherCollege : data.college,
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === "success") {
        toast.success("Registration successful!");
        resetForm();
        setTimeout(() => router.push("/formsubmitted"), 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select onValueChange={(value) => setValue("eventCategory", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Event Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Techloans-25">Techloans-25</SelectItem>
            </SelectContent>
          </Select>
          {errors.eventCategory && <p className="text-red-500">{errors.eventCategory.message}</p>}

          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <Input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Input type="text" placeholder="Roll No." {...register("rollNo")} />
          {errors.rollNo && <p className="text-red-500">{errors.rollNo.message}</p>}

          <Input type="text" placeholder="Course" {...register("course")} />
          {errors.course && <p className="text-red-500">{errors.course.message}</p>}

          <Select onValueChange={(value) => setValue("year", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st Year">1st Year</SelectItem>
              <SelectItem value="2nd Year">2nd Year</SelectItem>
              <SelectItem value="3rd Year">3rd Year</SelectItem>
            </SelectContent>
          </Select>
          {errors.year && <p className="text-red-500">{errors.year.message}</p>}

          <Select onValueChange={(value) => setValue("college", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Shivaji College">Shivaji College</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.college && <p className="text-red-500">{errors.college.message}</p>}

          {college === "Other" && <Input type="text" placeholder="Enter College Name" {...register("otherCollege")} />}
          {college === "Other" && errors.otherCollege && <p className="text-red-500">{errors.otherCollege.message}</p>}

          <Input type="text" placeholder="Phone Number" {...register("phone")} />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <Select onValueChange={(value) => setValue("event", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UI/UX Workshop">UI/UX Workshop</SelectItem>
              <SelectItem value="Gaming Event">Gaming Event</SelectItem>
              <SelectItem value="Coding Event">Coding Event</SelectItem>
            </SelectContent>
          </Select>
          {errors.event && <p className="text-red-500">{errors.event.message}</p>}

          <Textarea placeholder="Any Query" {...register("query")} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
