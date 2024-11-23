import React from "react";
import {
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Tabs,
  Avatar,
  Button,
  Badge,
} from "antd";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { MdOutlineModeEdit, MdOutlineModeEditOutline } from "react-icons/md";

const { Text } = Typography;
const { TabPane } = Tabs;

const LabelCol = ({ children }) => (
  <Col span={6}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={18}>{children}</Col>;

const StaffAbout = () => {
  return (
    <div className="padding30 staff-about-container">
      {/* Floating Edit Button */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 30,
          margin: "8px",
          zIndex: 10,
        }}
      >
        <Badge className="pointer about-floating-edit-div">
          <Avatar shape="square" icon={<MdOutlineModeEditOutline />} />
        </Badge>
      </div>
      <Row gutter={[0, 20]}>
        <LabelCol>Name</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">Lex Fenwick</Text>
        </ContentCol>

        <LabelCol>Status</LabelCol>
        <ContentCol>
          <Tag color="success" style={{ padding: "0 8px" }}>
            Active <CheckCircleOutlined />
          </Tag>
        </ContentCol>

        <LabelCol>Designation</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">Admin</Text>
        </ContentCol>

        <LabelCol>Allowed Classrooms</LabelCol>
        <ContentCol>
          <Tag color="purple">Offic</Tag>
          <Tag color="cyan">Blue</Tag>
          <Tag color="green">3-Orange-D</Tag>
          <Tag color="purple">5-Purpule-D</Tag>
          <Tag color="blue">6-Purpule-D</Tag>
        </ContentCol>

        <LabelCol>Primary Classroom</LabelCol>
        <ContentCol>
          <Tag color="purple">Office</Tag>
        </ContentCol>

        <LabelCol>Email</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            aparna12345@wiseowl.academy
          </Text>
        </ContentCol>

        <LabelCol>Clock In-Out PIN</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">988768</Text>
        </ContentCol>
        <LabelCol>Phone Number</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            (986) 102-988768
          </Text>
        </ContentCol>

        <LabelCol>Address</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            50 Barrington Avenue Unit 503, Nashua, New Hampshire, United States,
            03062
          </Text>
        </ContentCol>

        <LabelCol>Birth Date</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">Oct 14, 2020</Text>
        </ContentCol>
      </Row>
    </div>
  );
};

export default StaffAbout;
