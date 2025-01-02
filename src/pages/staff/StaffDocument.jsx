import React, { useState } from "react";
import { Table, Typography, Dropdown, Avatar } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import StaffDocumentForm from "./StaffDocumentForm";
import CommonModalComponent from "../../components/CommonModalComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useDeleteStaffDocument } from "../../hooks/useDocument";
import DeletePopUp from "../../components/DeletePopUp";
import { saveAs } from "file-saver";
import { useStaffById } from "../../hooks/useStaff";
const { Text } = Typography;

const data = [
  {
    key: "1",
    name: "Jessica Rhodes - Offer Letter",
    expiry: "Nov 09, 2024",
    type: "image",
    documentType: "Registration Froms",
  },
  {
    key: "2",
    name: "Jessica Rhodes - CPR Certificate",
    expiry: "Nov 09, 2024",
    type: "pdf",
    documentType: "Birth Cirtificate",
  },
  {
    key: "3",
    name: "Jessica Rhodes - Resume",
    expiry: "Nov 09, 2024",
    type: "image",
    documentType: "Registration Froms",
  },
];

const StaffDocument = ({ staffData }) => {
  const deleteDocumentMutation = useDeleteStaffDocument();
  const [isCreateDocumentModalOpen, setCreateDocumentModalOpen] =
    useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStaffData, setEditSelectedStaffData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const {
    data: staff,
    isLoading,
    error,
    refetch,
  } = useStaffById(staffData?.id);

  const handleDownload = async (e, record) => {
    e.preventDefault();

    try {
      const response = await fetch(record.fileUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }

      // Convert the response to blob for dynamic download
      const blob = await response.blob();

      // Dynamically infer the correct file name and MIME type for saving
      const contentType = blob.type;
      let fileName = record.name || "downloaded-file";
      if (record.fileType === "application/pdf") {
        if (!fileName.endsWith(".pdf")) {
          fileName = `${fileName}.pdf`;
        }
      }

      // Use FileSaver to download the file
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const columns = [
    {
      title: "Document Name",
      dataIndex: "name",
      key: "name",
      align: "start",
      className: "label-14-600",
      render: (text) => <div className="label-14-500">{text}</div>,
    },
    {
      title: "Document Type",
      dataIndex: "docTypeName",
      key: "docTypeName",
      align: "start",
      className: "label-14-600",
      render: (text) => <div className="label-14-500">{text}</div>,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      align: "start",
      className: "label-14-600",
      render: (text) => <div className="label-14-500">{text}</div>,
    },
    {
      title: "Document",
      key: "document",
      align: "center",
      className: "label-14-600",
      render: (record) => (
        <div
          onClick={(e) => handleDownload(e, record)}
          style={{ cursor: "pointer" }}
        >
          {record.fileType === "image/jpeg" ||
          record.fileType === "image/png" ||
          record.fileType === "image/jpg" ? (
            <img
              src="/wow_icons/png/image.png"
              className="size-20"
              alt="Image"
            />
          ) : (
            <img src="/wow_icons/png/pdf.png" className="pdf" alt="PDF" />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                //   icon: <EditOutlined />,
                onClick: () => handleEditAction(record),
              },
              {
                key: "delete",
                label: "Delete",
                //   icon: <DeleteOutlined />,
                onClick: () =>
                  handleDeleteModal(record?.documentId, record?.name),
              },
            ],
          }}
          trigger={["click"]}
        >
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  const handleEditAction = (record) => {
    console.log("record", record);
    setEditModalOpen(true);
    setEditSelectedStaffData(record);
  };
  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("isDeleted", true);

    try {
      await deleteDocumentMutation.mutateAsync({
        staffId: staffData?.id,
        documentId: id,
      });
      refetch(); // Re-fetch the data after deletion
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete document", error);
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="documents-body">
      <div className="text-end mb16">
        <div>
          <ButtonComponent
            text="Add Document"
            buttonActionType="create"
            gradient={true}
            onClick={() => setCreateDocumentModalOpen(true)}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={staff?.data?.document
          ?.slice()
          .sort((a, b) => a.name.localeCompare(b.name))} // Sorting logic
        pagination={false}
        size="small"
      />
      {isCreateDocumentModalOpen && (
        <CommonModalComponent
          open={isCreateDocumentModalOpen}
          setOpen={setCreateDocumentModalOpen}
          modalWidthSize={418}
          modalHeightSize={520}
          isClosable={true}
        >
          <StaffDocumentForm
            CardTitle={"Add Document"}
            staffId={null}
            closeModal={() => setCreateDocumentModalOpen(false)}
            staffData={staffData}
          />
        </CommonModalComponent>
      )}
      {isEditModalOpen && (
        <CommonModalComponent
          open={isEditModalOpen}
          setOpen={setEditModalOpen}
          modalWidthSize={418}
          modalHeightSize={520}
          isClosable={true}
        >
          <StaffDocumentForm
            CardTitle={"Edit Document"}
            staffId={staffData?.id}
            closeModal={() => setEditModalOpen(false)}
            staffData={selectedStaffData}
          />
        </CommonModalComponent>
      )}
      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={232}
          isClosable={false}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            // CardTitle="Delete Student"

            handleDelete={handleDelete} // Pass the updated handleDelete function
            module="Document"
          />
        </CommonModalComponent>
      )}
    </div>
  );
};

export default StaffDocument;
