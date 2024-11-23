// DynamicBreadcrumb.js
import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import routesConfig from "../hooks/useRouteConfig";
// import routesConfig from "./routesConfig";

const DynamicBreadcrumb = () => {
  const location = useLocation();

  // Split the current path into an array and map it to breadcrumb items
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb separator=">" className="mb-3">
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        const routeName = routesConfig[url];

        return routeName ? (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{routeName}</Link>
          </Breadcrumb.Item>
        ) : null;
      })}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
