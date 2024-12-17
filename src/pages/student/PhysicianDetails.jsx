import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import TableComponent from "../../components/TableComponent";
import PhysicianForm from "./PhysicianForm";
import {
  useGetAllPhysiciansByStudent,
  useUpdatePhysician,
} from "../../hooks/usePhysician";
import DeletePopUp from "../../components/DeletePopUp";
import { CustomMessage } from "../../utils/CustomMessage";

function PhysicianDetails({ studentId }) {
  const [
    isCreatePhysicianDetailsModalOpen,
    setCreatePhysicianDetailsModalOpen,
  ] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const {
    data: physicians,
    isLoading,
    isError,
  } = useGetAllPhysiciansByStudent(studentId);
  const updatePhysicianMutation = useUpdatePhysician();

  // Map the data into the expected format
  const mappedData = physicians
    ? physicians?.data?.map((physician, index) => ({
        key: physician.id,
        name: `${physician.firstName} ${physician.lastName}`,
        email: physician.email,
        phone: physician.phoneNumber,
        address: physician.address,
      }))
    : [];

  // Handle Menu Click
  const handleMenuClick = ({ key, record }) => {
    if (key === "edit") {
      setEditModalOpen(true);
      setSelectedRecord(record);
    } else if (key === "delete") {
      setSelectedRecord(record);
      setDeleteModalOpen(true);
    }
  };

  const handleDelete = () => {
    console.log("Deleted:", selectedRecord);

    const payload = {
      isDeleted: true,
    };
    updatePhysicianMutation.mutate(
      {
        physicianId: selectedRecord.key,
        physicianData: payload,
      },
      {
        onSuccess: () => {
          CustomMessage.success("Physician deleted successfully!");
        },
        onError: (error) => {
          CustomMessage.error(`Failed to deleted Physician: ${error.message}`);
        },
      }
    );
    setDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "Physician Name",
      dataIndex: "name",
      key: "name",
      align: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "start",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      align: "start",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "start",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const menu = {
          items: [
            {
              key: "edit",
              label: <span className="student-table-action-label">Edit</span>,
            },
            {
              key: "delete",
              label: <span className="student-table-action-label">Delete</span>,
            },
          ],
          onClick: ({ key }) => handleMenuClick({ key, record }),
        };

        return (
          <Dropdown menu={menu} trigger={["click"]}>
            <EllipsisOutlined />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <div className="padding16">
        <div className="text-end mb-4">
          <ButtonComponent
            text="Add Physician"
            buttonActionType="create"
            onClick={() => setCreatePhysicianDetailsModalOpen(true)}
          />
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading physicians</div>
        ) : (
          <TableComponent columns={columns} dataSource={mappedData} />
        )}
      </div>
      {isCreatePhysicianDetailsModalOpen && (
        <CommonModalComponent
          open={isCreatePhysicianDetailsModalOpen}
          setOpen={setCreatePhysicianDetailsModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <PhysicianForm
            CardTitle={"Add Physician"}
            studentId={studentId}
            physicianId={null}
            closeModal={() => setCreatePhysicianDetailsModalOpen(false)}
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
          <PhysicianForm
            CardTitle={"Edit Physician"}
            physicianId={selectedRecord.key}
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
            setCancel={() => setDeleteModalOpen(false)}
            deleteData={selectedRecord}
            handleDelete={handleDelete}
            module="Physician"
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default PhysicianDetails;
