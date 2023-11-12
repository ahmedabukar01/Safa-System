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
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import ProfileBadge from '../utils/Profile';

const { Header, Content, Footer, Sider } = Layout;

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
 getItem(<Link href={"/categories"}>Categories</Link>, '2', <DesktopOutlined />),
  getItem(<Link href={"/products"}>Products</Link>, 'sub1', <UserOutlined />, [
    getItem(<Link href={'/products'}>View Products</Link>, '3'),
    getItem(<Link href={'/products/create'}>Create Products</Link>, '4'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
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
        <div style={{display: "flex", justifyContent: "space-between"}}
        >
          <h1>header</h1>
          <ProfileBadge />
        </div>
      <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Safa System ©2023 Created by Normed Technology</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutTheme;