import React, { useState } from "react";
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
  Space,
} from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { MdOutlineModeEdit, MdOutlineModeEditOutline } from "react-icons/md";
import StudentProfileForm from "./StudentProfileForm";
import CommonModalComponent from "../../components/CommonModalComponent";

const { Text } = Typography;
const { TabPane } = Tabs;

const LabelCol = ({ children }) => (
  <Col span={5}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={19}>{children}</Col>;
const status = "present";
const StudentAbout = () => {
  const [isCreateStudentAboutModalOpen, setCreateStudentAboutModalOpen] =
    useState(false);
  const date = { month: "Jan", day: 14 };
  const fromClassroom = "1-Blue-D";
  const toClassroom = "2-Green-D";
  return (
    <>
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
            <Avatar
              shape="square"
              icon={<MdOutlineModeEditOutline />}
              onClick={() => setCreateStudentAboutModalOpen(true)}
            />
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
        <Row gutter={[0, 14]}>
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
              50 Barrington Avenue Unit 503, Nashua, New Hampshire, United
              States, 03062
            </Text>
          </ContentCol>

          <LabelCol>Sibling</LabelCol>
          <ContentCol>
            <div className="position-relative d-inline-block mr8">
              <Avatar src={"/classroom_icons/png/Lisa.png"} size={24} />
              <div
                className={`position-absolute top-0 end-0 translate-middle rounded-circle ${
                  status === "present" ? "active-green" : ""
                }`}
                style={
                  status === "present"
                    ? {
                        width: "5px",
                        height: "3px",
                        margin: "5px -8px",
                        padding: "3px",
                        border: "solid 3px #fff",
                      }
                    : {}
                }
              />
            </div>
            {/* <Avatar
            src="/placeholder.svg?height=24&width=24"
            size={24}
            style={{ marginRight: 8 }}
          /> */}
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
                        <div style={{ fontSize: "10px" }}>
                          07:00AM - 05:30PM
                        </div>
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

          <LabelCol>Upcoming Move</LabelCol>
          <ContentCol>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Date section */}
              <Space
                direction="vertical"
                size={0}
                style={{ lineHeight: "1.2" }}
              >
                <Text
                  type="secondary"
                  className="student-about-tab-label-value"
                  style={{ fontSize: "11px" }}
                >
                  {date.month}
                </Text>
                <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                  {date.day}
                </Text>
              </Space>

              {/* Vertical line accent */}
              <div
                style={{
                  width: "2px",
                  height: "24px",
                  backgroundColor: "#52c41a",
                  borderRadius: "1px",
                }}
              />

              {/* Transfer information */}
              <Space align="center" size={4}>
                <Text className="student-about-tab-label-value">
                  {fromClassroom}
                </Text>
                <RightOutlined style={{ fontSize: "12px", color: "#8c8c8c" }} />
                <Text className="student-about-tab-label-value">
                  {toClassroom}
                </Text>
              </Space>
            </div>
          </ContentCol>
        </Row>
      </div>
      {isCreateStudentAboutModalOpen && (
        <CommonModalComponent
          open={isCreateStudentAboutModalOpen}
          setOpen={setCreateStudentAboutModalOpen}
          modalWidthSize={776}
          modalHeightSize={547}
          isClosable={true}
        >
          <StudentProfileForm
            CardTitle={"Edit  Profile Details"}
            classroomId={null}
            closeModal={() => setCreateStudentAboutModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StudentAbout;
