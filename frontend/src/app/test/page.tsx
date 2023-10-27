"use client";
export const dynamic = "force-dynamic";
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useAppContext } from "../lib/AppContext";
import { useEffect, useState } from "react";
// import { getClient } from "../lib/client";

const Products = gql` query{
    products {
        id
        price
    }
    }
    `

export default function TestingPgae() {
  const {state, setState} = useAppContext();


    // const {data, error} = useSuspenseQuery(Products)
  return (
    <>
    <h1>Welocme</h1>
    </>
  )
}
