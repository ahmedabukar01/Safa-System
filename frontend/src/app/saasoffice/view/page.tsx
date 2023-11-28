"use client"
import * as React from 'react'
import { notFound, useRouter } from "next/navigation"
import { SuperAdminOnly } from "@/app/components/auth/AdminOnly"
import { formatDate, formatDateTime } from "@/app/components/utils/Dates"
import { AllClients } from "@/app/graphql"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { Table, Typography } from "antd"
import { useSelector } from "react-redux"
import { center } from '@/app/css/styles'

const {Title} = Typography

const columns = [
    {
      title: "FullName",
      key: "fullName",
      dataIndex: "fullName"
    },
    {
      title: "Role",
      key: "Role",
      dataIndex: "role"
    },
    {
      title: "Access",
      key: "access",
      dataIndex: "access",
      render: (access) => String(access)
    },
    {
        title: "Email",
        key: "email",
        dataIndex: "email"
    },
  
    {
      title: "Joined",
      key: "joined",
      dataIndex: "createdAt",
      render: (createdAt) => formatDate(createdAt)
    },
    {
        title: "Last Logged",
        key: "last Logged",
        dataIndex: "lastLogged",
        render: (lastLogged) => formatDateTime(lastLogged)
      },
  ]

export default function ViewClients() {
  // const router = useRouter();
  // const userRole = useSelector((state) => state.UserInfo.role);
  // if(userRole !== "SUPER_ADMIN"){
  //     notFound()
  //     return (
  //       <h1>You are not authorized to this resource</h1>
  //     )
  //   }

  SuperAdminOnly()
    
    // here
    const {data} = useSuspenseQuery(AllClients, {fetchPolicy: "no-cache"});
    console.log(data)

    const dataSource = data?.users?.map((user) => {
        return {
            key: user?.id,
            id: user?.id,
            fullName: user?.fullName,
            access: user?.access,
            email: user?.email,
            role: user?.role,
            createdAt: user?.createdAt,
            lastLogged: user?.lastLogged,
        }
    })
  return (
    <>
    <Title level={2} style={center}>All Registered Users On The System</Title>
    <Table columns={columns} dataSource={dataSource}/>
    </>
  )
}
