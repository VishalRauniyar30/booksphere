import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import { eq } from 'drizzle-orm'

import Header from '@/components/Header'
import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'

export default async function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = await auth()

	if (!session) redirect('/sign-in')
	
	after(async () => {
		if (!session.user?.id) return
		
		const user = await db
			.select()
			.from(users)
			.where(eq(users.id, session.user.id))
			.limit(1)
		
		if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return
		
		await db
			.update(users)
			.set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
			.where(eq(users.id, session.user.id))
	})
	
	return (
		<main className='flex min-h-screen flex-1 flex-col bg-pattern bg-cover bg-top bg-dark-100 px-5 xs:px-10 md:px-16'>
			<div className='mx-auto max-w-7xl'>
				<Header session={session} />
				<div className='mt-20 pb-20'>{children}</div>
			</div>
		</main>
	)
}
