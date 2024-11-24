import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { Card, Col, Dropdown, Row, Tag, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import CommonModalComponent from "../../components/CommonModalComponent";
import PhysicalExaminationForm from "./PhysicalExaminationForm";
const { Text } = Typography;
function PhysicianExamination() {
  const [isCreatePhysicianExaminationModalOpen, setCreatePhysicianExaminationModalOpen] = useState(false);
  const handleMenuClick = ({ key }) => {
    if (key === "edit") {
      console.log("Edit action triggered");
      // Add your edit logic here
    } else if (key === "delete") {
      console.log("Delete action triggered");
      // Add your delete logic here
    }
  };

  const menu = {
    items: [
      {
        key: "due",
        label: <span className="student-table-action-label">Due</span>,
      },
      {
        key: "schedule",
        label: <span className="student-table-action-label">Schedule</span>,
      },
      {
        key: "completed",
        label: <span className="student-table-action-label">Completed</span>,
      },
      {
        key: "missing",
        label: <span className="student-table-action-label">Missing</span>,
      },
    ],
    onClick: handleMenuClick,
  };
  return (
    <>
    <div className="padding16">
      <div className=" text-end mb-4 ">
        <ButtonComponent text="Add Details" buttonActionType="create" onClick={() => setCreatePhysicianExaminationModalOpen(true)}/>
      </div>

      <Row gutter={[20, 0]}>
        <Col span={12}>
          <Card
            bordered={false}
            style={{ padding: 0 }}
            className="d-flex flex-column w-100"
          >
            <Row className="mb-2">
              <Col span={12}>
                <Tag color="green">Completed</Tag>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Dropdown menu={menu} trigger={["click"]}>
                  <EllipsisOutlined className="pointer" />
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text className="student-about-tab-label">Checkup Dates</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text className="student-about-tab-label-value">
                  Nov 09 ,2024
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bordered={false}
            style={{ padding: 0 }}
            className="d-flex flex-column w-100"
          >
            <Row className="mb-2">
              <Col span={12}>
                <Tag color="green">Due</Tag>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Dropdown menu={menu} trigger={["click"]}>
                  <EllipsisOutlined className="pointer" />
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text className="student-about-tab-label">Checkup Dates</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text className="student-about-tab-label-value">
                  Nov 09 ,2024
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
    {isCreatePhysicianExaminationModalOpen && (
        <CommonModalComponent
          open={isCreatePhysicianExaminationModalOpen}
          setOpen={setCreatePhysicianExaminationModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <PhysicalExaminationForm
            CardTitle={"Add Physical Examination Details"}
            classroomId={null}
            closeModal={() => setCreatePhysicianExaminationModalOpen(false)}
          />
        
        </CommonModalComponent>
      )}
    </>
  );
}

export default PhysicianExamination;
