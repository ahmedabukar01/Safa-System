'use client'
import * as React from "react";
import { Content } from "antd/es/layout/layout";
import { notFound } from "next/navigation";
import { Typography } from "antd";

const {Title} = Typography
export default function SuperPage() {
  const [userInfo, setUserInfo] = React.useState({});

  // if(typeof window !== 'undefined') {
  //   setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")!));
  // }

 React.useEffect(() => {
  if(typeof localStorage !== 'undefined') {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")!));
  }
 }, [])

  if(userInfo?.role !== "SUPER_ADMIN"){
    console.log(userInfo, 'ADMIN NAME')
    // notFound()
    // return (
    //   <h1>You are not authorized to this resource</h1>
    // )
  }
  return (
    <>
    <div>You come across the Super Admin page!!!</div>

    <Title level={2}>Create New User</Title>
    </>
  )
}
