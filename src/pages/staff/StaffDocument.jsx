import React, { useState } from "react";
import { Table, Typography, Dropdown, Avatar } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import StaffDocumentForm from "./StaffDocumentForm";
import CommonModalComponent from "../../components/CommonModalComponent";
import ButtonComponent from "../../components/ButtonComponent";
const { Text } = Typography;

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
    dataIndex: "documentType",
    key: "documentType",
    align: "start",
    className: "label-14-600",
    render: (text) => <div className="label-14-500">{text}</div>,
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
    key: "expiry",
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
      <>
        {record.type === "image" ? (
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

const StaffDocument = () => {
  const [isCreateDocumentModalOpen, setCreateDocumentModalOpen] = useState();
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
        dataSource={data}
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
            classroomId={null}
            closeModal={() => setCreateDocumentModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </div>
  );
};

export default StaffDocument;
