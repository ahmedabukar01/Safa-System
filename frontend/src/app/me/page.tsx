import React, { Suspense } from 'react'
import { getClient } from '../lib/client'
import { GetMe } from '../graphql'
import { useSuspenseQuery } from '@apollo/client';
import Loading from '../loading';

export default function Profile() {
  const {data} = useSuspenseQuery(GetMe);
  console.log(data);
  return (
    <>
    <h1>page</h1>
    </>
  )
}
