'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { toast } from "@/hooks/use-toast"
import { borrowBook } from "@/lib/actions/book"
import { Button } from "./ui/button"

interface Props{
	bookId: string;
	userId: string;
	 borrowingEligibility: {
		isEligible: boolean;
		message: string;
	};
}

const BorrowBook = ({ userId, bookId, borrowingEligibility: { isEligible, message } }: Props) => {
	const router = useRouter()
	const [borrowing, setBorrowing] = useState(false)

	const handleBorrowBook = async () => {
		if (!isEligible) {
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			})
		}
		setBorrowing(true)

		try {
			const result = await borrowBook({ bookId, userId })

			if (result.success) {
				toast({
					title: "Success",
					description: "Book borrowed successfully",
				})

				router.push("/")
			} else {
				toast({
					title: "Error",
					description: result.error,
					variant: "destructive",
				})
			}

		} catch (error) {
			console.log(error)
			toast({
				title: "Error",
				description: "An error occurred while borrowing the book",
				variant: "destructive",
			})
		} finally {
			setBorrowing(false)
		}
	}

	return (
		<Button onClick={handleBorrowBook} disabled={borrowing} className="mt-4 min-h-14 w-fit bg-primary text-dark-100 hover:bg-[#E7C9A5]/90 max-md:w-full">
			<Image
				src='/icons/book.svg'
				alt="book"
				width={20}
				height={20}
			/>
			<p className="font-bebas-neue text-xl text-dark-100">
				{borrowing ? "Borrowing ..." : "Borrow Book"}
			</p>
		</Button>
	)
}

export default BorrowBook