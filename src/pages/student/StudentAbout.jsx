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
  CloseCircleOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { MdOutlineModeEdit, MdOutlineModeEditOutline } from "react-icons/md";
import StudentProfileForm from "./StudentProfileForm";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useStudentById } from "../../hooks/useStudent";
import { getInitialsTitleWithColor } from "../../services/common";
import { formatDate } from "../../utils/commonFormatDate";

const { Text } = Typography;
const { TabPane } = Tabs;

const LabelCol = ({ children }) => (
  <Col span={5}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={19}>{children}</Col>;
const status = "present";
const StudentAbout = ({ studentId }) => {
  const [isCreateStudentAboutModalOpen, setCreateStudentAboutModalOpen] =
    useState(false);
  const { data: studentData, isLoading, error } = useStudentById(studentId);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching student data</Text>;

  const student = studentData?.data || {};
  const date = { month: "Jan", day: 14 };
  const fromClassroom = "1-Blue-D";
  const toClassroom = "2-Green-D";

  const getRandomColor = () => {
    const colors = [
      "purple",
      "blue",
      "green",
      "red",
      "orange",
      "yellow",
      "cyan",
      "volcano",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
            <Text className="student-about-tab-label-value">
              {" "}
              <Text className="student-about-tab-label-value">
                {student?.firstName
                  ? student.firstName.charAt(0).toUpperCase() +
                    student.firstName.slice(1)
                  : ""}{" "}
                {student?.lastName
                  ? student.lastName.charAt(0).toUpperCase() +
                    student.lastName.slice(1)
                  : ""}
              </Text>
            </Text>
          </ContentCol>

          <LabelCol>Status</LabelCol>
          <ContentCol>
            <Tag
              color={
                student?.status?.toLowerCase() === "active"
                  ? "success"
                  : student?.status?.toLowerCase() === "upcoming"
                  ? "yellow"
                  : "error"
              }
              style={{ padding: "0 8px" }}
            >
              {student?.status?.toLowerCase() === "active" ? (
                <>
                  Active <CheckCircleOutlined />
                </>
              ) : student?.status?.toLowerCase() === "inactive" ? (
                <>
                  Inactive <CloseCircleOutlined />
                </>
              ) : student?.status?.toLowerCase() === "upcoming" ? (
                <>
                  UpComing <CheckCircleOutlined />
                </>
              ) : (
                // For null or undefined status, show "Inactive" with red color and cross icon
                <>
                  Inactive <CloseCircleOutlined />
                </>
              )}
            </Tag>
          </ContentCol>

          <LabelCol>Classroom</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {student?.classroomName}
            </Text>
          </ContentCol>

          <LabelCol>Tags</LabelCol>
          <ContentCol>
            {student?.tags?.map((tag, index) => (
              <Tag key={index} color={getRandomColor()}>
                {tag.tagName}
              </Tag>
            ))}
          </ContentCol>

          <LabelCol>Birthdate</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {student?.dateOfBirth && formatDate(student.dateOfBirth)}
            </Text>
          </ContentCol>

          <LabelCol>Notes</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {student?.note}
            </Text>
          </ContentCol>

          <LabelCol>Child Custody</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {student?.childCustody}
            </Text>
          </ContentCol>

          <LabelCol>State Subsidy</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {student?.isStateSubsidy ? "Yes" : "No"}
            </Text>
          </ContentCol>

          <LabelCol>Address</LabelCol>
          <ContentCol>
            {student?.addressLine && (
              <Text className="student-about-tab-label-value">
                {`${student.addressLine}, ${student?.city?.name || ""}, ${
                  student?.state?.name || ""
                }, ${student?.country?.name || ""}, ${student?.zipCode || ""}`
                  .replace(/,\s*(,|$)/g, ",")
                  .replace(/,\s*$/, "")}
              </Text>
            )}
          </ContentCol>

          <LabelCol>Sibling</LabelCol>

          <ContentCol>
            {student?.siblings?.map((sibling, index) => (
              <div key={index} className="position-relative d-inline-block mr8">
                <div className="position-relative d-inline-block">
                  <Avatar
                    size={24}
                    src={sibling?.siblingProfileUrl}
                    style={{
                      backgroundColor: sibling?.siblingProfileUrl
                        ? undefined
                        : getInitialsTitleWithColor(
                            `${sibling?.siblingFirstName} ${sibling?.siblingLastName}`
                          ).backgroundColor,
                      color: "#fff",
                    }}
                  >
                    {!sibling?.siblingProfileUrl &&
                      getInitialsTitleWithColor(
                        `${sibling?.siblingFirstName} ${sibling?.siblingLastName}`
                      ).initials}
                  </Avatar>
                  {sibling?.siblingStatus?.toLowerCase() === "active" && (
                    <div
                      className="position-absolute top-0 end-0 translate-middle rounded-circle active-green"
                      style={{
                        width: "5px",
                        height: "5px",
                        margin: "5px -8px",
                        padding: "3px",
                        border: "solid 3px #fff",
                      }}
                    />
                  )}
                </div>
                {"  "}
                <Text className="student-about-tab-label-value">
                  {sibling?.siblingFirstName
                    ? sibling.siblingFirstName.charAt(0).toUpperCase() +
                      sibling.siblingFirstName.slice(1)
                    : ""}{" "}
                  {sibling?.siblingLastName
                    ? sibling.siblingLastName.charAt(0).toUpperCase() +
                      sibling.siblingLastName.slice(1)
                    : ""}{" "}
                  <span>
                    (
                    {sibling?.siblingGender?.toLowerCase() === "female"
                      ? "Sister"
                      : "Brother"}
                    )
                  </span>
                </Text>
              </div>
            ))}
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
              {/* <MdOutlineModeEdit
                style={{
                  width: 15,
                  height: 15,
                  cursor: "pointer",
                }}
              /> */}
            </Row>
            <Row justify="end">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  zIndex: 10,
                }}
                className="pointer"
                onClick={() => setAboutScheduleModalOpen(true)}
              >
                <Avatar size={20} src="/wow_icons/png/edit-grey.png" />
              </div>
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
            studentId={studentId}
            studentData={student}
            closeModal={() => setCreateStudentAboutModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StudentAbout;
