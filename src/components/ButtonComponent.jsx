import React from "react";
import { Button } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ButtonComponent = ({
  type = "primary",
  buttonActionType = "",
  size = "large",
  color = "#6366f1",
  hoverColor = "#4f46e5",
  text = "Button Text",
  onClick,
  gradient = true, // New prop for gradient background
  padding = "auto",
  margin = "auto",
  removeIcon = false,
  fontWeight = "bold",
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
  const border = { border: "none !important" };
  const combinedStyle = {
    ...buttonStyle,
    ...paddingStyle,
    ...marginStyle,
    // ...border,
  };

  return (
    <Button
      type={type}
      htmlType="submit"
      icon={getIcon()}
      size={size}
      className="rounded-xl shadow-sm"
      style={combinedStyle}
      onClick={onClick}
    >
      <span
        className={`${
          text.toLowerCase() === "cancel"
            ? "gradient-text common-button-component"
            : "text-white common-button-component"
        } ${fontWeight === "bold" ? "bold" : "light"}`}
      >
        {text}
      </span>
    </Button>
  );
};

export default ButtonComponent;
