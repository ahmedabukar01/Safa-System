import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers';
import { useSelector } from "react-redux";

const protectedRoutes = [
    "/products/create",
    "/cateogry/create",
    "/dashboard"
]

export async function middleware(request: NextRequest){
    const token: any = request.cookies.get('id')?.value;
    const path = request.nextUrl.pathname;

    console.log('path', path)

    const isPublicPath = path === "/login"; 

    if(!isPublicPath && !token?.length > 0){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if(token?.length > 0 && isPublicPath){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    
    // if(path === `/${process.env.ADMINPATH}` && role !== process.env.ADMINNAME){

    //     console.log('the res', path, 'and ', role)
    // }
    
}

// const verifyAdmin = async (token: string) => {
//     const decoded = await jwt.verify(token, process.env.SECRET);
//     console.log('decoded', decoded)
//     return decoded;
// }


export const config = {
    matcher: ["/products/:path*", "/categories/:path*", "/test/:path*", "/", "/login", "/register", "/saasoffice/:path*", "/report/:path*"]
}