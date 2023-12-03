"use client"
import React, { Suspense } from 'react'
import { getClient } from '../lib/client'
import { GetMe } from '../graphql'
import { useSuspenseQuery } from '@apollo/client';
import Loading from '../loading';
import { Col, Descriptions, Row, Typography } from 'antd';
import { center } from '../css/styles';
import { formatDate } from '../components/utils/Dates';

const {Title} = Typography;

export default function Profile() {
  const {data} = useSuspenseQuery(GetMe);
  return (
    <>
    <div>
    <Title level={1} style={{...center}}>Your Info</Title>
    </div>
    <Descriptions>
      <Descriptions.Item label="FullName">{data?.me?.fullName}</Descriptions.Item> <br />
      <Descriptions.Item label="Email">{data?.me?.email}</Descriptions.Item> <br />
      <Descriptions.Item label="Role">{data?.me?.role}</Descriptions.Item> <br />
      <Descriptions.Item label="Joined">{formatDate(data?.me?.createdAt)}</Descriptions.Item>
    </Descriptions>
    </>
  )
}
