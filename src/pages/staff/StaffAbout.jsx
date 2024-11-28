import React, { useState } from "react";
import { Row, Col, Tag, Typography, Tabs, Avatar, Badge } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import CommonModalComponent from "../../components/CommonModalComponent";
import StaffProfileForm from "./StaffProfileForm";
import TimePickerComponent from "../../components/timePicker/TimePickerComponent";
import StaffScheduleForm from "./StaffSchedulingForm";
const { Text } = Typography;

const LabelCol = ({ children }) => (
  <Col span={5}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={19}>{children}</Col>;

const StaffAbout = () => {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isAboutScheduleModalOpen, setAboutScheduleModalOpen] = useState(false);
  return (
    <>
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
            <Avatar
              shape="square"
              icon={<MdOutlineModeEditOutline />}
              onClick={() => setAboutModalOpen(true)}
            />
          </Badge>
        </div>
        <Row gutter={[0, 20]}>
          <LabelCol>Name</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Lex Fenwick</Text>
          </ContentCol>

          <LabelCol>Status</LabelCol>
          <ContentCol>
            <Tag
              className="no-border-tag"
              color="success"
              style={{ padding: "0 8px" }}
            >
              Active <Avatar size={16} src={"/wow_icons/png/active.png"} />
            </Tag>
          </ContentCol>

          <LabelCol>Designation</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Admin</Text>
          </ContentCol>

          <LabelCol>Allowed Classrooms</LabelCol>
          <ContentCol>
            <Tag className="no-border-tag" color="purple">
              Office
            </Tag>
            <Tag className="no-border-tag" color="cyan">
              Blue
            </Tag>
            <Tag className="no-border-tag" color="green">
              3-Orange-D
            </Tag>
            <Tag className="no-border-tag" color="purple">
              5-Purpule-D
            </Tag>
            <Tag className="no-border-tag" color="blue">
              6-Purpule-D
            </Tag>
          </ContentCol>

          <LabelCol>Primary Classroom</LabelCol>
          <ContentCol>
            <Tag className="no-border-tag" color="purple">
              Office
            </Tag>
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
              50 Barrington Avenue Unit 503, Nashua, New Hampshire, United
              States, 03062
            </Text>
          </ContentCol>

          <LabelCol>Birth Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Oct 14, 2020</Text>
          </ContentCol>
          <LabelCol>Job Tag</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Full Time</Text>
          </ContentCol>
        </Row>
        <Row className="mt22">
          <div
            style={{
              position: "absolute",
              right: 20,
              zIndex: 10,
            }}
            className="pointer"
            onClick={() => setAboutScheduleModalOpen(true)}
          >
            <Avatar size={20} src="/wow_icons/png/edit-grey.png" />
          </div>
          <Col span={5}>
            <div className="student-about-tab-label mb8">Availbility</div>
            <div className="student-about-tab-label mb8">Work Time</div>
            <div className="student-about-tab-label">Break Time</div>
          </Col>
          <Col span={19}>
            <Row gutter={[10, 15]}>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <Col style={{ width: 115 }} key={day}>
                    <Tag
                      color="purple"
                      bordered={false}
                      className="d-flex flex-column align-items-center p-1 px-2 m-0"
                    >
                      <div className="student-about-tab-schedule-value">
                        {day}
                      </div>
                    </Tag>
                    {day && (
                      <Tag className="w-100 text-center bg-white">
                        <div style={{ fontSize: "10px" }}>
                          07:00AM - 05:30PM
                        </div>
                      </Tag>
                    )}
                    {day && (
                      <Tag className="w-100 text-center bg-white">
                        <div style={{ fontSize: "10px" }}>
                          07:00AM - 05:30PM
                        </div>
                      </Tag>
                    )}
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </div>
      {isAboutModalOpen && (
        <CommonModalComponent
          open={isAboutModalOpen}
          setOpen={setAboutModalOpen}
          modalWidthSize={776}
          modalHeightSize={790}
          isClosable={true}
        >
          <StaffProfileForm
            CardTitle={"Edit  Profile Details"}
            classroomId={null}
            closeModal={() => setAboutModalOpen(false)}
          />
        </CommonModalComponent>
      )}
      {isAboutScheduleModalOpen && (
        <CommonModalComponent
          open={isAboutScheduleModalOpen}
          setOpen={setAboutScheduleModalOpen}
          modalWidthSize={937}
          modalHeightSize={649}
          isClosable={true}
        >
          <StaffScheduleForm
            CardTitle={"Edit Schedule"}
            classroomId={null}
            closeModal={() => setAboutScheduleModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StaffAbout;
