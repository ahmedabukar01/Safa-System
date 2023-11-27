"use client"
import * as React from "react";
import CreateCategoryForm from "@/app/components/CreateCategoryForm";
import { useMutation } from "@apollo/client";
import { NewCategory, NewProduct } from "@/app/graphql";
import { useRouter } from "next/navigation";
import ProductsForm from "@/app/components/ProductForm";
import AdminOnly from "@/app/components/auth/AdminOnly";

export default function CreateProduct() {
  AdminOnly();
  
  const router = useRouter();
  const [createProduct] = useMutation(NewProduct)
  
  const onSubmit = async (values: any) => {
    console.log('values', values)

    const price = parseFloat(values?.price)
    console.log(price, 'price')
    
    const res = await createProduct({variables: {input: {
      ...values,
      price
    }}})

    console.log('res', res)

    if(res.errors){
      console.log(res.errors);
    }

    console.log('products', res.data)
    router.push('/products')

  }

  return (
    <ProductsForm onSubmit={onSubmit} />
  )
}
