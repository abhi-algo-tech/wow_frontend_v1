import React, { useEffect, useState } from "react";
import { Table, Switch, Dropdown, Avatar, Form } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import DocumentForm from "./DocumentForm";
import DeletePopUp from "../../components/DeletePopUp";
import { useDeleteDocument } from "../../hooks/useDocument";
import { useStudentById } from "../../hooks/useStudent";

// const data = [
//   {
//     key: "1",
//     name: "Project_Proposal_ABC_Corp_2024",
//     expiry: "Nov 09, 2024",
//     type: "image",
//   },
//   {
//     key: "2",
//     name: "Annual_Report_2024_Financial_Performance",
//     expiry: "Nov 09, 2024",
//     type: "text",
//   },
//   {
//     key: "3",
//     name: "Machine_Learning_Paper_Results_2024",
//     expiry: "Nov 09, 2024",
//     type: "image",
//   },
// ];

const Document = ({ studentId }) => {
  const deleteDocumentMutation = useDeleteDocument();
  const [editSelectedStudentData, setEditSelectedStudentData] = useState({});
  const [isCreateDocumentModalOpen, setCreateDocumentModalOpen] =
    useState(false);
  const [isEditDocumentModalOpen, setEditDocumentModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [studentData, setStudentData] = useState();

  const {
    data: student,
    isLoading,
    error,
    refetch,
  } = useStudentById(studentId);

  useEffect(() => {
    setStudentData(student?.data || {});
  }, [student]);

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
      align: "left",
      className: "label-14-600",
      render: (text) => <div className="label-14-500">{text}</div>,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      align: "center",
      className: "label-14-600",
      render: (text) => <div className="label-14-500">{text}</div>,
    },
    {
      title: "Document",
      key: "document",
      align: "center",
      className: "label-14-600",
      render: (record) => {
        const handleDownload = () => {
          const link = document.createElement("a");
          link.href = record.fileUrl; // URL of the file to be downloaded
          link.download = record.name; // File name for the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return (
          <div onClick={handleDownload} style={{ cursor: "pointer" }}>
            {record.fileType === "image/jpeg" ? (
              <Avatar src="/wow_icons/png/image.png" size={24} />
            ) : (
              <Avatar src="/wow_icons/png/pdf.png" size={24} />
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                onClick: () => handleEditAction(record),
              },
              {
                key: "delete",
                label: "Delete",
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
    // console.log("record", record);
    setEditDocumentModalOpen(true);
    setEditSelectedStudentData(record);
  };
  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("isDeleted", true);

    try {
      await deleteDocumentMutation.mutateAsync({
        studentId: studentData?.id,
        documentId: id,
      });
      await refetch(); // Re-fetch the data after deletion
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete document", error);
      setDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="documents-body">
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ gap: "12px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Form.Item
              name="expiredDocument"
              valuePropName="checked"
              className="mb-0 me-2 classroom-show-inactive-toggle-btn"
            >
              <Switch />
            </Form.Item>
            <span className="classroom-inactive-label">
              Show Expired Documents
            </span>
          </div>
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
          dataSource={studentData?.document}
          pagination={false}
          size="small"
        />
      </div>
      {isCreateDocumentModalOpen && (
        <CommonModalComponent
          open={isCreateDocumentModalOpen}
          setOpen={setCreateDocumentModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <DocumentForm
            CardTitle={"Add Document"}
            studentData={null}
            closeModal={() => setCreateDocumentModalOpen(false)}
            studentId={studentId}
          />
        </CommonModalComponent>
      )}
      {isEditDocumentModalOpen && (
        <CommonModalComponent
          open={isEditDocumentModalOpen}
          setOpen={setEditDocumentModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <DocumentForm
            CardTitle={"Edit Document"}
            studentData={editSelectedStudentData}
            closeModal={() => setEditDocumentModalOpen(false)}
            studentId={studentId}
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
    </>
  );
};

export default Document;
