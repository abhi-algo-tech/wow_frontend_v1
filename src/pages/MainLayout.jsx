import React, { useState } from "react";
import { Layout, Drawer } from "antd";
import { Outlet } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

import MainHeader from "./MainHeader";
import Logo from "../components/Logo";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import MainMenu from "./MainMenu";
import SideNavbarMobile from "./SideNavbarMobile";

const { Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768; // Define mobile breakpoint

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: collapsed ? "80px" : "91px", // Adjust width for collapsed state
            height: "100vh",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <MainMenu />
        </div>
      )}

      {/* Drawer for Mobile */}
      {isMobile && (
        <Drawer
          title={<Logo iscollapsed={false} />}
          placement="left"
          closable
          onClose={closeDrawer}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <SideNavbarMobile
            collapsed={false}
            setDrawerVisible={setDrawerVisible}
          />
        </Drawer>
      )}

      <Layout
        style={{
          marginLeft: !isMobile ? (collapsed ? "80px" : "91px") : 0, // Adjust margin based on sidebar width
        }}
      >
        {/* Header */}
        <MainHeader
          setCollapsed={setCollapsed}
          setDrawerVisible={setDrawerVisible}
          drawerVisible={drawerVisible}
          collapsed={collapsed}
          isMobile={isMobile}
        />

        {/* Content */}
        <Content
          style={{
            padding: "5px 24px",
            margin: 0,
            minHeight: "100vh",
            overflowY: "auto",
            background: "#fff",
          }}
        >
          <DynamicBreadcrumb />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
