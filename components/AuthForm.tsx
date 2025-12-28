"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
	DefaultValues, FieldValues, Path,
	SubmitHandler, useForm, UseFormReturn
} from 'react-hook-form'
import { ZodType } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Form, FormControl, FormField,
	FormItem, FormLabel, FormMessage
} from './ui/form'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import FileUpload from './FileUpload'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'

interface Props<T extends FieldValues> {
	schema: ZodType<T, FieldValues>;
	defaultValues: T;
	onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
	type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
	type, schema, defaultValues, onSubmit
}: Props<T>) => {
	const router = useRouter()

	const isSignIn = type === 'SIGN_IN'

	const form: UseFormReturn<FieldValues, unknown, T> = useForm({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	})

	const handleSubmit: SubmitHandler<T> = async (data) => {
		const result = await onSubmit(data)

		if (result.success) {
			toast({
				title: 'Success',
				description: isSignIn ? 'You have successfully signed in.' : 'You have successfully signed up.'
			})
			
			router.push('/')
		} else {
			toast({
				title: `Error ${isSignIn ? 'signing in': 'signing up'}`,
				description: result.error ?? "An error occurred",
				variant: 'destructive'
			})
		}
	}

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-2xl font-semibold text-white'>
				{isSignIn ? "Welcome Back to BookSphere" : " Create Your Library Account"}
			</h1>
			<p className="text-light-100">
				{isSignIn
				? "Access the vast collection of resources, and stay updated"
				: "Please complete all fields and upload a valid university ID to gain access to the library"}
			</p>
			<Form { ...form }>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='w-full space-y-6'>
					{Object.keys(defaultValues).map((field) => (
						<FormField
							key={field}
							control={form.control}
							name={field as Path<T>}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='capitalize'>
										{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
									</FormLabel>
									<FormControl>
										{field.name === 'universityCard' ? (
											<FileUpload
												type='image'
												accept='image/*'
												placeholder='Upload Your ID'
												folder='ids'
												variant='dark'
												onFileChange={field.onChange}
											/>
										) : (
											<Input
												required
												type={
													FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]	
												}
												{...field}
												className='w-full min-h-14 border-none text-base font-bold placeholder:font-normal text-white placeholder:text-[#D6E0FF] focus-visible:ring-0 focus-visible:shadow-none bg-dark-300'	
											/>
										)}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button type='submit' className='bg-primary text-dark-100 hover:bg-[#E7C9A5] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base'>
						{isSignIn ? "Sign In": "Sign Up"}
					</Button>
				</form>
			</Form>
			<p className='text-center text-base font-medium'>
				{isSignIn ? "New to BookSphere?" : "Already have an account?"}
				<Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-primary'>
					&nbsp;{isSignIn ? "Create an Account" : "Sign In"}
				</Link>
			</p>
		</div>
	)
}

export default AuthForm