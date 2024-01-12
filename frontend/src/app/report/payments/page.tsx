"use client"
import React from 'react'
import { AllPaymentReport } from '@/app/graphql'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button, DatePicker, Divider, Space, Table, Typography } from 'antd'
import { formatDate, formatDateString } from '@/app/components/utils/Dates'
import { ColumnSorter } from '@/app/components/utils/general'
import ReportDetails from '@/app/components/payments/ReportDetails'
import Link from 'next/link'
import { center } from '@/app/css/styles'

const {RangePicker} = DatePicker
const dateFormat = 'YYYY-MM-DD';

interface FilterType {
  startDate: String | undefined
  endDate: String | undefined
}

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
  const [filters, setFilters] = React.useState<FilterType>();
    const {data, networkStatus} = useSuspenseQuery(AllPaymentReport,  
      {
      fetchPolicy: "no-cache",
      variables: {
        filters: {
          ...filters
        }
      }
    }
      );

      const dateOnChange = (d: any) => {
        
        if (d === null) {
          setFilters({
            ...filters,
            startDate: undefined,
            endDate: undefined,
          });
        } else {
          const sd = d[0].$d;
          const ed = d[1].$d;
    
          const start = formatDateString(sd);
          const end = formatDateString(ed);
    
          setFilters({
            ...filters,
            startDate: start,
            endDate: end,
          });
        }
      }

  return (
    <>
      <div style={center}>
      <Title level={2}>Your Latest Transections</Title>
      <Divider />
      Pick Date Range: <RangePicker format={dateFormat} onChange={dateOnChange} />
      <br/> <br />
      </div>
      <Table columns={columns} dataSource={data?.payments} />
    </>
  )
}
