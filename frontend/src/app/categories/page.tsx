"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { Table } from 'antd'
import { Categories } from '../graphql'
import { formatDate } from "../components/utils/Dates"
import { ColumnSorter } from "../components/utils/general"

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
    title: "Products",
    key: "products",
    dataIndex: "products",
    sorter: (a: any, b: any) => ColumnSorter(a?.products, b?.products)
  },
  {
    title: "createdAt",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (d: any) => formatDate(d),
    sorter: (a: any, b: any) => ColumnSorter(a?.createdAt, b?.createdAt)
  }
]

export default function AllCategories() {
  const {data, error} = useSuspenseQuery(Categories, {
    fetchPolicy: "no-cache"
  })
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
