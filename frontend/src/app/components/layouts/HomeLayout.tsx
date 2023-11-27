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
import { useDispatch, useSelector } from 'react-redux';
import { project } from '@/app/utils/config';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null | undefined,
  roles?: []
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    roles,
  } as MenuItem;
}

const ALLOWED_ROLES = ["ADMIN", "SUPER_ADMIN"]

const items: MenuItem[] = [
  getItem(<Link href={'/'}>Home</Link>, '1', <PieChartOutlined />, null, ["ADMIN", "SUPER_ADMIN", "USER"]),
//  getItem(<Link href={"/categories"}>Categories</Link>, '2', <DesktopOutlined />),
  getItem(<Link href={"/categories"}>Categories</Link>, 'Category', <UserOutlined />, [
    getItem(<Link href={'/categories'}>View Categories</Link>, 'VC', null, null, ["ADMIN", "SUPER_ADMIN", "USER"]),
    getItem(<Link href={'/categories/create'} >Create Category</Link>, 'CC', null, null, ["ADMIN", "SUPER_ADMIN"]),
  ], ["ADMIN", "USER", "SUPER_ADMIN"]),
  getItem(<Link href={"/products"}>Products</Link>, 'Products', <UserOutlined />, [
    getItem(<Link href={'/products'}>View Products</Link>, 'VP', null, null, ["ADMIN", "SUPER_ADMIN", "USER"]),
    getItem(<Link href={'/products/create'}>Create Products</Link>, 'CP', [], null, ["ADMIN", "SUPER_ADMIN"]),
  ], ["ADMIN", "USER", "SUPER_ADMIN"]),
  getItem('Team', 'Teams', <TeamOutlined />, [getItem('Team 1', 'VT'), getItem('Team 2', '8')], ["ADMIN", "SUPER_ADMIN"]),
  getItem('Files', '9', <FileOutlined />),
];

const LayoutTheme: any = ({children}:any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const myToken = theme.useToken();
  // console.log('default antd colors', myToken)

  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.UserInfo.role);

  const perMittedMenu = items.filter((item) => {
    if(item?.roles?.includes(userRole)) {
      if(item?.children?.length > 0){
        let newItems = item.children.filter((child) => child?.roles?.includes(userRole))

        while (item?.children?.length > 0){ // need to clear the array before assign new filtered items
          item?.children?.pop(); 
        }

        item?.children?.push(...newItems) // assigning now the new permitted childrens
        return true
      }

      return true
    }
  })

  // console.log("permitted", perMittedMenu)


  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={perMittedMenu} 
        style={{
          // color: project.theme.colorPrimary,
          // background: project.theme.secondaryColor
          }}/>
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