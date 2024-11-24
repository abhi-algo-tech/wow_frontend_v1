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
import { useGetAllClassrooms } from "../../hooks/useClassroom";

const { Title, Text } = Typography;
function ClassroomProfile() {
  const { activeId } = useNavigate();
  const [selectedAcademy, setSelectedAcademy] = useState("1-Blue-D");
  const [isEditClassroomModalOpen, setEditClassroomModalOpen] = useState(false);
  const [currentClassroomId, setCurrentClassroomId] = useState(activeId);

  useEffect(() => {
    setCurrentClassroomId(activeId);
  }, [activeId]);

  const handleMenuClick = (e) => {
    const selected = academyMenu.items.find((item) => item.key === e.key); // Find the selected item
    if (selected) {
      setSelectedAcademy(selected.label); // Update state with the selected label
      setCurrentClassroomId(selected.key);
    }
  };
  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetAllClassrooms();
  // console.log("classroomData", classroomData);
  const academyMenu = {
    items: [
      {
        key: "36",
        label: "1-Blue-D",
      },
      {
        key: "37",
        label: "2-Green-D",
      },
      {
        key: "38",
        label: "3-Purple-D",
      },
    ],
  };

  const MAX_TEXT_LENGTH = 11; // Define the max length of the displayed text

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
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
                >
                  {getInitialsTitle(selectedAcademy)}
                </Avatar>
              </div>
              <div className="ms-3 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="profile-name-title">
                    {/* 1-Blue-D <IoChevronDownOutline /> */}
                    <div style={{ display: "flex", alignItems: "start" }}>
                      <Dropdown
                        menu={{ ...academyMenu, onClick: handleMenuClick }}
                        trigger={["click"]}
                        className="school-selection-drpd"
                      >
                        <a
                          onClick={(e) => e.preventDefault()}
                          style={{ color: "inherit" }}
                        >
                          <Space size={5}>
                            <span style={{ fontSize: "16px", fontWeight: 500 }}>
                              {truncateText(selectedAcademy, MAX_TEXT_LENGTH)}
                            </span>
                            <IoChevronDownOutline />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                  <div onClick={() => setEditClassroomModalOpen(true)}>
                    <img
                      src="/wow_icons/png/edit/edit.png"
                      className="profile-edit-icon"
                    />
                  </div>
                </div>
                <div className="">
                  <Text className="font-12-details">2 to 11 Months</Text>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Text className="font-12-details">Capacity: 13</Text>
                  <Text className="font-12-details">
                    Required: 4:1{" "}
                    <Avatar
                      src="/classroom_icons/png/thumb_up.png"
                      className="classroom-table-thumb"
                    />
                  </Text>
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
                    activeColor={"#97F294C7"}
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
                    activeColor={"#97F294C7"}
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
          <ClassroomOverviewTab />
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
