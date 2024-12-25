import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Space, Tooltip, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useStudentById } from "../../hooks/useStudent";
import { getInitialsTitleWithColor } from "../../services/common";
import { formatStudentDataForCard } from "../classroom/ClassroomCommon";
import { useStaffById } from "../../hooks/useStaff";

const { Text } = Typography;
const tooltipConfig = {
  student: [
    {
      title: "Attendance",
      link: "/staff-attendance/1",
      iconSrc: "/wow_icons/png/Attendance.png",
      isLink: true,
    },
    {
      title: "Activities",
      iconSrc: "/wow_icons/png/Activities.png",
    },
    {
      title: "Communication",
      iconSrc: "/wow_icons/png/message.png",
    },
    {
      title: "Billing",
      iconSrc: "/wow_icons/png/Billing.png",
      iconStyle: { width: 17, height: 24 },
    },
  ],
  staff: [
    {
      title: "Attendance",
      link: "/staff-attendance/1",
      iconSrc: "/wow_icons/png/Attendance.png",
      isLink: true,
    },
    {
      title: "Communication",
      iconSrc: "/wow_icons/png/message.png",
    },
    {
      title: "Schedule",
      iconSrc: "/sub_menu_icons/png/Staff%20Schedule.png",
    },
  ],
};

// const flagsConfig = ["Notes", "no-photo", "Dietary-Restrictions", "Allergies"];

const ProfileCardv1 = ({ Id, role }) => {
  const tooltipItems = tooltipConfig[role.toLowerCase()] || [];
  const [flagsConfig, setFlagsConfig] = useState([]);
  const [room, setRoom] = useState();

  const flags = flagsConfig;

  const { data: studentData, isLoading, error } = useStudentById(Id);
  const { data: staffData } = useStaffById(Id);

  useEffect(() => {
    if (studentData) {
      const formattedData = formatStudentDataForCard(studentData);
      // console.log("formattedData:", formattedData);
      setFlagsConfig(formattedData);
    }
  }, [studentData]);

  useEffect(() => {
    const primaryRoom = staffData?.data?.classrooms?.find(
      (classroom) => classroom.id === staffData?.data?.primaryRoomId
    );

    // Set the primary room, or null if not found
    setRoom(primaryRoom || null);
  }, [staffData]);

  const profileDetails = {
    student: {
      imgSrc: studentData?.data?.profileUrl,
      title: `${
        studentData?.data?.firstName
          ? studentData?.data?.firstName.charAt(0).toUpperCase() +
            studentData?.data?.firstName.slice(1)
          : ""
      } ${
        studentData?.data?.lastName
          ? studentData?.data?.lastName.charAt(0).toUpperCase() +
            studentData?.data?.lastName.slice(1)
          : ""
      }`.trim(),
      classInfo: studentData?.data?.classroomName,
      status: studentData?.data?.status?.toLowerCase(),
      nameClass: "mb10",
      classroomClass: "mb10",
    },
    staff: {
      imgSrc: staffData?.data?.profileUrl,
      title: `${
        staffData?.data?.firstName
          ? staffData?.data?.firstName.charAt(0).toUpperCase() +
            staffData?.data?.firstName.slice(1)
          : ""
      } ${
        staffData?.data?.lastName
          ? staffData?.data?.lastName.charAt(0).toUpperCase() +
            staffData?.data?.lastName.slice(1)
          : ""
      }`.trim(),
      classInfo: room?.name,
      status: staffData?.data?.status?.toLowerCase(),
      nameClass: "mb6",
      classroomClass: "mb20",
    },
  };

  const { imgSrc, title, classInfo, nameClass, classroomClass, status } =
    profileDetails[role.toLowerCase()] || {};
  // Handle file upload
  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      // Generate a URL for the uploaded file
      const fileUrl = URL.createObjectURL(info.file.originFileObj);
      setImage(fileUrl);
    }
  };
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
      styles={{ body: { padding: "24px 0px 0px 0" } }}
    >
      <div className="position-relative d-inline-block mr8 avatar-container">
        <Avatar
          size={100}
          src={imgSrc || undefined}
          className="mb8"
          style={{
            backgroundColor: imgSrc
              ? undefined
              : getInitialsTitleWithColor(title).backgroundColor,
            color: "#fff",
          }}
        >
          {!imgSrc && getInitialsTitleWithColor(title).initials}
        </Avatar>
        <div
          className={`position-absolute top-0 end-0 translate-middle rounded-circle ${
            status === "active" ? "active-green" : ""
          }`}
          style={
            status === "active"
              ? {
                  width: "20px",
                  height: "20px",
                  margin: "10px 0px",
                  backgroundColor: "#52c41a",
                  borderRadius: "50%",
                  border: "2px solid white",
                }
              : {}
          }
        />
        {/* Pencil icon with Upload */}
        <Upload
          showUploadList={false}
          accept="image/*"
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleFileChange}
        >
          <div className="edit-icon">
            <img src="/wow_icons/png/edit-white.png" className="size-40" />
          </div>
        </Upload>
      </div>

      <Text className={`-profile-name ${nameClass}`}>{title}</Text>
      {role !== "student" && (
        <Text className={`-profile-role ${nameClass}`}>
          {staffData?.data?.designation}
        </Text>
      )}
      <Text className={`-profile-class ${classroomClass}`}>{classInfo}</Text>

      {role === "student" && (
        <Space size="middle" className="d-flex justify-content-center mb18">
          {flags.map((flag, index) => (
            <Tooltip key={index} title={flag.flagValue}>
              <img
                className="student-activity-type-icons"
                src={`/classroom_icons/png/${flag.flag}.png`}
                alt={flag.flag}
                style={{ width: 20, height: 20 }}
              />
            </Tooltip>
          ))}
        </Space>
      )}

      <div
        style={{
          background: "linear-gradient(90deg, #5978F7 0%, #9C84FF 100%)",
          borderRadius: "0 0 16px 16px",
          padding: "12px 32px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {tooltipItems.map((item, index) => (
          <Tooltip key={index} title={item.title}>
            {item.title === "Attendance" ? (
              item.isLink ? (
                <Link to={item.link}>
                  <Avatar src={item.iconSrc} />
                </Link>
              ) : (
                <Avatar src={item.iconSrc} />
              )
            ) : (
              <img
                src={item.iconSrc}
                style={{ width: 24, height: 24, ...(item.iconStyle || {}) }}
                alt={item.title}
              />
            )}
          </Tooltip>
        ))}
      </div>
    </Card>
  );
};

export default ProfileCardv1;
