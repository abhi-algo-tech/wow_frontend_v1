import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Dropdown,
  Empty,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import AddPickup from "./AddPickup";
import { useDeletePickup, useStudentById } from "../../hooks/useStudent";
import { CustomMessage } from "../../utils/CustomMessage";
import DeletePopUp from "../../components/DeletePopUp";
import { getInitialsTitleWithColor } from "../../services/common";

const { Text } = Typography;

function Pickup({ studentId }) {
  const {
    data: students,
    isLoading,
    isError,
    refetch,
    error,
  } = useStudentById(studentId);
  const deletePickupMutation = useDeletePickup();
  const [data, setData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreatePickupModalOpen, setCreatePickupModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleMenuClick = ({ key, pickup }) => {
    if (key === "edit") {
      // Placeholder for edit logic
      setSelectedRecord(pickup);
      setEditModalOpen(true); // Open the edit modal
    } else if (key === "delete") {
      setSelectedRecord({
        id: pickup.studentPickupId,
        name: `${pickup.firstName} ${pickup.lastName}`,
      });
      setDeleteModalOpen(true); // Open the delete modal
    }
  };
  const studentData = {
    studentId: data?.id,
    classroomId: data?.classroomId,
  };
  useEffect(() => {
    if (students) {
      setData(students?.data || []);
    }
    if (isError) {
      CustomMessage.error(
        "Failed to load student details. Please try again later."
      );
    }
  }, [students, isError, error]);
  const handleDelete = async (id) => {
    try {
      deletePickupMutation.mutate(
        { pickupId: id, studentId: studentId },
        {
          onSuccess: () => {
            refetch();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to delete pickup: ${error.message}`);
          },
        }
      );
    } catch (error) {
      CustomMessage.error(`Failed to delete classroom: ${error.message}`);
    } finally {
      setDeleteModalOpen(false); // Close the modal after operation (success or failure)
    }
  };
  return (
    <div className="padding16">
      <div className="text-end mb-4">
        <ButtonComponent
          text="Add Pickup"
          gradient={true}
          buttonActionType="create"
          onClick={() => setCreatePickupModalOpen(true)}
        />
      </div>
      {data?.studentPickup?.length > 0 ? (
        <Row gutter={16}>
          {data?.studentPickup?.map((pickup, index) => (
            <Col xs={24} md={12} key={index}>
              <Card
                bordered={false}
                className="mb16"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb10">
                  <Space>
                    <Avatar
                      size={52}
                      src={pickup?.photoUrl || undefined}
                      className="mb8"
                      style={{
                        backgroundColor: pickup?.photoUrl
                          ? undefined
                          : getInitialsTitleWithColor(
                              `${pickup?.firstName} ${pickup.lastName}`
                            ).backgroundColor,
                        color: "#fff",
                      }}
                    >
                      {!pickup?.photoUrl &&
                        getInitialsTitleWithColor(
                          `${pickup?.firstName} ${pickup.lastName}`
                        ).initials}
                    </Avatar>
                    {/* <Avatar src="/wow_images/Andrew-Fenwick.png" size={52} /> */}
                    <Text className="student-about-tab-label-value">
                      {`${pickup?.firstName} ${pickup?.lastName}`}
                    </Text>
                  </Space>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "edit",
                          label: (
                            <span className="student-table-action-label">
                              Edit
                            </span>
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
                      onClick: ({ key }) =>
                        handleMenuClick({ key, pickup: pickup }),
                    }}
                  >
                    <EllipsisOutlined className="pointer" />
                  </Dropdown>
                </div>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <Row>
                    <Col span={8}>
                      <Text className="student-about-tab-label">Relation</Text>
                    </Col>
                    <Col span={16} className="text-end">
                      <Text className="student-about-tab-label-value">
                        {pickup?.parentName || "N/A"}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Text className="student-about-tab-label">Email</Text>
                    </Col>
                    <Col span={16} className="text-end">
                      <Text className="student-about-tab-label-value">
                        {pickup?.email || "N/A"}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Text className="student-about-tab-label">
                        Phone Number
                      </Text>
                    </Col>
                    <Col span={16} className="text-end">
                      <Text className="student-about-tab-label-value">
                        {pickup?.phoneNumber || "N/A"}
                      </Text>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty />
      )}
      {isCreatePickupModalOpen && (
        <CommonModalComponent
          open={isCreatePickupModalOpen}
          setOpen={setCreatePickupModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <AddPickup
            cardTitle={"Add Pickup"}
            selectedStudentData={studentData}
            selectedGaurdianData={null}
            closeModal={() => setCreatePickupModalOpen(false)}
          />
        </CommonModalComponent>
      )}

      {isEditModalOpen && (
        <CommonModalComponent
          open={isEditModalOpen}
          setOpen={setEditModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <AddPickup
            cardTitle={"Edit Pickup"}
            selectedStudentData={studentData}
            selectedGaurdianData={selectedRecord}
            closeModal={() => setEditModalOpen(false)}
          />
        </CommonModalComponent>
      )}
      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={280}
          isClosable={false}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            // CardTitle="Delete Classroom"
            handleDelete={handleDelete} // Pass the updated handleDelete function
            module="Pickup Guardian"
          />
        </CommonModalComponent>
      )}
    </div>
  );
}

export default Pickup;
