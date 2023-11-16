"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { Table } from 'antd'
import { Categories } from '../graphql'

const columns = [
  {
    title: "Name",
    key: "name",
    dataIndex: "name"
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description"
  },
  {
    title: "createdAt",
    key: "createdAt",
    dataIndex: "createdAt"
  },
  {
    title: "Products",
    key: "products",
    dataIndex: "products"
  },
]

export default function AllCategories() {
  const {data, error} = useSuspenseQuery(Categories)
  // console.log('data', data)

  const dataSource = data?.categories.map((category:any) => (
    {
      key: category?.id,
      id: category?.id,
      name: category?.name,
      description: category?.description,
      products: category?.products?.length,
      createdAt: category?.createdAt
    }
  ))
  return (
    <Table
    columns={columns}
    dataSource={dataSource}
    />
  )
}
