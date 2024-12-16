import { Card, Typography, Tabs, Col, Row } from "antd";
import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { MdOutlineMoving } from "react-icons/md";
import ClassroomOverviewTable from "./ClassroomOverviewTable";
import TableOverview from "./TableOverview";
import ProgressBarClassroomOverview from "./ProgressBarClassroomOverview";
import CommonModalComponent from "../../components/CommonModalComponent";
import CreateClassroom from "./CreateClassroom";
import DeletePopUp from "../../components/DeletePopUp";
import { useSchoolById } from "../../hooks/useSchool";
import { useSession } from "../../hooks/useSession";

const { Title, Text } = Typography;

export default function Classroom() {
  const { academyId } = useSession();
  const [activeTab, setActiveTab] = useState("1");
  const [isCreateClassroomModalOpen, setCreateClassroomModalOpen] =
    useState(false);
  const activeCount = 100;
  const upcomingCount = 4;
  const totalCount = activeCount + upcomingCount;
  const activePercent = (activeCount / totalCount) * 100;
  const upcomingPercent = (upcomingCount / totalCount) * 100;
  // Function to handle tab change
  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const {
    data: schools,
    isLoading,
    isError,
    error,
    refetch,
  } = useSchoolById(academyId);

  // Watch for changes in session storage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedAcademyId = sessionStorage.getItem("selectedAcademy");
      // setAcademyId(updatedAcademyId);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Refetch data when academyId changes
  useEffect(() => {
    if (academyId) {
      refetch();
    }
  }, [academyId, refetch]);

  const tabButtonItems = [
    {
      key: "1",
      label: (
        <span className="text-left classroom-headertab-text">Overview</span>
      ), // Align label text to the left
      children: (
        <>
          <div className="my-3">
            <div className="row g-4">
              {/* First Column with 3 Cards */}
              <div className="col-12 col-sm-7 col-md-8">
                <div className="row g-4">
                  <div className="col-12 col-sm-6 col-md-4 align-items-center">
                    <Card
                      bordered={false}
                      className=" classroom-overview-detail-custom-card"
                    >
                      <div className="row">
                        <div className="col-6">
                          <Text className="text-muted">Total Classrooms</Text>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                          <span className="m-0 classroom-overview-card-number">
                            {schools?.data?.totalClassrooms}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 align-items-center">
                    <Card
                      bordered={false}
                      className=" classroom-overview-detail-custom-card"
                    >
                      <div className="row">
                        <div className="col-6">
                          <Text className="text-muted">Total Capacity</Text>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                          <span className="m-0 classroom-overview-card-number">
                            {schools?.data?.totalCapacity}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 align-items-center">
                    <Card
                      bordered={false}
                      className=" classroom-overview-detail-custom-card"
                    >
                      <div className="row">
                        <div className="col-5">
                          <Text className="text-muted">
                            Full time Equivalent
                          </Text>
                        </div>
                        <div className="col-7 text-end">
                          <span className="m-0 classroom-overview-card-number">
                            83%
                          </span>
                          <br />
                          <MdOutlineMoving
                            style={{ color: "var(--color-green)" }}
                          />
                          <span className="classroom-overview-card-progress-text">
                            5% vs last month
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Second Column with Progress Bar Card */}
              <div className="col-12 col-sm-5 col-md-4 align-items-center">
                <Card className=" classroom-overview-detail-custom-card">
                  <Row className="align-items-center">
                    <Col span={10} className="align-items-center">
                      <Row>
                        <Col span={12}>
                          <span className="text-muted">Enrolled Students</span>
                        </Col>
                        <Col span={12}>
                          <span className="m-0 classroom-overview-card-number">
                            104
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={14}>
                      <ProgressBarClassroomOverview
                        activeStudents={100}
                        upcomingStudents={4}
                        totalStudents={120}
                        strokeLinecap="round"
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
            <div className="my-3">
              <ClassroomOverviewTable />
            </div>
            {/* <div className="mt-5 classroom-table">
              <TableOverview />
            </div> */}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-left classroom-headertab-text">
          Ratio Monitoring
        </span>
      ), // Align label text to the left
      children: "Content of Tab Pane 2",
    },
  ];

  const tabButtonRender = () => {
    if (Number(activeTab) === 1) {
      return (
        <ButtonComponent
          text="Create Classroom"
          gradient={true}
          buttonActionType="create"
          onClick={() => setCreateClassroomModalOpen(true)}
        />
      );
    }
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={tabButtonItems}
        className="custom-classroom-tab-style"
        tabPosition="top"
        onChange={onTabChange}
        tabBarExtraContent={tabButtonRender()}
        style={{ border: "none" }}
      />

      {isCreateClassroomModalOpen && (
        <CommonModalComponent
          open={isCreateClassroomModalOpen}
          setOpen={setCreateClassroomModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          <CreateClassroom
            CardTitle={"Create Classroom"}
            classroomId={null}
            closeModal={() => setCreateClassroomModalOpen(false)} // Passing the close function
          />
        </CommonModalComponent>
      )}
    </>
  );
}
