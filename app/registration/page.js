{/* <>
"use client";

import { useState } from "react";
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
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name is required"),
    rollNo: z.string().min(2, "Roll No. is required"),
    course: z.string().min(2, "Course is required"),
    college: z.enum(["Shivaji College", "Other"]),
    otherCollege: z.string().min(2, "College name is required").optional(),
    phone: z.string().length(10, "Phone number must be exactly 10 digits"),
    event: z.enum(["UI/UX Workshop", "Gaming Event", "Coding Event"]),
    query: z.string().optional(),
});

const Registration = () => {
    const [college, setCollege] = useState("");
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log("Form Submitted", data);
        toast.success("Registration Successful!");
        reset();
        setCollege("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl space-y-6">
                <h1 className="text-3xl font-bold text-center">Registration</h1>
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

                    <Select onValueChange={(value) => {
                        setValue("college", value);
                        setCollege(value);
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select College" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Shivaji College">Shivaji College</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.college && <p className="text-red-500">{errors.college.message}</p>}

                    {college === "Other" && (
                        <>
                            <Input type="text" placeholder="Enter College Name" {...register("otherCollege", { required: "College name is required" })} />
                            {errors.otherCollege && <p className="text-red-500">{errors.otherCollege.message}</p>}
                        </>
                    )}

                    <Input type="text" placeholder="Phone" {...register("phone")} />
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

                    <Textarea placeholder="Your Query (Optional)" {...register("query")} />

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default Registration;

</> */}

const Registration = () => {

	return (
		<>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfKTlfbDnhaYzUJOAetsGA3goKXje9iC_Vb-6lUbOGNL43PoA/viewform?embedded=true"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					border: "none"
				}}>Loading…
			</iframe>
		</>
	);
};

export default Registration;
