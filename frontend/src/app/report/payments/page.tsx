"use client"
import React from 'react'
import { AllPaymentReport } from '@/app/graphql'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button, Space, Table, Typography } from 'antd'
import { formatDate } from '@/app/components/utils/Dates'
import { ColumnSorter } from '@/app/components/utils/general'
import ReportDetails from '@/app/components/payments/ReportDetails'
import Link from 'next/link'
import { center } from '@/app/css/styles'

const {Title} = Typography;

const columns = [
    {
      title: "Date",
      key: "date",
      dataIndex: "createdAt",
      render: (d: any) => formatDate(d),
      sorter: (a: any, b: any) => a?.total - b?.total,
    },
    {
      title: "Total Items",
      key: "totalItems",
      dataIndex: "items",
      render: (items: any) => items.length,
      sorter: (a: any, b: any) => ColumnSorter(a?.items?.length, b?.items?.length)
    },
    {
      title: "Total Price",
      key: "totalAmount",
      dataIndex: "total",
      sorter: (a: any, b: any) => a?.total - b?.total,
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => {
        return (
          <Link href={`/report/payments/${item?.id}`}><Button>View Details</Button></Link>
          // <ReportDetails />
        )
      }
    },
  ]

export default function PaymentReport() {
    const {data, networkStatus} = useSuspenseQuery(AllPaymentReport);
    console.log('dd', data);
  return (
    <>
      <Title level={2} style={center}>Your Latest Transections</Title>
    <Table columns={columns} dataSource={data?.payments} />
    </>
  )
}
