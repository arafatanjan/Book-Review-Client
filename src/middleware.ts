export { default } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserInfo } from "./services/auth.services";
 
// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === './login' || path === './register'  ;
    const userInfo =await getUserInfo()
    // console.log(userInfo.id)

    if(userInfo.id){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  return NextResponse.redirect(new URL('/login', request.url))
}
 

export const config = { matcher: [] }