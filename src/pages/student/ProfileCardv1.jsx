import React from "react";
import { Card, Avatar, Typography, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";

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
      iconStyle: { width: 20, height: 24 },
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

const flagsConfig = ["Notes", "no-photo", "Dietary-Restrictions", "Allergies"];

const ProfileCardv1 = ({ role = "student" }) => {
  const tooltipItems = tooltipConfig[role.toLowerCase()] || [];
  const flags = flagsConfig;

  const profileDetails = {
    student: {
      imgSrc: "/wow_images/image@2x-1.png",
      title: "Lex Fenwick",
      classInfo: "1-Blue-D",
      nameClass: "mb10",
      classroomClass: "mb10",
    },
    staff: {
      imgSrc: "/wow_images/staff.png",
      title: "Jessica Rhodes",
      classInfo: "1-Blue-D",
      nameClass: "mb6",
      classroomClass: "mb20",
    },
  };

  const { imgSrc, title, classInfo, nameClass, classroomClass } =
    profileDetails[role.toLowerCase()] || {};

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
      bodyStyle={{ padding: "24px 0px 0px 0" }}
    >
      <Avatar size={100} src={imgSrc} className="mb8" />
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
      <Text className={`-profile-name ${nameClass}`}>{title}</Text>
      {role !== "student" && (
        <Text className={`-profile-role ${nameClass}`}>{role}</Text>
      )}
      <Text className={`-profile-class ${classroomClass}`}>{classInfo}</Text>

      {role === "student" && (
        <Space size="middle" className="d-flex justify-content-center mb18">
          {flags.map((flag, index) => (
            <Tooltip key={index} title={flag}>
              <img
                className="student-activity-type-icons"
                src={`/classroom_icons/png/${flag}.png`}
                alt={flag}
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
