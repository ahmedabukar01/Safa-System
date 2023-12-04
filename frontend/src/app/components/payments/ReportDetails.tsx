import * as React from 'react'
import { Button, Table } from 'antd'

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
      title: "Price",
      key: "price",
      dataIndex: "price"
    },
    {
        title: "Amount",
        key: "amount",
        dataIndex: "amount"
    },
  ]

export default function ReportDetails({data}: any) {
    console.log('data', data)
  return (
    <>
     <div>
        <Table columns={columns} dataSource={data?.items}/>
        Total: <Button type='primary'>{data?.total}</Button>
     </div>
    </>
  )
}
