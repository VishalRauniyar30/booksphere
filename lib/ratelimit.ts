import { Ratelimit } from '@upstash/ratelimit'

import redis from '@/database/redis'
// import { type NextFetchEvent, type NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(5, '1m'),
	analytics: true,
	prefix: '@upstash/ratelimit'
})

// async function middleware(
// 	request: NextRequest,
// 	context: NextFetchEvent
// ): Promise<Response | undefined> {
// 	const ip = request.ip ?? '127.0.0.1'
// }

export default ratelimit