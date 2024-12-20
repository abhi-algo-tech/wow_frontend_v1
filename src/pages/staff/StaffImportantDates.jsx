import { Avatar, Badge, Card, Col, Dropdown, Row, Tag, Typography } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { EllipsisOutlined } from "@ant-design/icons";
import StaffImportantDateForm from "./StaffImportantDateFrom";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useState } from "react";
import {
  useGetAllPhysicalTrackersByStaff,
  useUpdatePhysicalTracker,
} from "../../hooks/usePhysicalTracker";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { formatDateToCustomStyle } from "../../services/common";
import { CustomMessage } from "../../utils/CustomMessage";
const { Text } = Typography;

const LabelCol = ({ children }) => (
  <Col span={9}>
    <Text className="staff-important-dates-tab-label-key">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={15}>{children}</Col>;

function StaffImportantDates({ staffData }) {
  const {
    data: PhysicalTrackers,
    isLoading,
    isError,
  } = useGetAllPhysicalTrackersByStaff(staffData?.id);
  console.log("PhysicalTrackers:", PhysicalTrackers, staffData?.id);
  const updatePhysicalTrackerMutation = useUpdatePhysicalTracker();
  const { data: status } = useMasterLookupsByType("physical_status");
  const [isCreateImportantDatesModalOpen, setCreateImportantDatesModalOpen] =
    useState(false);

  const handleMenuClick = ({ key, trackerId }) => {
    const payload = {
      statusId: key,
    };
    updatePhysicalTrackerMutation.mutate(
      {
        trackerId: trackerId,
        trackerData: payload,
      },
      {
        onSuccess: () => {
          CustomMessage.success("Physical checkup updated successfully!");
        },
        onError: (error) => {
          CustomMessage.error(
            `Failed to update Physical checkup: ${error.message}`
          );
        },
      }
    );
  };
  const menu = (trackerId) => ({
    items:
      status?.data?.map((item) => ({
        key: item?.id,
        label: <span className="student-table-action-label">{item?.name}</span>,
        trackerId: trackerId, // Pass the trackerId to the menu's click handler
      })) || [],
    onClick: (e) => handleMenuClick({ key: e.key, trackerId }),
  });

  const statusColors = {
    Completed: "green",
    Overdue: "red",
    Scheduled: "blue",
    Due: "orange",
  };
  // const menu = {
  //   items: [
  //     {
  //       key: "due",
  //       label: <span className="student-table-action-label">Due</span>,
  //     },
  //     {
  //       key: "schedule",
  //       label: <span className="student-table-action-label">Schedule</span>,
  //     },
  //     {
  //       key: "completed",
  //       label: <span className="student-table-action-label">Completed</span>,
  //     },
  //     {
  //       key: "missing",
  //       label: <span className="student-table-action-label">Missing</span>,
  //     },
  //   ],
  //   // onClick: handleMenuClick,
  // };
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
              {staffData?.hireDate || `No Hire Date`}
            </Text>
          </ContentCol>

          <LabelCol>
            CDA Examination Date{" "}
            <Avatar size={14} src={"/wow_icons/png/Info.png"} />
          </LabelCol>
          <ContentCol>
            <Text className="staff-important-dates-tab-label-value">
              {staffData?.cdaExpirationDate || `No CDA Examination Date`}
            </Text>
          </ContentCol>

          <LabelCol>First Aid / CPR Expiration Date</LabelCol>
          <ContentCol>
            <Text className="staff-important-dates-tab-label-value">
              {staffData?.aidExpirationDate ||
                `No First Aid / CPR Expiration Date`}
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
              {staffData?.bgExpirationDate ||
                `No Background Record Check Expiration Date`}
            </Text>
          </ContentCol>

          <Col span={8} className="staff-important-dates-tab-label-key">
            Physical checkup
          </Col>
          <Col span={16}>
            <Row gutter={[20, 0]}>
              {PhysicalTrackers?.data?.map((tracker) => (
                <Col span={12}>
                  <Card
                    bordered={false}
                    style={{ padding: 0 }}
                    className="d-flex flex-column w-100"
                  >
                    <Row className="mb-2">
                      <Col span={12}>
                        <Tag
                          color={statusColors[tracker?.statusName] || "gray"}
                          className="no-border-tag"
                        >
                          {tracker?.statusName}
                        </Tag>
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <Dropdown menu={menu(tracker?.id)} trigger={["click"]}>
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
                          {tracker?.physicalDate
                            ? formatDateToCustomStyle(tracker.physicalDate)
                            : "N/A"}
                        </Text>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
              {/* <Col span={12}>
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
              </Col> */}
              {/* <Col span={12}>
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
              </Col> */}
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
            staffId={staffData?.id}
            closeModal={() => setCreateImportantDatesModalOpen(false)}
            staffData={staffData}
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default StaffImportantDates;
