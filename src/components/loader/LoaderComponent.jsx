import React from "react";
import { Spin } from "antd";

const LoaderComponent = ({ isLoading, size = "default" }) => {
  console.log("isLoading", isLoading);

  if (!isLoading) return null; // Render nothing if not loading

  return (
    <div
      style={{
        position: "absolute", // Make sure the div takes full screen
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "auto", // Optional background
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center spinner both horizontally and vertically
      }}
    >
      <Spin tip="Loading..." size={size} />
    </div>
  );
};

export default LoaderComponent;
