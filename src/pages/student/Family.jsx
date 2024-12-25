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
import ParentForm from "./ParentForm";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useDeleteGuardian, useStudentById } from "../../hooks/useStudent";
import DeletePopUp from "../../components/DeletePopUp";
import { CustomMessage } from "../../utils/CustomMessage";
import { getInitialsTitleWithColor } from "../../services/common";

const { Text } = Typography;

function Family({ studentId }) {
  const deleteGuardianMutation = useDeleteGuardian();
  const {
    data: students,
    isLoading,
    isError,
    refetch,
    error,
  } = useStudentById(studentId);
  const [isCreateParentModalOpen, setCreateParentModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedGaurdianData, setSelectedGaurdianData] = useState(null);
  const [selectedStudentData, setSelectedStudentData] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const studentData = {
    studentId: data?.id,
    classroomId: data?.classroomId,
  };
  const handleMenuClick = ({ key, guardian }) => {
    if (key === "edit") {
      setSelectedStudentData(studentData);
      setSelectedGaurdianData(guardian);
      setEditModalOpen(true); // Open the delete modal
    } else if (key === "delete") {
      setSelectedRecord({
        id: guardian.gurdianId,
        name: `${guardian.gurdianFirstName} ${guardian.gurdianLastName}`,
      });
      setDeleteModalOpen(true); // Open the delete modal
    }
  };
  // const handleDelete = async (id) => {
  //   try {
  //     deleteGuardianMutation.mutate({ guardianId: id, studentId: data?.id });
  //     CustomMessage.success(`sucessfully delete parent: ${id}`);
  //   } catch (error) {
  //     CustomMessage.error(`Failed to delete parent: ${error.message}`);
  //   } finally {
  //     setDeleteModalOpen(false); // Close the modal after operation (success or failure)
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      deleteGuardianMutation.mutate(
        { guardianId: id, studentId: studentId },
        {
          onSuccess: () => {
            // Refetch the student data
            // CustomMessage.success(`Successfully deleted parent: ${id}`);
            // Refetch the students data
            refetch();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to delete parent: ${error.message}`);
          },
        }
      );
    } catch (error) {
      CustomMessage.error(`Unexpected error: ${error.message}`);
    } finally {
      setDeleteModalOpen(false); // Close the modal after operation (success or failure)
    }
  };

  useEffect(() => {
    if (students) {
      console.log("students:", students);
      setData(students?.data || []);
    }
  }, [students]);

  return (
    <>
      <div className="padding16">
        <div className="text-end mb-4">
          <ButtonComponent
            text="Add Parent"
            gradient={true}
            buttonActionType="create"
            onClick={() => setCreateParentModalOpen(true)}
          />
        </div>
        <Row gutter={16}>
          {students?.data?.guardians?.map((guardian, index) => {
            // Dynamically create the menu for each guardian
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
                    <span className="student-table-action-label">Delete</span>
                  ),
                },
              ],
              onClick: ({ key }) =>
                handleMenuClick({ key, guardian: guardian }),
            };

            return (
              <Col xs={24} md={12} key={index} className="mb16">
                <Card
                  bordered={false}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  styles={{ body: { padding: 16 } }}
                >
                  <div className="d-flex justify-content-between align-items-center mb10">
                    <Space>
                      <Avatar
                        size={52}
                        src={guardian?.photoUrl || undefined}
                        className="mb8"
                        style={{
                          backgroundColor: guardian?.photoUrl
                            ? undefined
                            : getInitialsTitleWithColor(
                                `${guardian?.gurdianFirstName} ${guardian.gurdianLastName}`
                              ).backgroundColor,
                          color: "#fff",
                        }}
                      >
                        {!guardian?.photoUrl &&
                          getInitialsTitleWithColor(
                            `${guardian?.gurdianFirstName} ${guardian.gurdianLastName}`
                          ).initials}
                      </Avatar>

                      {/* <Avatar src={guardian.photoUrl} size={52} /> */}
                      <Text className="student-about-tab-label-value">
                        {guardian?.gurdianFirstName} {guardian.gurdianLastName}
                      </Text>
                    </Space>
                    <Dropdown menu={menu} trigger={["click"]}>
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
                        <Text className="student-about-tab-label">
                          Relation
                        </Text>
                      </Col>
                      <Col span={16} className="text-end">
                        <Text className="student-about-tab-label-value">
                          {guardian?.parentName}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Text className="student-about-tab-label">Email</Text>
                      </Col>
                      <Col span={16} className="text-end">
                        <Text className="student-about-tab-label-value">
                          {guardian?.email}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Text className="student-about-tab-label">
                          Sign-in Pin
                        </Text>
                      </Col>
                      <Col span={16} className="text-end">
                        <Text className="student-about-tab-label-value">
                          {guardian?.signInPin || "N/A"}
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
                          {guardian?.phoneNumber}
                        </Text>
                      </Col>
                    </Row>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      {isCreateParentModalOpen && (
        <CommonModalComponent
          open={isCreateParentModalOpen}
          setOpen={setCreateParentModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          <ParentForm
            cardTitle="Add Parent"
            selectedStudentData={studentData}
            selectedGaurdianData={null}
            closeModal={() => setCreateParentModalOpen(false)}
          />
        </CommonModalComponent>
      )}
      {isEditModalOpen && (
        <CommonModalComponent
          open={isEditModalOpen}
          setOpen={setEditModalOpen}
          modalWidthSize={498}
          isClosable={true}
        >
          <ParentForm
            cardTitle={"Edit Parent"}
            selectedStudentData={selectedStudentData}
            selectedGaurdianData={selectedGaurdianData}
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
            module="Parent"
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default Family;
