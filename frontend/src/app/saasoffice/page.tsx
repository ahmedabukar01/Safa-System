'use client'
import * as React from "react";
import { notFound, useRouter } from "next/navigation";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import CreateUserForm from "../components/CreateUserForm";
import { center } from "../css/styles";
import { useMutation } from "@apollo/client";
import { RegisterUser } from "../graphql";
import { SuperAdminOnly } from "../components/auth/AdminOnly";

const {Title} = Typography
export default function SuperPage() {
  const [register] = useMutation(RegisterUser)
  const userRole = useSelector((state) => state.UserInfo.role);

  SuperAdminOnly()
  // if(userRole !== "SUPER_ADMIN"){
  //     notFound()
  //     return (
  //       <h1>You are not authorized to this resource</h1>
  //     )
  //   }

  const onSubmit = async (values: any) => {
    values.access = values.access === "TRUE" ? true : false;

    console.log("values", values)

    const res = await register({variables: {
      input: {
        ...values
      }
    }});

    if(res.errors?.length){
      console.error("Error: ", res.errors);
    } else {
      console.log(res.data);
    }
    
  }

  return (
    <>
    {
      userRole === "SUPER_ADMIN" && (
        <div>
        <Title level={2} style={center}>Register New Client</Title>
    
        <CreateUserForm onSubmit={onSubmit}/>
        </div>
      )
    }
    </>
  )
}
