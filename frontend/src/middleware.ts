import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const token = request.cookies.get('id')
    const headers = request;
    // console.log('headers', headers);
}