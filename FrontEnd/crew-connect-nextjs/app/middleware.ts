// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  
  // Check if the user is trying to access admin pages or admin post pages
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/adminpost')) {
    if (!accessToken) {
      // Redirect to login if no access token is present
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*', '/adminpost/:path*']
}