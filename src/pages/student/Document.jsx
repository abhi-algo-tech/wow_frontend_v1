import React, { useState } from "react";
import { Table, Button, Input, Switch, Typography, Dropdown, Menu } from "antd";
import {
  FileImageOutlined,
  FileTextOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import DocumentForm from "./DocumentForm";
const { Text } = Typography;
const columns = [
  {
    title: "Document Name",
    dataIndex: "name",
    key: "name",
    align: "start",
    render: (text) => (
      <Input
        value={text}
        bordered={false}
        readOnly
        style={{ border: "1px solid #d9d9d9", borderRadius: "4px" }}
      />
    ),
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
    key: "expiry",
    align: "center",
  },
  {
    title: "Document",
    key: "document",
    align: "center",
    render: (record) => (
      <>
        {record.type === "image" ? (
          <FileImageOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        ) : (
          <FileTextOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        )}
      </>
    ),
  },
  {
    title: "",
    key: "action",
    render: (record) => (
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: "Edit",
              //   icon: <EditOutlined />,
              onClick: () => console.log("Edit record:", record),
            },
            {
              key: "delete",
              label: "Delete",
              //   icon: <DeleteOutlined />,
              onClick: () => console.log("Delete record:", record),
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

const data = [
  {
    key: "1",
    name: "Project_Proposal_ABC_Corp_2024",
    expiry: "Nov 09, 2024",
    type: "image",
  },
  {
    key: "2",
    name: "Annual_Report_2024_Financial_Performance",
    expiry: "Nov 09, 2024",
    type: "text",
  },
  {
    key: "3",
    name: "Machine_Learning_Paper_Results_2024",
    expiry: "Nov 09, 2024",
    type: "image",
  },
];

const Document = () => {
  const [isCreateDocumentModalOpen, setCreateDocumentModalOpen] = useState(false);
  return (
    <>
    <div className="documents-body">
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ gap: "12px" }}
      >
        <div className="align-content-center">
          <Switch className="mr10" />
          <Text>Exempt student from all immunizations</Text>
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
        dataSource={data}
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
            classroomId={null}
            closeModal={() => setCreateDocumentModalOpen(false)}
          />
        
        </CommonModalComponent>
      )}
      </>
  );
};

export default Document;
