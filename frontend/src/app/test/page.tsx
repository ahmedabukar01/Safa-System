"use client";
// export const dynamic = "force-dynamic";
import { gql, useMutation } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useAppContext } from "../lib/AppContext";
import { useEffect, useState } from "react";
import { Logout, Products } from "../graphql";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "../globalRedux/features/userSlice";
// import { getClient } from "../lib/client";

export default function TestingPgae() {
  // const {userInfo, setUserInfo}: any = useAppContext()
  const dispatch = useDispatch();
  const value = useSelector((state) => state.UserInfo.role);
  console.log('value', value)

  const [logout, {data}] =  useMutation(Logout)

    const Logut = async () => {
      const res = await logout();

      console.log('result', res.data);
    }

    const setUser = () => {
      const role: string ="users"
      // dispatch(updateUser({role: "admin", fullName: "ahmed", access: "true"}))
      dispatch(setUserRole(role))
    }


  return (
    <>
    <h1>Welocme to the Testing Mode</h1>
    <Button onClick={Logut}>Logout</Button>
    <Button onClick={setUser}>update User</Button>f
    </>
  )
}
