import { Avatar, Badge, Card, Col, Dropdown, Row, Tag, Typography } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { EllipsisOutlined } from "@ant-design/icons";
import StaffImportantDateForm from "./StaffImportantDateFrom";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useState } from "react";
import {
  useDeletePhysicalTracker,
  useGetAllPhysicalTrackersByStaff,
  useUpdatePhysicalTracker,
} from "../../hooks/usePhysicalTracker";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { formatDateToCustomStyle } from "../../services/common";
import { CustomMessage } from "../../utils/CustomMessage";
import PhysicalExaminationForm from "../student/PhysicalExaminationForm";
import DeletePopUp from "../../components/DeletePopUp";
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
  const deletePhysicalTrackerMutation = useDeletePhysicalTracker();
  const [
    isCreatePhysicianExaminationModalOpen,
    setCreatePhysicianExaminationModalOpen,
  ] = useState(false);
  const updatePhysicalTrackerMutation = useUpdatePhysicalTracker();
  const { data: status } = useMasterLookupsByType("physical_status");
  const [isCreateImportantDatesModalOpen, setCreateImportantDatesModalOpen] =
    useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTracker, setSelectedTracker] = useState(null);

  // const handleMenuClick = ({ key, trackerId }) => {
  //   const payload = {
  //     statusId: key,
  //   };
  //   updatePhysicalTrackerMutation.mutate(
  //     {
  //       trackerId: trackerId,
  //       trackerData: payload,
  //     },
  //     {
  //       onSuccess: () => {
  //         CustomMessage.success("Physical checkup updated successfully!");
  //       },
  //       onError: (error) => {
  //         CustomMessage.error(
  //           `Failed to update Physical checkup: ${error.message}`
  //         );
  //       },
  //     }
  //   );
  // };
  // const menu = (trackerId) => ({
  //   items:
  //     status?.data?.map((item) => ({
  //       key: item?.id,
  //       label: <span className="student-table-action-label">{item?.name}</span>,
  //       trackerId: trackerId, // Pass the trackerId to the menu's click handler
  //     })) || [],
  //   onClick: (e) => handleMenuClick({ key: e.key, trackerId }),
  // });

  const handleMenuClick = ({ key, tracker }) => {
    if (key === "edit") {
      setSelectedTracker(tracker);
      setEditModalOpen(true);
    } else if (key === "delete") {
      setSelectedTracker(tracker);
      setDeleteModalOpen(true);
    }
  };
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

  const handleDelete = async (id) => {
    try {
      deletePhysicalTrackerMutation.mutate({
        trackerId: id,
      });

      CustomMessage.success(`Successfully deleted Physical CheckUp: ${id}`);
      setDeleteModalOpen(false); // Close the modal after operation
    } catch (error) {
      CustomMessage.error(
        `Failed to delete Physical CheckUp: ${error.message}`
      );
    }
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

          <Col
            span={8}
            className="staff-important-dates-tab-label-key"
            style={{ position: "relative" }} // Added relative positioning to the Col for proper placement of absolute children
          >
            Physical checkup
            <Badge className="pointer about-floating-edit-div mx-2">
              <div
                style={{
                  position: "absolute",
                  top: -15,
                  zIndex: 10,
                }}
                className="pointer"
                onClick={() => setCreatePhysicianExaminationModalOpen(true)}
              >
                <img className="size-20" src="/wow_icons/png/edit-grey.png" />
              </div>
            </Badge>
          </Col>

          <Col span={16}>
            <Row gutter={[20, 0]}>
              {PhysicalTrackers?.data?.map((tracker) => {
                const menu = {
                  items: [
                    {
                      key: "edit",
                      label: (
                        <span className="student-table-action-label">Edit</span>
                      ),
                    },
                    {
                      key: "delete",
                      label: (
                        <span className="student-table-action-label">
                          Delete
                        </span>
                      ),
                    },
                  ],
                  onClick: ({ key }) => handleMenuClick({ key, tracker }),
                };

                return (
                  <Col span={12} key={tracker.id}>
                    <Card
                      bordered={false}
                      style={{ padding: 0 }}
                      className="d-flex flex-column w-100"
                    >
                      <Row className="mb-2">
                        <Col span={12}>
                          <Tag
                            color={statusColors[tracker?.statusName] || "gray"}
                          >
                            {tracker?.statusName}
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
                            {tracker?.physicalDate
                              ? formatDateToCustomStyle(tracker.physicalDate)
                              : "N/A"}
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
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
      {isCreatePhysicianExaminationModalOpen && (
        <CommonModalComponent
          open={isCreatePhysicianExaminationModalOpen}
          setOpen={setCreatePhysicianExaminationModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <PhysicalExaminationForm
            CardTitle={"Add Physical CheckUp Details"}
            studentId={staffData?.id}
            closeModal={() => setCreatePhysicianExaminationModalOpen(false)}
            module="staff"
          />
        </CommonModalComponent>
      )}
      {isEditModalOpen && selectedTracker && (
        <CommonModalComponent
          open={isEditModalOpen}
          setOpen={setEditModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <PhysicalExaminationForm
            CardTitle={"Edit Physical CheckUp Details"}
            studentId={staffData?.id}
            trackerData={selectedTracker}
            closeModal={() => setEditModalOpen(false)}
            module="staff"
          />
        </CommonModalComponent>
      )}

      {isDeleteModalOpen && selectedTracker && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={280}
          isClosable={false}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedTracker}
            handleDelete={() => handleDelete(selectedTracker.id)}
            module="Physical Examination"
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default StaffImportantDates;
