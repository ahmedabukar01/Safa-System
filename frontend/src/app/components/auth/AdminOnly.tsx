import { notFound, useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'

const ALLOWED_ROLES = ["ADMIN", "SUPER_ADMIN"]

export default function AdminOnly() {
    const router = useRouter()
    const userRole = useSelector((state) => state.UserInfo.role);

    if(!ALLOWED_ROLES.includes(userRole)){
        notFound();
    } else {
        return 
    }
}
