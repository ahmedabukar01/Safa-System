"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { Space, Table, Typography } from 'antd'
import { Products } from '../graphql'
import { formatDate } from "../components/utils/Dates"
import { ColumnSorter } from "../components/utils/general"
import { center } from "../css/styles"

const { Title } = Typography
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
    title: "Price",
    key: "price",
    dataIndex: "price",
    sorter: (a: any, b: any) => ColumnSorter(a?.price, b?.price)
  },

  {
    title: "createdAt",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (d: any) => formatDate(d),
    sorter: (a: any, b: any) => ColumnSorter(a?.createdAt, b?.createdAt)
  },
]

export default function Proudcts() {
  const {data, error} = useSuspenseQuery(Products, {
    fetchPolicy: "no-cache"
  })

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
    <div>
        <Title level={3} style={center}>All Products</Title>
      <Table
      columns={columns}
      dataSource={dataSource}
      />
    </div>
  )
}
