import React, { useState } from "react";

import { Button, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FolderAddFilled,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import AdminEditDrawer from "../Pages/AdminEditDrawer";

const { Header, Sider, Content } = Layout;

export default function AdminTemplate(props) {
  let [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo text-violet text-xl p-2">ADMIN</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to={"/admin/users"}>Users</NavLink>
            </Menu.Item>
            <SubMenu key={"sub1"} icon={<VideoCameraOutlined />} title="Films">
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <NavLink to={"/admin/films"}>Flims List</NavLink>
              </Menu.Item>
              <Menu.Item key="20" icon={<VideoCameraAddOutlined />}>
                <NavLink to={"/admin/addfilm"}>Add Flims</NavLink>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3" icon={<UploadOutlined />}>
              Showtime
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <p
              className="text-violet text-2xl cursor-pointer m-4"
              onClick={toggle}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </p>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <AdminEditDrawer/>
            {props.component}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
