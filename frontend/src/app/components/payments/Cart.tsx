import * as React from 'react'
import { Input, InputNumber, Table, Typography } from 'antd'

const {Title} = Typography

export default function Cart({cart}: any) {
  const [totalCart, setTotalCart] = React.useState<any>([]);

  React.useEffect(() => {
    setTotalCart(cart)
  }, [cart])

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
        
            return <InputNumber 
                    defaultValue={1} 
                    type='number'
                    min={1} 
                    onChange={(e) => onChange(e,item)}
                    
                    />
        }
      },
  ]

  const onChange = (am,item) => {
    const oldCarts = totalCart;

    if(am > 0){
     const newCarts = totalCart.map((cart) => {
        if(cart?.id === item.key){
          return {
            ...cart,
            amount: am
          }
        }
        return cart
      });

      setTotalCart(newCarts)

      console.log(totalCart, 'total new changed')
      checkout(item,am)

    } else {
      console.log('item cannot be les than 1', am)
    }
  }

  // checkout
  // const checkout  = (cart: [], amount: number = 0) => {
  //   let total: number =0;

  //   totalCart?.map(item => {
  //     // total += item?.price * (amount !==0 ? amount : 1);
  //     total += item?.id === cart?.key ? item?.price * (amount !==0 ? amount: 0) : item?.price * 1;
  //   });

  //   console.log('total', total)
  // }
 
  const checkout  = React.useMemo(() => (cart: [], amount: number = 0) => {
    let total: number =0;

    totalCart?.map(item => {
      // total += item?.price * (amount !==0 ? amount : 1);
      // total += item?.id === cart?.key ? item?.price * (amount !==0 ? amount: 0) : item?.price * 1;
      total += item.price * item.amount
    });

    console.log('total', total)
  }, [totalCart]);

    // data resource
    const data = totalCart ? totalCart?.map((item: any) => (
        {
            key: item?.id,
            productName: item?.productName,
            productID: item?.productID,
            price: item?.price,
          }
    )) : '';

    data && checkout(data);

    console.log(cart, 'cart inse')

  return (
    <div>
        <Title level={4} style={{textAlign: "center"}}>Cart Items</Title>
        {
           cart && <Table columns={columns} dataSource={data}/>
        }
    </div>
  )
}
