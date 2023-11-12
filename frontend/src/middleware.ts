import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers';

export function middleware(request: NextRequest){
    const token: any = request.cookies.get('id')?.value;
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/register"; 

    if(!isPublicPath && token?.length > 0){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if(token?.length > 0 && isPublicPath){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
}

export const config = {
    matcher: ["/products/:path*","/test/:path*","/", "/login", "/register"]
}