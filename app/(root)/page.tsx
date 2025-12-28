import { auth } from '@/auth'
import BookList from '@/components/BookList'
import BookOverview from '@/components/BookOverview'
import { sampleBooks } from '@/constants'
import { db } from '@/database/drizzle'
import { books, users } from '@/database/schema'

const Home = async () => {
	const session = await auth()
	
	return (
		<>
			<BookOverview { ...sampleBooks[0] } userId={session?.user?.id as string} />
			<BookList
				title='Latest Books'
				books={sampleBooks}
				containerClassName='mt-28'
			/>
		</>
	)
}

export default Home
