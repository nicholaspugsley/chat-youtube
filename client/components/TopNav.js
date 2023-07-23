import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/auth/login");
  };

  return (
    <Menu
      //theme="dark"
      mode="horizontal"
      selectedKeys={[current]}
      className="mb-2 top-nav"
    >
      {/* home */}
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      {/* no user - show login and register */}
      {user === null && (
        <>
          <Item
            className="float-right"
            key="/auth/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/auth/register">
              <a>Register</a>
            </Link>
          </Item>

          <Item
            className="float-right"
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          </Item>
        </>
      )}

      {/* user - show user dash, admin dash, logout, profile */}
      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <ItemGroup>
            {user && user.role && user.role.includes("Admin") && (
              <Item key="/admin" onClick={(e) => setCurrent(e.key)}>
                <Link href="/admin">
                  <a>Admin Dash</a>
                </Link>
              </Item>
            )}
            <Item key="/user">
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>

            <Item key="/profile">
              <Link href="/user/profile">
                <a>Profile</a>
              </Link>
            </Item>

            <Item onClick={logout}>Logout</Item>
          </ItemGroup>
        </SubMenu>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/instructor">
            <a>Instructor</a>
          </Link>
        </Item>
      )}

      {user && user.role && user.role.includes("Admin") && (
        <Item
          key="/admin"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/admin">
            <a>Admin</a>
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;
