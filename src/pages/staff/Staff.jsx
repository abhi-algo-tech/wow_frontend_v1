import { Card, Col, Row, Typography } from "antd";
import React, { useState } from "react";

import { MdOutlineMoving } from "react-icons/md";
import ButtonComponent from "../../components/ButtonComponent";
// import StudentOverviewTable from "./StudentOverviewTable";
import CommonModalComponent from "../../components/CommonModalComponent";
// import CreateStudent from "./CreateStudent";
import ProgressBarClassroomOverview from "../classroom/ProgressBarClassroomOverview";
import StaffOverviewTable from "./StaffOverviewTable";

const { Text } = Typography;
const Staff = () => {
  const [isCreateStudentModalOpen, setCreateStudentModalOpen] = useState(false);
  return (
    <>
      <Row align="middle">
        <Col>
          <Card
            style={{ width: 419 }}
            bordered={true}
            className="shadow-sm classroom-overview-detail-custom-card"
          >
            <Row className="d-flex align-items-center">
              <Col span={12}>
                <Row className="d-flex align-items-center">
                  <Col span={12}>
                    <span className="staff-overview-card-label">
                      Total Staff
                    </span>
                  </Col>
                  <Col span={12}>
                    <span className="m-0 staff-overview-card-number">104</span>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
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
      </Row>

      <StaffOverviewTable />

      {isCreateStudentModalOpen && (
        <CommonModalComponent
          open={isCreateStudentModalOpen}
          setOpen={setCreateStudentModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          {/* <CreateStudent
            CardTitle={"Add Student"}
            classroomId={null}
            closeModal={() => setCreateStudentModalOpen(false)}
          /> */}
        </CommonModalComponent>
      )}
    </>
  );
};

export default Staff;
