import { Input, InputNumber, Table, Typography } from 'antd'
import React from 'react'

const {Title} = Typography

export default function Cart({cart}: any) {

  // columns 
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
        key: "Amount",
        render: (item: any) => {
          console.log(item, 'item')
            return <InputNumber defaultValue={1} min={1} onChange={(e) => onChange(e,item)}/>
        }
      },
  ]

  const onChange = (e,b) => {
    console.log(e, 'onChange', b);
  }

  // checkout
  const checkout  = (items: [], amount: number = 0) => {
    let total: number =0;

    items?.map(item => {
      total += item?.price * (amount !==0 ? amount : 1);
      // return 
    });

    console.log('total', total)
  }
 

    // data resource
    const data = cart ? cart?.map((item: any) => (
        {
            key: item?.id,
            productName: item?.productName,
            productID: item?.productID,
            price: item?.price,
          }
    )) : '';

    data && checkout(data);

  return (
    <div>
        <Title level={4} style={{textAlign: "center"}}>Cart Items</Title>
        {
           cart && <Table columns={columns} dataSource={data}/>
        }
    </div>
  )
}
