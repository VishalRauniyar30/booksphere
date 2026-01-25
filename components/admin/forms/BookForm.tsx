'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"

import FileUpload from "@/components/FileUpload"
import {
	Form, FormControl, FormField, FormItem,
	FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookSchema } from "@/lib/validations"
import ColorPicker from "../ColorPicker"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createBook } from "@/lib/admin/actions/book"
import { toast } from "@/hooks/use-toast"

const BookForm = () => {
	const router = useRouter()

	const form = useForm<z.infer<typeof bookSchema>>({
		defaultValues: {
			title: "",
			description: "",
			author: "",
			genre: "",
			rating: 1,
			totalCopies: 1,
			coverUrl: "",
			coverColor: "#aaabcc",
			videoUrl: "",
			summary: "",
		}
	})

	const onSubmit = async (values: z.infer<typeof bookSchema>) => {
		const result = await createBook(values)

		if (result.success) {
			toast({
				title: "Success",
				description: "Book created successfully"
			})
			router.push(`/admin/books/${result.data.id}`)
		} else {
			toast({
				title: "Error",
				description: result.message,
				variant: "destructive",
			})
		}
	}

	return (
		<Form { ...form }>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name={'title'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Title
							</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book Title"
									{...field}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'author'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Author
							</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book Author"
									{...field}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'genre'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Genre
							</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book Genre"
									{...field}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'rating'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Rating
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									min={1}
									max={5}
									placeholder="Book Rating"
									{...field}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'totalCopies'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Total Copies
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									min={1}
									max={10000}
									placeholder="Total Copies"
									{...field}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'coverUrl'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Image
							</FormLabel>
							<FormControl>
								<FileUpload
									type="image"
									accept="image/*"
									placeholder="Upload a book cover"
									folder="books/covers"
									variant="light"
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'coverColor'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Primary Color
							</FormLabel>
							<FormControl>
								<ColorPicker
									onPickerChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'description'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Description
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Book Description"
									{...field}
									rows={10}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'videoUrl'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Trailer
							</FormLabel>
							<FormControl>
								<FileUpload
									type="video"
									accept="video/*"
									placeholder="Upload a book trailer"
									folder="books/videos"
									variant="light"
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'summary'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Summary
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Book Summary"
									{...field}
									rows={5}
									className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="min-h-14 text-white w-full bg-[#25388C] hover:bg-[#25388C]/95">
					Add Book To Library
				</Button>
			</form>
		</Form>
	)
}

export default BookForm