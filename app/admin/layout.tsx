import { ReactNode } from "react"

import Header from "@/components/admin/Header"
import Sidebar from "@/components/admin/Sidebar"

export default async function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<main>
			<Sidebar />
			<div>
				<Header />
				{children}
			</div>
		</main>
	)
}