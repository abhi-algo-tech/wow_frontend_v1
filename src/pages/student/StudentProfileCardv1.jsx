import React from "react";
import { Card, Avatar, Typography, Space, Tooltip } from "antd";
import {
  CalendarOutlined,
  AppstoreAddOutlined,
  MessageOutlined,
  DollarOutlined,
  AlertOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const StudentProfileCardv1 = () => {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
      bodyStyle={{
        padding: "24px 0px 0px 0",
      }}
    >
      <Avatar
        size={100}
        src="https://via.placeholder.com/100"
        style={{ marginBottom: "8px" }}
      />
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "calc(50% - 45px)",
          backgroundColor: "#52c41a",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          border: "2px solid white",
        }}
      />
      <Text strong className="student-profile-name">
        Lex Fenwick
      </Text>
      <Text strong className="student-profile-class">
        1-Blue-D
      </Text>
      <Space size="middle" style={{ marginBottom: "18px" }}>
        <Tooltip title="Walnuts, pollen">
          <AlertOutlined style={{ color: "#faad14", fontSize: "20px" }} />
        </Tooltip>
        <Tooltip title="Notes">
          <FileTextOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
        </Tooltip>
        <Tooltip title="Medication">
          <MedicineBoxOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />
        </Tooltip>
        <Tooltip title="No Photo Permission">
          <StopOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />
        </Tooltip>
      </Space>
      <div
        style={{
          background: "linear-gradient(90deg, #5978F7 0%, #9C84FF 100%)", // Use a string for linear-gradient
          // backgroundColor: "#722ed1", // This will be overridden by `background`
          borderRadius: "0 0 16px 16px",
          padding: "12px 32px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Tooltip title="Attendance">
          <CalendarOutlined style={{ color: "white", fontSize: "24px" }} />
        </Tooltip>
        <Tooltip title="Activities">
          <AppstoreAddOutlined style={{ color: "white", fontSize: "24px" }} />
        </Tooltip>
        <Tooltip title="Communication">
          <MessageOutlined style={{ color: "white", fontSize: "24px" }} />
        </Tooltip>
        <Tooltip title="Billing">
          <DollarOutlined style={{ color: "white", fontSize: "24px" }} />
        </Tooltip>
      </div>
    </Card>
  );
};

export default StudentProfileCardv1;
