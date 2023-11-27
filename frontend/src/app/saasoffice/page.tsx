'use client'
import * as React from "react";
import { Content } from "antd/es/layout/layout";
import { notFound } from "next/navigation";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import CreateUserForm from "../components/CreateUserForm";
import { center } from "../css/styles";

const {Title} = Typography
export default function SuperPage() {
  // const [userInfo, setUserInfo] = React.useState({});
  const value = useSelector((state) => state.UserInfo.role);

  // if(typeof window !== 'undefined') {
  //   setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")!));
  // }

//  React.useEffect(() => {
//   if(typeof localStorage !== 'undefined') {
//     setUserInfo(JSON.parse(localStorage.getItem("userInfo")!));
//   }
//  }, [])

  if(value !== "SUPER_ADMIN"){
    notFound()
    return (
      <h1>You are not authorized to this resource</h1>
    )
  }
  return (
    <>
    <div>You come across the Super Admin page!!!</div>

    <Title level={2} style={center}>Register New Client</Title>

    <CreateUserForm />
    </>
  )
}
