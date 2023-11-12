import * as React from 'react'
import { Avatar, Dropdown, Menu, MenuProps, Select, Space } from 'antd'
import Link from 'next/link'
import { DownOutlined, UserAddOutlined } from '@ant-design/icons'

const ProfileBadge: React.FC<any> = ({user}) => {
    // as custom
    const color = 'red'
    user = 'Ah'

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
        label: "Log Out",
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