// src/app/page.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

const invalidEmailPrefixes = [
	'test',
	'example',
	'sample',
	'demo',
	'user',
	'admin',
	'info',
	'mail',
	'email',
	'no-reply',
	'noreply',
	'nobody',
	'fake',
	'xyz'
  ];
// Email validation regex for academic emails
const orgEmailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|du\.ac\.in|ipu\.ac\.in|ignou\.ac\.in|jnu\.ac\.in|iitd\.ac\.in|nsut\.ac\.in|dtu\.ac\.in|igdtuw\.ac\.in|aud\.ac\.in|jamiahamdard\.edu|bhu\.ac\.in|bvpindia\.com|mait\.ac\.in|ip\.edu|msit\.in|gbpuat\.ac\.in)$/;

const formSchema = z.object({
    eventCategory: z.enum(["Workshop", "Techloans-25"]),
    email: z.string()
        .email("Invalid email address")
        .regex(orgEmailRegex, "Please use valid EMail ID")
        .refine(
            (email) => {
                const localPart = email.split('@')[0].toLowerCase();
                return !invalidEmailPrefixes.some(prefix => 
                    localPart === prefix || 
                    localPart.startsWith(prefix + '.') || 
                    localPart.startsWith(prefix + '_') ||
                    localPart.startsWith(prefix + '-') ||
                    localPart.includes('example') ||
                    localPart.includes('test')
                );
            },
            {
                message: "Please use your official institutional email address. Example or test emails are not allowed."
            }
        )
        .refine(
            (email) => {
                const localPart = email.split('@')[0].toLowerCase();
                return localPart.length >= 3 && /^[a-z][a-z0-9._%+-]*[a-z0-9]$/i.test(localPart);
            },
            {
                message: "Email address must start with a letter and be at least 3 characters long"
            }
        ),
    name: z.string().min(2, "Name is required"),
	rollNo: z.string().min(2, "Roll No. is required"),
	course: z.string().min(2, "Course is required"),
	college: z.enum(["Shivaji College", "Other"]),
	year: z.enum(["1st Year", "2nd Year", "3rd Year"], {
		required_error: "Please select your year",
	}),
	otherCollege: z.string().min(2, "College name is required").optional(),
	phone: z.string().length(10, "Phone number must be exactly 10 digits")
		.regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
	event: z.enum(["UI/UX Workshop", "Gaming Event", "Coding Event"]),
	query: z.string().optional(),
});

export default function RegistrationPage() {
	const router = useRouter();
	const [college, setCollege] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
		resolver: zodResolver(formSchema),
	});

	// Watch for form values to handle reset properly
	const watchedFields = watch();

	const resetForm = () => {
		reset();
		setCollege("");
		// Reset all select fields explicitly
		setValue("eventCategory", undefined);
		setValue("college", undefined);
		setValue("year", undefined);
		setValue("event", undefined);
	};

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Registration failed');
			}

			toast.success("Registration Successful!");
			resetForm();
			// Redirect after successful submission
			setTimeout(() => {
				router.push('/formsubmitted');
			}, 500); // Small delay to show success message
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<Toaster position="top-center" />
			<div className="max-w-lg mx-auto">
				<div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
					<h1 className="text-3xl font-bold text-center mb-8">Event Registration</h1>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<Select onValueChange={(value) => setValue("eventCategory", value)}>
								<SelectTrigger>
									<SelectValue placeholder="Select Event Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Workshop">Workshop</SelectItem>
									<SelectItem value="Techloans-25">Techloans-25</SelectItem>
								</SelectContent>
							</Select>
							{errors.eventCategory && (
								<p className="mt-1 text-sm text-red-600">{errors.eventCategory.message}</p>
							)}
						</div>

						<div>
							<Input
								type="email"
								placeholder="Email"
								{...register("email")}
								className="block w-full"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
							)}
						</div>

						<div>
							<Input
								type="text"
								placeholder="Full Name"
								{...register("name")}
								className="block w-full"
							/>
							{errors.name && (
								<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
							)}
						</div>

						<div>
							<Input
								type="text"
								placeholder="Roll No."
								{...register("rollNo")}
								className="block w-full"
							/>
							{errors.rollNo && (
								<p className="mt-1 text-sm text-red-600">{errors.rollNo.message}</p>
							)}
						</div>

						<div>
							<Input
								type="text"
								placeholder="Course"
								{...register("course")}
								className="block w-full"
							/>
							{errors.course && (
								<p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
							)}
						</div>

						<div>
							<Select
								onValueChange={(value) => {
									setValue("college", value);
									setCollege(value);
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select College" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Shivaji College">Shivaji College</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</SelectContent>
							</Select>
							{errors.college && (
								<p className="mt-1 text-sm text-red-600">{errors.college.message}</p>
							)}
						</div>

						{college === "Other" && (
							<div>
								<Input
									type="text"
									placeholder="Enter College Name"
									{...register("otherCollege")}
									className="block w-full"
								/>
								{errors.otherCollege && (
									<p className="mt-1 text-sm text-red-600">{errors.otherCollege.message}</p>
								)}
							</div>
						)}
						<div>
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
							{errors.year && (
								<p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
							)}
						</div>

						<div>
							<Input
								type="tel"
								placeholder="Phone Number"
								{...register("phone")}
								className="block w-full"
							/>
							{errors.phone && (
								<p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
							)}
						</div>

						<div>
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
							{errors.event && (
								<p className="mt-1 text-sm text-red-600">{errors.event.message}</p>
							)}
						</div>

						<div>
							<Textarea
								placeholder="Your Query (Optional)"
								{...register("query")}
								className="block w-full"
							/>
						</div>

                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Register'}
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}