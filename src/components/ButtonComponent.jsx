import React, { useState } from "react";
import { Button, Spin } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const ButtonComponent = ({
  type = "primary",
  buttonActionType = "",
  size = "large",
  color = "#6366f1",
  hoverColor = "#4f46e5",
  text = "Button Text",
  onClick,
  gradient = true,
  padding = "auto",
  margin = "auto",
  removeIcon = false,
  fontWeight = "bold",
  borderRadius,
  isLoading = false,
  disabled,
}) => {
  // Set the icon based on the buttonActionType prop
  const getIcon = () => {
    switch (buttonActionType) {
      case "edit":
        return <EditOutlined style={{ color: "var(--color-white)" }} />;
      case "delete":
        return <DeleteOutlined style={{ color: "var(--color-white)" }} />;
      case "create":
        return <PlusOutlined style={{ color: "var(--color-white)" }} />;
      default:
        return null;
    }
  };

  // Conditional style for gradient background
  const buttonStyle = gradient
    ? { backgroundImage: " linear-gradient(to right, #5978f7, #9c84ff)" }
    : { backgroundColor: color };
  const paddingStyle = { padding: padding };
  const marginStyle = { margin: margin };
  const borderRadiusStyle = { borderRadius: borderRadius };
  const combinedStyle = {
    ...buttonStyle,
    ...paddingStyle,
    ...marginStyle,
    ...borderRadiusStyle,
  };

  // Handle button click
  const handleClick = async () => {
    if (isLoading || !onClick) return; // Prevent clicks while loading
    await onClick(); // Execute the passed click handler
  };

  return (
    <Button
      type={type}
      htmlType="submit"
      icon={getIcon()}
      size={size}
      className="rounded-xl shadow-sm"
      style={{
        ...combinedStyle,
        opacity: disabled ? 0.5 : 1,
        ...(text.toLowerCase() === "cancel" || text.toLowerCase() === "go back"
          ? {
              border: "solid 1px var(--color-primary)",
              backgroundColor: "var(--color-white)",
              color: "var(--color-primary)",
            }
          : {}),
      }}
      onClick={handleClick}
      disabled={disabled || isLoading} // Disable button while Loading
    >
      <span
        className={`${
          text.toLowerCase() === "cancel" || text.toLowerCase() === "go back"
            ? "gradient-text common-button-component"
            : "text-white common-button-component"
        } ${fontWeight === "bold" ? "bold" : "light"}`}
      >
        {text}
      </span>
      {isLoading && (
        <Spin
          size="small"
          indicator={<LoadingOutlined spin />}
          style={{
            color: "white",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
        />
      )}
    </Button>
  );
};

export default ButtonComponent;
