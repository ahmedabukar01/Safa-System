"use client"
import * as React from "react";
import CreateCategoryForm from "@/app/components/CreateCategoryForm";
import { useMutation } from "@apollo/client";
import { NewCategory, NewProduct } from "@/app/graphql";
import { useRouter } from "next/navigation";
import ProductsForm from "@/app/components/ProductForm";
import {AdminOnly} from "@/app/components/auth/AdminOnly";
import { GreenLight, RedLight } from "@/app/components/utils/alerts";

export default function CreateProduct() {
  AdminOnly();
  
  const router = useRouter();
  const [createProduct] = useMutation(NewProduct)
  
  const onSubmit = async (values: any, form: any) => {
    const price = parseFloat(values?.price)
    console.log(price, 'price')
    
    const res = await createProduct({variables: {input: {
      ...values,
      price
    }}, errorPolicy: "all"})

    if(res.errors){
      console.error(res.errors);
      return RedLight("Error", `${res?.errors[0]?.extensions?.exception?.message}`)
    } else {
      GreenLight("Success", "Producted Created Succefully");
      form?.resetFields();
      // router.push('/products')
    }

  }

  return (
    <ProductsForm onSubmit={onSubmit} />
  )
}
