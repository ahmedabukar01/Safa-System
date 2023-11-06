"use client";
// export const dynamic = "force-dynamic";
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useAppContext } from "../lib/AppContext";
import { useEffect, useState } from "react";
import { Products } from "../graphql";
// import { getClient } from "../lib/client";

export default function TestingPgae() {
  // const {authToken}: any = useAppContext();
  const token = localStorage.getItem('token')

  console.log('authToken in test', token);


    const {data, error} = useSuspenseQuery(Products);
    if(error) return <h1>Error</h1>

    console.log('data', data);

  return (
    <>
    <h1>Welocme</h1>
    </>
  )
}
