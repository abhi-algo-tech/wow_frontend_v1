import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import routesConfig from "../hooks/useRouteConfig";

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const name = location.state?.name; // Safely access name in state

  return (
    <Breadcrumb separator=">" className="mb-3">
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        const routeName = routesConfig[url];
        const breadcrumbName = name ? `${routeName} > ${name}` : routeName; // Conditionally set breadcrumb name

        return routeName ? (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbName}</Link>
          </Breadcrumb.Item>
        ) : null;
      })}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
