"use client"
import React from 'react'
import { AllPaymentReport } from '@/app/graphql'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button, Table } from 'antd'
import { formatDate } from '@/app/components/utils/Dates'
import { ColumnSorter } from '@/app/components/utils/general'

const columns = [
    {
      title: "Date",
      key: "date",
      dataIndex: "createdAt",
      render: (d: any) => formatDate(d)
    },
    {
      title: "Total Items",
      key: "totalItems",
      dataIndex: "items",
      render: (items: any) => items.length,
      sorter: (a: any, b: any) => ColumnSorter(a?.items?.length, b?.items?.length)
    },
    {
      title: "Total Amount",
      key: "totalAmount",
      dataIndex: "total",
      sorter: (a: any, b: any) => a?.total - b?.total,
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <Button>View Details</Button>
        )
      }
    },
  ]

export default function PaymentReport() {
    const {data, networkStatus} = useSuspenseQuery(AllPaymentReport);
    console.log('dd', data);
  return (
    <>
    <Table columns={columns} dataSource={data?.payments} />
    </>
  )
}
