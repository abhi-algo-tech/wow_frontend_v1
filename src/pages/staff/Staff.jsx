import { Card, Col, Row, Typography } from "antd";
import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import ProgressBarClassroomOverview from "../classroom/ProgressBarClassroomOverview";
import StaffOverviewTable from "./StaffOverviewTable";
import CreateStaff from "./CreateStaff";

const Staff = () => {
  const [isCreateStaffModalOpen, setCreateStaffModalOpen] = useState(false);
  return (
    <>
      <Row align="bottom" className="d-flex justify-content-between">
        <Col>
          <Card
            style={{ width: 419 }}
            bordered={true}
            className="shadow-sm classroom-overview-detail-custom-card"
          >
            <Row className="d-flex align-items-center ">
              <Col span={12}>
                <Row className="d-flex align-items-center">
                  <Col span={12}>
                    <span className="staff-overview-card-label">
                      Total Staff
                    </span>
                  </Col>
                  <Col span={12}>
                    <span className="m-0 staff-overview-card-number">10</span>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <ProgressBarClassroomOverview
                  activeStudents={8}
                  upcomingStudents={2}
                  totalStudents={10}
                  strokeLinecap="round"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <div className="text-end">
            <ButtonComponent
              text="Add Staff"
              buttonActionType="create"
              gradient
              onClick={() => setCreateStaffModalOpen(true)}
            />
          </div>
        </Col>
      </Row>

      <StaffOverviewTable />

      {isCreateStaffModalOpen && (
        <CommonModalComponent
          open={isCreateStaffModalOpen}
          setOpen={setCreateStaffModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <CreateStaff
            CardTitle={"Add Staff"}
            closeModal={() => setCreateStaffModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default Staff;
