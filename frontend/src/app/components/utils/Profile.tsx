"use client"
import * as React from 'react'
import { Avatar, Button, Dropdown, Menu, MenuProps, Select, Space } from 'antd'
import Link from 'next/link'
import { DownOutlined, UserAddOutlined } from '@ant-design/icons'
import LogoutUser from '../auth/LogoutUser'
import { useAppContext } from '@/app/lib/AppContext'
import ChangePassword from '../auth/ChangePassword'
import { project } from '@/app/utils/config'

const ProfileBadge: React.FC<any> = () => {
  const [userInfo, setUserInfo] = React.useState<any>('');


  // if(typeof window !== 'undefined'){
  //   userInfo = JSON.parse(localStorage.getItem("userInfo")!)
  // }

  React.useEffect(() => {
    setUserInfo(JSON.parse(localStorage?.getItem("userInfo")!));
  },[])

  const fullName = userInfo?.fullName

  const user = fullName?.substring(0,2) || 'UN'
  const color = project.theme.colorPrimary;
  

    // items
    const items: MenuProps['items'] = [
      {
        key: 1,
        label: <Link href={'/me'}>View Profile</Link>
      },
      {
        key: 2,
        label: <ChangePassword />,
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