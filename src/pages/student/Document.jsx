import React, { useState } from "react";
import { Table, Switch, Dropdown, Avatar, Form } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import DocumentForm from "./DocumentForm";
import DeletePopUp from "../../components/DeletePopUp";
import { useDeleteDocument } from "../../hooks/useDocument";

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

const Document = ({ isstudentData }) => {
  const deleteDocumentMutation = useDeleteDocument();
  const [studentData, setStudentData] = useState(isstudentData);
  const [editSelectedStudentData, setEditSelectedStudentData] = useState({});
  const [isCreateDocumentModalOpen, setCreateDocumentModalOpen] =
    useState(false);
  const [isEditDocumentModalOpen, setEditDocumentModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  // console.log("studentData", studentData);
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
      align: "center",
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
      render: (record) => (
        <>
          {record.fileType === "image/png" ? (
            <Avatar src="/wow_icons/png/image.png" size={24} />
          ) : (
            <Avatar src="/wow_icons/png/pdf.png" size={24} />
          )}
        </>
      ),
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
      setDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
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
            StudentId={null}
            closeModal={() => setCreateDocumentModalOpen(false)}
            studentData={studentData}
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
            StudentId={studentData}
            closeModal={() => setEditDocumentModalOpen(false)}
            studentData={editSelectedStudentData}
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
