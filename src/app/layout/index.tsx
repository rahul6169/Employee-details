import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../store/session";
import "./style.css";
const { Header, Sider, Content } = Layout;

const LayoutDesign: React.FC = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logout() as any);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout className="layout-alignment">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key={"menu.key"} style={{ paddingLeft: "35px" }}>
            <Link to={"/dashboard"}>
              <>
                <span>Dashboard</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key2"} style={{ paddingLeft: "35px" }}>
            <Link to={"/employee"}>
              <>
                <span>Employee</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key3"} style={{ paddingLeft: "35px" }}>
            <Link to={"/skill"}>
              <>
                <span>Skill</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key4"} style={{ paddingLeft: "35px" }}>
            <Link to={"/tag"}>
              <>
                <span>Tag</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu.key5"} style={{ paddingLeft: "35px" }}>
            <Link to={"/razorpay"}>
              <>
                <span>Razorpay</span>
              </>
            </Link>
          </Menu.Item>
          <Menu.Item
            key={"menu.key6"}
            style={{ paddingLeft: "35px" }}
            // onClick={handleSignOut}
          >
            <Link to={"/login"} onClick={handleSignOut}>
              <>
                <span>Logout</span>
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
