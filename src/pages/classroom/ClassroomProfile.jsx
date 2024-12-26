import { Avatar, Card, Col, Row, Typography, Dropdown, Space } from "antd";
import { IoChevronDownOutline } from "react-icons/io5";
import ProgressBarClassroomOverview from "./ProgressBarClassroomOverview";
import ClassroomOverviewTab from "./ClassroomOverviewTab";
import UpcomingEvents from "./UpcomingEvents";
import Events from "./Events";
import { getInitialsTitle } from "../../services/common";
import { useEffect, useState } from "react";
import CreateClassroom from "./CreateClassroom";
import CommonModalComponent from "../../components/CommonModalComponent";
import useNavigate from "../../hooks/useNavigate";
import {
  useClassroomById,
  useGetClassroomsBySchool,
} from "../../hooks/useClassroom";
import { useLocation } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

const { Title, Text } = Typography;
function ClassroomProfile() {
  const { academyId } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(academyId);
  // Extract `studentId` from state
  const classroomId = location.state?.classroomId;
  const classname = location.state?.name;
  const [selectedAcademy, setSelectedAcademy] = useState(classname);
  const [isEditClassroomModalOpen, setEditClassroomModalOpen] = useState(false);
  const [currentClassroomId, setCurrentClassroomId] = useState(classroomId);
  // const [currentClassroomData, setCurrentClassroomData] = useState(null);

  const { data: currentClassroomData } = useClassroomById(currentClassroomId);

  useEffect(() => {
    if (!classroomId) {
      navigate("/"); // Redirect to home or error page
    }
  }, [classroomId, navigate]);

  const handleMenuClick = (e) => {
    const { key } = e; // Extract the key from the event object
    let selected = null; // Variable to store the selected item

    // Loop through the items to find the matching key
    for (let i = 0; i < academyMenu.items.length; i++) {
      if (academyMenu.items[i].key == key) {
        selected = academyMenu.items[i];
        break; // Exit the loop once the match is found
      }
    }
    if (selected) {
      setSelectedAcademy(selected.label);
      setCurrentClassroomId(selected.key);
    }
  };

  // console.log("classroomData", classroomData);
  const academyMenu = {
    items: (classroomData?.data || []).map((classroom) => ({
      key: classroom?.id || "unknown", // Handle potential undefined id
      label: classroom?.name || "Unnamed", // Handle potential undefined name
    })),
    onClick: handleMenuClick,
  };

  useEffect(() => {
    if (currentClassroomData?.data?.id === Number(currentClassroomId)) {
      setSelectedAcademy(currentClassroomData?.data?.name);
    }
  }, [currentClassroomData?.data, currentClassroomId, academyMenu?.items]);

  const MAX_TEXT_LENGTH = 9; // Define the max length of the displayed text

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? `${text?.substring(0, maxLength)}...`
      : text;
  };

  const formatRange = (range) => {
    if (!range) return ""; // Handle undefined or null values

    // Split the range into start and end parts
    const [start, end] = range.split("-").map((value) => {
      const [years, months] = value.split(".").map(Number);
      return { years, months };
    });

    // Helper function to format individual parts
    const formatPart = ({ years, months }) => {
      if (years && months) {
        return `${years} years ${months} months`;
      } else if (years) {
        return `${years} year${years > 1 ? "s" : ""}`;
      } else if (months) {
        return `${months} month${months > 1 ? "s" : ""}`;
      } else {
        return "";
      }
    };

    // Format the start and end parts
    const startFormatted = formatPart(start);
    const endFormatted = formatPart(end);

    // Combine the formatted parts into a range
    return `${startFormatted} to ${endFormatted}`;
  };
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={6}>
          <Card className="border-0 shadow-sm classroom-profile-card">
            <div className="d-flex">
              <div className="position-relative">
                <Avatar
                  size={64}
                  style={{
                    backgroundColor: "#1890ff", // Set background color for initials
                    color: "#fff", // Set text color for initials
                    fontSize: "20px", // Adjust font size if needed
                  }}
                  {...(currentClassroomData?.data?.profileUrl
                    ? { src: currentClassroomData.data.profileUrl } // Set src only if profileUrl exists
                    : {})}
                >
                  {getInitialsTitle(selectedAcademy)}{" "}
                  {/* Show initials if no profileUrl */}
                </Avatar>
              </div>
              <div className="ms-2 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="profile-name-title">
                    {/* 1-Blue-D <IoChevronDownOutline /> */}
                    <div style={{ display: "flex", alignItems: "start" }}>
                      <Dropdown
                        menu={{ ...academyMenu, onChange: handleMenuClick }}
                        trigger={["click"]}
                        className="school-selection-drpd"
                      >
                        <a
                          onClick={(e) => e.preventDefault()}
                          style={{ color: "inherit" }}
                        >
                          <Space size={5}>
                            <span style={{ fontSize: "20px", fontWeight: 500 }}>
                              {truncateText(selectedAcademy, MAX_TEXT_LENGTH)}
                            </span>
                            <IoChevronDownOutline
                              style={{
                                color: "var(--text-color)",
                                opacity: "0.9",
                              }}
                            />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                  <div onClick={() => setEditClassroomModalOpen(true)}>
                    <img
                      src="/wow_icons/png/edit.png"
                      className="profile-edit-icon"
                    />
                  </div>
                </div>
                <div className="">
                  <Text className="font-12-details">
                    {/* 2 to 11 Months */}
                    {formatRange(currentClassroomData?.data?.ageRange)}
                  </Text>
                </div>
                <div className="d-flex justify-content-between align-items-start">
                  <Text className="font-12-details ">
                    Capacity: {currentClassroomData?.data?.maxCapacity}
                  </Text>
                  <Text className="font-12-details ">
                    Required: {currentClassroomData?.data?.staffRatio}:1
                  </Text>
                  <img
                    src="/wow_icons/png/thumb_up.png"
                    className="classroom-table-thumb size-17"
                    alt="Thumb Up"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered className="classroom-profile-card">
            <div className="row align-items-center ">
              {/* Left Section - Enrolled Students Label and Count */}
              <div className="col-12 col-sm-3">
                <div className="align-items-center pb-2">
                  <span className="classroom-profile-card-label">
                    Enrolled Students
                  </span>
                  <br />
                  <span className="classroom-profile-card-label-number">
                    12
                  </span>
                </div>
              </div>

              {/* Right Section - Progress Bar and Status Badges */}
              <div className="col-12 col-sm-9">
                <div className="mt-2">
                  <ProgressBarClassroomOverview
                    activeStudents={10}
                    upcomingStudents={2}
                    totalStudents={12}
                    strokeLinecap="round"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered className="classroom-profile-card">
            <div className="row align-items-center ">
              {/* Left Section - Enrolled Students Label and Count */}
              <div className="col-12 col-sm-3">
                <div className="align-items-center pb-2">
                  <span className="classroom-profile-card-label">
                    Expected Students
                  </span>
                  <br />
                  <span className="classroom-profile-card-label-number">
                    09
                  </span>
                </div>
              </div>

              {/* Right Section - Progress Bar and Status Badges */}
              <div className="col-12 col-sm-9">
                <div className="mt-2">
                  <ProgressBarClassroomOverview
                    title1="Present"
                    title2="Absent"
                    activeStudents={8}
                    upcomingStudents={1}
                    totalStudents={9}
                    strokeLinecap="round"
                    activeColor={"#abdb91"}
                    inActiveColor={"#F06F6FC9"}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered className="classroom-profile-card">
            <div className="row align-items-center ">
              {/* Left Section - Enrolled Students Label and Count */}
              <div className="col-12 col-sm-3">
                <div className="align-items-center pb-2">
                  <span className="classroom-profile-card-label">
                    Enrolled Staff
                  </span>
                  <br />
                  <span className="classroom-profile-card-label-number">
                    03
                  </span>
                </div>
              </div>

              {/* Right Section - Progress Bar and Status Badges */}
              <div className="col-12 col-sm-9">
                <div className="mt-2">
                  <ProgressBarClassroomOverview
                    title1="Present"
                    title2="Absent"
                    activeStudents={2}
                    upcomingStudents={1}
                    totalStudents={3}
                    strokeLinecap="round"
                    activeColor={"#abdb91"}
                    inActiveColor={"#F06F6FC9"}
                  />
                  {/* <Progress
                    percent={83.33}
                    showInfo={false}
                    strokeColor="#87CEEB"
                    trailColor="#f0f0f0"
                  /> */}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 0]} className="mt21">
        <Col span={17}>
          <ClassroomOverviewTab
            classroomId={currentClassroomId}
            classroomData={currentClassroomData}
          />
        </Col>
        <Col span={7}>
          <div className="mb13">
            <Events />
          </div>
          <div className="my-2">
            <UpcomingEvents CardTitle={"Upcoming Events"} />
          </div>
        </Col>
      </Row>

      {isEditClassroomModalOpen && (
        <CommonModalComponent
          open={isEditClassroomModalOpen}
          setOpen={setEditClassroomModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          <CreateClassroom
            CardTitle={"Edit Classroom"}
            classroomId={currentClassroomId}
            closeModal={() => setEditClassroomModalOpen(false)} // Passing the close function
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default ClassroomProfile;
