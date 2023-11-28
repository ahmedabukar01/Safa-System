"use client";

import React from 'react'
import { notFound, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'

const ALLOWED_ROLES = ["ADMIN", "SUPER_ADMIN"]

export function AdminOnly() {
    const router = useRouter()
    const userRole = useSelector((state) => state.UserInfo.role);

    if(!ALLOWED_ROLES.includes(userRole)){
        notFound();
    } else {
        return 
    }
}


export function SuperAdminOnly(){
    const router = useRouter()
    const userRole = useSelector((state) => state.UserInfo.role);

    if(userRole !== "SUPER_ADMIN"){
        notFound()
        return (
          <h1>You are not authorized to this resource</h1>
        )
      }
}