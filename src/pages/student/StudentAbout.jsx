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
  <Col span={5}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={19}>{children}</Col>;

const StudentAbout = () => {
  return (
    <div className="padding30">
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
        {/* <MdOutlineModeEditOutline
          style={{
            width: 24,
            height: 24,
            cursor: "pointer",
            color: "#5978F7",
          }}
          onClick={() => console.log("Edit button clicked")} // Replace with your handler
        /> */}
      </div>
      <Row gutter={[0, 10]}>
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

        <LabelCol>Classroom</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">1-Blue-D</Text>
        </ContentCol>

        <LabelCol>Tags</LabelCol>
        <ContentCol>
          <Tag color="purple">5 Days</Tag>
          <Tag color="blue">Full Day</Tag>
          <Tag color="green">Photo Permission</Tag>
        </ContentCol>

        <LabelCol>Birthdate</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            Oct 14, 2020 (3 years 10 months)
          </Text>
        </ContentCol>

        <LabelCol>Notes</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            Full days from May 1st 2023
          </Text>
        </ContentCol>

        <LabelCol>Child Custody</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            Child custody not selected
          </Text>
        </ContentCol>

        <LabelCol>State Subsidy</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            No State Subsidy
          </Text>
        </ContentCol>

        <LabelCol>Address</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            50 Barrington Avenue Unit 503, Nashua, New Hampshire, United States,
            03062
          </Text>
        </ContentCol>

        <LabelCol>Sibling</LabelCol>
        <ContentCol>
          <Avatar
            src="/placeholder.svg?height=24&width=24"
            size={24}
            style={{ marginRight: 8 }}
          />
          <Text className="student-about-tab-label-value">
            Alsia Fenwick (Sister)
          </Text>
        </ContentCol>

        <LabelCol>Schedule</LabelCol>
        <ContentCol>
          <Row gutter={[8, 8]}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <Col key={day}>
                  <Tag
                    color="purple"
                    bordered={false}
                    className="d-flex flex-column align-items-center p-1 px-2 m-0"
                  >
                    <div className="student-about-tab-schedule-value">
                      {day}
                    </div>
                  </Tag>
                  {day !== "Monday" && (
                    <Tag className="w-100 text-center bg-white">
                      <div style={{ fontSize: "10px" }}>07:00AM - 05:30PM</div>
                    </Tag>
                  )}
                </Col>
              )
            )}
            <MdOutlineModeEdit
              style={{
                width: 15,
                height: 15,
                cursor: "pointer",
              }}
            />
          </Row>
        </ContentCol>
      </Row>
    </div>
  );
};

export default StudentAbout;
