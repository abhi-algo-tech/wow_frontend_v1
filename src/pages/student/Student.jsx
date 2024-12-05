import { ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Progress, Row, Typography } from "antd";
import React, { useState } from "react";
import ProgressBarClassroomOverview from "../classroom/ProgressBarClassroomOverview";
import { MdOutlineMoving } from "react-icons/md";
import ButtonComponent from "../../components/ButtonComponent";
import StudentOverviewTable from "./StudentOverviewTable";
import CommonModalComponent from "../../components/CommonModalComponent";
import CreateStudent from "./CreateStudent";

const { Text } = Typography;
const Student = () => {
  const [isCreateStudentModalOpen, setCreateStudentModalOpen] = useState(false);
  return (
    <>
      <Row align="middle">
        <Col span={20}>
          <Row justify="space-start" gutter={20}>
            <Col>
              <Card
                style={{ width: 248 }}
                className="shadow-sm classroom-overview-detail-custom-card"
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#41414ecc",
                        fontSize: 13,
                      }}
                    >
                      Total <br />
                      Capacity
                    </div>
                  </Col>
                  <Col>
                    <div className=" classroom-overview-card-number">12</div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col>
              <Card
                style={{}}
                bordered={true}
                className="shadow-sm classroom-overview-detail-custom-card"
              >
                <Row className="align-items-center">
                  <Col span={10}>
                    <Row>
                      <Col span={12}>
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#41414ecc",
                            fontSize: 13,
                          }}
                        >
                          Enrolled Students
                        </span>
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
            </Col>

            <Col>
              <Card
                bordered={false}
                className="shadow-sm classroom-overview-detail-custom-card"
                style={{ width: 248 }}
              >
                <div className="row">
                  <div className="col-5">
                    <Text
                      style={{
                        fontWeight: 600,
                        color: "#41414ecc",
                        fontSize: 13,
                      }}
                    >
                      Full time Equivalent
                    </Text>
                  </div>
                  <div className="col-7 text-end">
                    <span className="m-0 classroom-overview-card-number">
                      83%
                    </span>
                    <br />
                    <MdOutlineMoving style={{ color: "var(--color-green)" }} />
                    <span className="classroom-overview-card-progress-text">
                      5% vs last month
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={4} className="text-end">
          <ButtonComponent
            text="Add Student"
            gradient={true}
            buttonActionType="create"
            onClick={() => setCreateStudentModalOpen(true)}
          />
        </Col>
      </Row>
      <StudentOverviewTable />

      {isCreateStudentModalOpen && (
        <CommonModalComponent
          open={isCreateStudentModalOpen}
          setOpen={setCreateStudentModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          <CreateStudent
            CardTitle={"Add Student"}
            classroomId={null}
            closeModal={() => setCreateStudentModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default Student;
