import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.css";
const { Header, Sider, Content } = Layout;

const LayoutDesign: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout-alignment">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key={"menu.key"} style={{ paddingLeft: "35px" }}>
            <Link to={"/dashboard"} className="icon-primary">
              <>
                <span className="color-primary side-nav-text">Dashboard</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key2"} style={{ paddingLeft: "35px" }}>
            <Link to={"/employee"} className="icon-primary">
              <>
                <span className="color-primary side-nav-text">Employee</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key3"} style={{ paddingLeft: "35px" }}>
            <Link to={"/skill"} className="icon-primary">
              <>
                <span className="color-primary side-nav-text">Skill</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key4"} style={{ paddingLeft: "35px" }}>
            <Link to={"/tag"} className="icon-primary">
              <>
                <span className="color-primary side-nav-text">Tag</span>
              </>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDesign;
