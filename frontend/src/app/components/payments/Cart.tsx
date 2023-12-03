import * as React from 'react'
import { Button, Divider, Input, InputNumber, Table, Typography } from 'antd'
import { center } from '@/app/css/styles';
import { useMutation } from '@apollo/client';
import { SavePaymentReport } from '@/app/graphql';
import Loading from '@/app/loading';
import { Suspense } from 'react';
import { GreenLight, RedLight, WarningAlert } from '../utils/alerts';

const {Title} = Typography

export default function Cart({cart, setCart}: any) {
  const [totalCart, setTotalCart] = React.useState<any>([]);
  const [createPayment] = useMutation(SavePaymentReport)

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
      {
        title: "Remove", 
        key: "remove",
        render: (item: any) => (<Button danger type='text' onClick={(e) => removeItem(item)}>Remove</Button>)
      }
  ]

  const removeItem = (item: any) => {
    setCart(cart.filter((crt) => crt.productID !== item.productID));
  }

  const onChange = (am: any,item: any) => {

    if(am > 0){
     const newCarts = totalCart.map((itemCart) => {
        if(itemCart?.productID === item.key){
          return {
            ...itemCart,
            amount: am
          }
        }
        return itemCart
      });
      // setTotalCart(newCarts)
      setCart(newCarts)
      // checkout() // this testing

    } else {
      console.log('item cannot be les than 1', am);
      WarningAlert("Warning", "item cannot be less than 1");
    }
  }

  // checkout old one
  // const checkout  = (cart: [], amount: number = 0) => {
  //   let total: number =0;

  //   totalCart?.map(item => {
  //     // total += item?.price * (amount !==0 ? amount : 1);
  //     total += item?.id === cart?.key ? item?.price * (amount !==0 ? amount: 0) : item?.price * 1;
  //   });

  //   console.log('total', total)
  // }


  const checkout  = React.useMemo(() => () => {
    let total: number = 0;
    totalCart?.map(item => {
      // total += item?.price * (amount !==0 ? amount : 1);
      // total += item?.id === cart?.key ? item?.price * (amount !==0 ? amount: 0) : item?.price * 1;
      total += item.price * item.amount
    });

    localStorage.setItem("total", JSON.stringify(total));
    
  }, [totalCart]);

    // data resource
    let customLoading = true; // may be later usage !!!
    const data = totalCart ? totalCart?.map((item: any) => (
        {
            key: item?.productID,
            productName: item?.productName,
            productID: item?.productID,
            price: item?.price,
          }
    )) : '';

    customLoading = false;
    data && checkout(data);


    const onFinish = async () => {
      const res = await createPayment({
        variables: {input: {
          total: parseFloat(localStorage.getItem("total")!),
          items: totalCart
        }}
      });

      if(res.errors){
        console.error(res.errors)
        return RedLight("Error", `${res?.errors[0]?.extensions?.exception?.message}`)
      } 
      
      GreenLight("Success", "Payment Succussfully Saved");
      setCart([]) // @also clear lcoalStorage.
    }

  return (
    <div style={{...center}}>
      <Divider />
      {
        cart.length > 0 && (
          <>
            {/* <Suspense fallback={<Loading />}> */}
              <Title level={4}>Cart Items</Title>
              <Table columns={columns} dataSource={data} />
              <Title level={5} style={center}>Total: {localStorage.getItem("total")}</Title>
              <Button onClick={onFinish} type='primary' style={{background: "#22bb33"}}>Finish Checkout</Button>
            {/* </Suspense> */}
         </>
        )
      }
    </div>
  )
}
