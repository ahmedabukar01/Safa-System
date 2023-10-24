"use client";
export const dynamic = "force-dynamic";
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
// import { getClient } from "../lib/client";

const Products = gql` query{
    products {
        id
        price
    }
    }
    `

export default function TestingPgae() {

    const {data} = useSuspenseQuery(Products);
    // const { data } = await getClient().query({ query })

    console.log('data')
  return (
    <div>Testing Page</div>
  )
}
