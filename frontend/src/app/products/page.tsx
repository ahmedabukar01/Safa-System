"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { Table } from 'antd'
import { Products } from '../graphql'

const columns = [
  {
    title: "Product ID",
    key: "prodID",
    dataIndex: "productID"
  },
  {
    title: "Product Name",
    key: "pro name",
    dataIndex: "productName"
  },
  {
    title: "Category",
    key: "catogory",
    dataIndex: "category"
  },
  {
    title: "createdAt",
    key: "createdAt",
    dataIndex: "createdAt"
  },
]

export default function Proudcts() {
  const {data, error} = useSuspenseQuery(Products, {
    fetchPolicy: "no-cache"
  })
  console.log('data', data)

  const dataSource = data?.products.map((product:any) => (
    {
      key: product?.id,
      productName: product?.productName,
      productID: product?.productID,
      price: product?.price,
      category: product?.category?.name,
      createdAt: product?.createdAt
    }
  ))
  return (
    <Table
    columns={columns}
    dataSource={dataSource}
    />
  )
}
