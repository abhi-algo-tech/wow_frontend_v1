import React from "react";
import { Alert, Flex, Spin } from "antd";
const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const LoaderComponent = ({ isLoading, size = "default" }) => {
  // if (!isLoading) return null; // Render nothing if not loading

  return (
    <Flex gap="middle" direction="vertical" align="center" justify="center">
      <Spin tip="Loading..." size={size} />
    </Flex>
  );
};

export default LoaderComponent;
