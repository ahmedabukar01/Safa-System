"use client"
import * as React from "react";
import CreateCategoryForm from "@/app/components/CreateCategoryForm";
import { useMutation } from "@apollo/client";
import { NewCategory } from "@/app/graphql";
import { useRouter } from "next/navigation";
export default function CreateCategory() {
  const router = useRouter();
  const [createCategory] = useMutation(NewCategory)
  
  const onSubmit = async (values: any) => {
    
    const res = await createCategory({variables: {input: {
      ...values
    }}})

    if(res.errors){
      console.log(res.errors);
    }

    router.push('/categories')

  }

  return (
    <CreateCategoryForm onSubmit={onSubmit} />
  )
}
