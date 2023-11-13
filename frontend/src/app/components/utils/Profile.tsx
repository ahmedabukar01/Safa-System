"use client"

import * as React from 'react'
import { Avatar, Button, Dropdown, Menu, MenuProps, Select, Space } from 'antd'
import Link from 'next/link'
import { DownOutlined, UserAddOutlined } from '@ant-design/icons'
import LogoutUser from '../auth/LogoutUser'
import { useAppContext } from '@/app/lib/AppContext'

const ProfileBadge: React.FC<any> = () => {
  const userInfo: any = JSON.parse(localStorage.getItem("userInfo")!)

  const fullName = userInfo?.fullName
  const short = fullName?.substring(0,2)

    // as custom
    const color = 'red'
   const user = short || 'un';

    // items
    const items: MenuProps['items'] = [
      {
        key: 1,
        label: <Link href={'/me'}>View Profile</Link>
      },
      {
        key: 2,
        label: "Sittings",
      },
      {
        key: 3,
        label: <LogoutUser />
      },
    ]
  return (
      // <Avatar 
      // style={{ 
      //     backgroundColor: color, 
      //     verticalAlign: 'middle',
      //     cursor: "pointer"
      // }} 
      //     size="large"
      //     >
      // {user}
      // </Avatar>
      <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar 
        style={{ 
            backgroundColor: color, 
            verticalAlign: 'middle',
            cursor: "pointer"
        }} 
            size="large"
            >
        {user}
        </Avatar>
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
    )
}

export default ProfileBadge