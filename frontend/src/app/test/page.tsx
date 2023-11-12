"use client";
// export const dynamic = "force-dynamic";
import { gql, useMutation } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useAppContext } from "../lib/AppContext";
import { useEffect, useState } from "react";
import { Logout, Products } from "../graphql";
import { Button } from "antd";
// import { getClient } from "../lib/client";

export default function TestingPgae() {
  const {userInfo, setUserInfo}: any = useAppContext()

  console.log(userInfo,'user')

  const [logout, {data}] =  useMutation(Logout)

    const logut = async () => {
      const res = await logout();

      console.log('result', res.data);
    }



  return (
    <>
    <h1>Welocme to the Testing Mode</h1>
    <Button onClick={logut}>Logout</Button>
    </>
  )
}
