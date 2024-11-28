import { Avatar, Badge, Card, Col, Dropdown, Row, Tag, Typography } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { EllipsisOutlined } from "@ant-design/icons";
import StaffImportantDateForm from "./StaffImportantDateFrom";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useState } from "react";
const { Text } = Typography;

const LabelCol = ({ children }) => (
  <Col span={9}>
    <Text className="staff-important-dates-tab-label-key">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={15}>{children}</Col>;

function StaffImportantDates() {
  const [isCreateImportantDatesModalOpen, setCreateImportantDatesModalOpen] =
    useState(false);
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
    // onClick: handleMenuClick,
  };
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
              onClick={() => setCreateImportantDatesModalOpen(true)}
            />
          </Badge>
        </div>
        <Row gutter={[0, 24]}>
          <LabelCol>Hire Date</LabelCol>
          <ContentCol>
            <Text className="staff-important-dates-tab-label-value">
              Dec 23, 2024
            </Text>
          </ContentCol>

          <LabelCol>
            CDA Examination Date{" "}
            <Avatar size={14} src={"/wow_icons/png/Info.png"} />
          </LabelCol>
          <ContentCol>
            <Text className="staff-important-dates-tab-label-value">
              No CDA Examination Date
            </Text>
          </ContentCol>

          <LabelCol>First Aid / CPR Expiration Date</LabelCol>
          <ContentCol>
            <Text className="staff-important-dates-tab-label-value">
              First Aid / CPR Expiration Date
            </Text>
          </ContentCol>

          <LabelCol>
            Background Record Check{" "}
            <Avatar size={14} src={"/wow_icons/png/Info.png"} />
            <br />
            Expiration Date
          </LabelCol>
          <ContentCol>
            <Text className="staff-important-dates-tab-label-value">
              Background Record Check Expiration Date
            </Text>
          </ContentCol>

          <Col span={8} className="staff-important-dates-tab-label-key">
            Physical checkup
          </Col>
          <Col span={16}>
            <Row gutter={[20, 0]}>
              <Col span={12}>
                <Card
                  bordered={false}
                  styles={{ body: { padding: 16 } }}
                  className="d-flex flex-column w-100"
                >
                  <Row className="mb-2">
                    <Col span={12}>
                      <Tag color="green" className="no-border-tag">
                        Completed
                      </Tag>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Dropdown menu={menu} trigger={["click"]}>
                        <EllipsisOutlined className="pointer" />
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text className="staff-important-dates-checkup-card-key">
                        Checkup Dates
                      </Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Text className="staff-important-dates-tab-label-value">
                        Nov 09 ,2024
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  bordered={false}
                  styles={{ body: { padding: 16 } }}
                  className="d-flex flex-column w-100"
                >
                  <Row className="mb-2">
                    <Col span={12}>
                      <Tag color="yellow" className="no-border-tag">
                        Due
                      </Tag>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Dropdown menu={menu} trigger={["click"]}>
                        <EllipsisOutlined className="pointer" />
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text className="staff-important-dates-checkup-card-key">
                        Checkup Dates
                      </Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Text className="staff-important-dates-tab-label-value">
                        Nov 09 ,2024
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {isCreateImportantDatesModalOpen && (
        <CommonModalComponent
          open={isCreateImportantDatesModalOpen}
          setOpen={setCreateImportantDatesModalOpen}
          modalWidthSize={418}
          modalHeightSize={340}
          isClosable={true}
        >
          <StaffImportantDateForm
            CardTitle={"Edit Important Dates"}
            classroomId={null}
            closeModal={() => setCreateImportantDatesModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default StaffImportantDates;
