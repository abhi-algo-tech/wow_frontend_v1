import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import routesConfig from "../hooks/useRouteConfig";

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const name = location.state?.name; // Safely access name in state

  // Image separator to use as a React Node
  const separator = (
    <img
      src="/wow_icons/png/breadcrumb.png"
      alt="breadcrumb-icon"
      style={{ width: "16px", margin: "0 4px" }}
    />
  );

  return (
    <Breadcrumb separator={separator} className="mb-3">
      {/* Home Breadcrumb */}
      <Breadcrumb.Item className="label-11-500">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>

      {/* Dynamically Generated Breadcrumbs */}
      {pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        const routeName = routesConfig[url];

        // Render routeName and name with separator
        const breadcrumbContent = name ? (
          <>
            {routeName} {separator} {name}
          </>
        ) : (
          routeName
        );

        return routeName ? (
          <Breadcrumb.Item key={url} className="label-11-500">
            <Link to={url}>{breadcrumbContent}</Link>
          </Breadcrumb.Item>
        ) : null;
      })}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
