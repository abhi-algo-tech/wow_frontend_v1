import React, { useEffect, useState } from "react";
import { Row, Col, Tag, Typography, Tabs, Avatar, Badge } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CommonModalComponent from "../../components/CommonModalComponent";
import StaffProfileForm from "./StaffProfileForm";
import TimePickerComponent from "../../components/timePicker/TimePickerComponent";
import StaffScheduleForm from "./StaffSchedulingForm";
import { useStaffById } from "../../hooks/useStaff";
import { formatDate } from "../../utils/commonFormatDate";
import { formatTime } from "../../services/common";
const { Text } = Typography;

const LabelCol = ({ children }) => (
  <Col span={5}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={19}>{children}</Col>;

const StaffAbout = ({ staffId }) => {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isAboutScheduleModalOpen, setAboutScheduleModalOpen] = useState(false);
  const [staff, setStaff] = useState();
  const [room, setRoom] = useState();
  const { data: staffData, isLoading, error } = useStaffById(staffId);

  // Array of colors for tags
  const tagColors = [
    "purple",
    "cyan",
    "green",
    "blue",
    "magenta",
    "volcano",
    "orange",
    "gold",
    "lime",
  ];

  const defaultWeekdays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
  ];

  // Function to get a random color
  const getRandomColor = () =>
    tagColors[Math.floor(Math.random() * tagColors.length)];

  useEffect(() => {
    setStaff(staffData?.data || {});
    const primaryRoom = staffData?.data?.classrooms?.find(
      (classroom) => classroom.id === staffData?.data?.primaryRoomId
    );

    // Set the primary room, or null if not found
    setRoom(primaryRoom || null);
  }, [staffData]);

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
            <Text className="student-about-tab-label-value">
              {staff?.firstName
                ? staff.firstName.charAt(0).toUpperCase() +
                  staff.firstName.slice(1)
                : ""}{" "}
              {staff?.lastName
                ? staff.lastName.charAt(0).toUpperCase() +
                  staff.lastName.slice(1)
                : ""}
            </Text>
          </ContentCol>

          <LabelCol>Status</LabelCol>
          <ContentCol>
            {/* <Tag
              className="no-border-tag"
              color="success"
              style={{ padding: "0 8px" }}
            >
              Active <Avatar size={16} src={"/wow_icons/png/active.png"} />
            </Tag> */}
            <Tag
              color={
                staff?.status?.toLowerCase() === "active"
                  ? "success"
                  : staff?.status?.toLowerCase() === "upcoming"
                  ? "yellow"
                  : "error"
              }
              style={{ padding: "0 8px" }}
            >
              {staff?.status?.toLowerCase() === "active" ? (
                <>
                  Active <CheckCircleOutlined />
                </>
              ) : staff?.status?.toLowerCase() === "inactive" ? (
                <>
                  Inactive <CloseCircleOutlined />
                </>
              ) : staff?.status?.toLowerCase() === "upcoming" ? (
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

          <LabelCol>Designation</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {staff?.designation
                ? staff.designation.charAt(0).toUpperCase() +
                  staff.designation.slice(1)
                : ""}
            </Text>
          </ContentCol>

          <LabelCol>Allowed Classrooms</LabelCol>
          <ContentCol>
            {staff?.classrooms?.map((classroom) => (
              <Tag
                key={classroom.id}
                className="no-border-tag"
                color={getRandomColor()}
              >
                {classroom.name}
              </Tag>
            ))}
          </ContentCol>

          <LabelCol>Primary Classroom</LabelCol>
          <ContentCol>
            <Tag className="no-border-tag" color={getRandomColor()}>
              {room?.name}
            </Tag>
          </ContentCol>

          <LabelCol>Email</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {staff?.email}
            </Text>
          </ContentCol>

          <LabelCol>Clock In-Out PIN</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {staff?.clockInPin}
            </Text>
          </ContentCol>
          <LabelCol>Phone Number</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {staff?.phoneNumber}
            </Text>
          </ContentCol>

          <LabelCol>Address</LabelCol>
          <ContentCol>
            {staff?.street && (
              <Text className="student-about-tab-label-value">
                {`${staff.street}, ${staff?.city?.name || ""}, ${
                  staff?.state?.name || ""
                }, ${staff?.country?.name || ""}, ${staff?.zipCode || ""}`
                  .replace(/,\s*(,|$)/g, ",")
                  .replace(/,\s*$/, "")}
              </Text>
            )}
          </ContentCol>

          <LabelCol>Birth Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {staff?.dateOfBirth && formatDate(staff.dateOfBirth)}
            </Text>
          </ContentCol>
          <LabelCol>Job Tag</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">
              {staff?.jobTag?.name}
            </Text>
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
            <img className="size-20" src="/wow_icons/png/edit-grey.png" />
          </div>
          <Col span={5}>
            <div className="student-about-tab-label mb8">Availability</div>
            <div className="student-about-tab-label mb8">Work Time</div>
            <div className="student-about-tab-label">Break Time</div>
          </Col>
          <Col span={19}>
            <Row gutter={[10, 15]}>
              {defaultWeekdays.map((day, index) => (
                <Col style={{ width: 115 }} key={index}>
                  <Tag
                    color="purple"
                    bordered={false}
                    className="d-flex flex-column align-items-center p-1 px-2 m-0"
                  >
                    <div className="student-about-tab-schedule-value">
                      {day}
                    </div>
                  </Tag>
                  {staff?.weekSchedules?.map((schedule) => {
                    // Match schedule with the correct day
                    if (schedule?.dayOfWeek === day) {
                      // Check if startTime is not "00:00:00"
                      const startTimeDisplay =
                        schedule?.startTime !== "00:00:00"
                          ? formatTime(schedule?.startTime)
                          : "";
                      const endTimeDisplay =
                        schedule?.startTime !== "00:00:00"
                          ? formatTime(schedule?.endTime)
                          : "";
                      const breakStartTimeDisplay =
                        schedule?.startTime !== "00:00:00"
                          ? formatTime(schedule?.breakStartTime)
                          : "";
                      const breakEndTimeDisplay =
                        schedule?.startTime !== "00:00:00"
                          ? formatTime(schedule?.breakEndTime)
                          : "";

                      return (
                        <>
                          <Tag
                            className="w-100 text-center bg-white"
                            key={schedule?.id}
                          >
                            <div style={{ fontSize: "10px" }}>
                              {startTimeDisplay} - {endTimeDisplay}
                            </div>
                          </Tag>
                          <Tag className="w-100 text-center bg-white">
                            <div style={{ fontSize: "10px" }}>
                              {breakStartTimeDisplay} - {breakEndTimeDisplay}
                            </div>
                          </Tag>
                        </>
                      );
                    }
                    return null;
                  })}
                  {staff?.weekSchedules?.length === 0 && (
                    <>
                      <Tag className="w-100 text-center bg-white" key={index}>
                        <div style={{ fontSize: "10px" }}>-</div>
                      </Tag>
                      <Tag className="w-100 text-center bg-white">
                        <div style={{ fontSize: "10px" }}>-</div>
                      </Tag>
                    </>
                  )}
                </Col>
              ))}
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
            staffData={staff}
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
            data={staff?.weekSchedules}
            Id={staffId}
            module="staff"
            closeModal={() => setAboutScheduleModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StaffAbout;
