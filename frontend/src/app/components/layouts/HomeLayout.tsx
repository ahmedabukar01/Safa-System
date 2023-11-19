"use client"

import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import Link from 'next/link';
import ProfileBadge from '../utils/Profile';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href={'/'}>Home</Link>, '1', <PieChartOutlined />),
//  getItem(<Link href={"/categories"}>Categories</Link>, '2', <DesktopOutlined />),
  getItem(<Link href={"/categories"}>Categories</Link>, 'sub1', <UserOutlined />, [
    getItem(<Link href={'/categories'}>View Categories</Link>, '3'),
    getItem(<Link href={'/categories/create'}>Create Category</Link>, '4'),
  ]),
  getItem(<Link href={"/products"}>Products</Link>, 'sub2', <UserOutlined />, [
    getItem(<Link href={'/products'}>View Products</Link>, '5'),
    getItem(<Link href={'/products/create'}>Create Products</Link>, '6'),
  ]),
  getItem('Team', 'sub3', <TeamOutlined />, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const LayoutTheme: any = ({children}:any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <div style={{display: "flex", justifyContent: "space-between", padding: "10px 5px"}}
        >
          <Title level={2}>Safa</Title>
          <ProfileBadge />
        </div>
      <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0'}}>
          <div style={{ padding: 24, minHeight: "80vh", background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Safa System ©2023 Created by Normed Technology</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutTheme;