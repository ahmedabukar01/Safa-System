import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers';

export function middleware(request: NextRequest){
    const token = request.cookies.get('id')?.value;

    // console.log('in middleware', token)
}