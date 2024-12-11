import React, { useState } from "react";
import { Table, Switch, Button, Tag, Space, Typography, Form } from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import ImmunizationStatusForm from "./ImmunizationStatusForm";
import ReminderForm from "./ReminderForm";
const { Text } = Typography;
const columns = [
  {
    title: "Vaccine",
    dataIndex: "vaccine",
    key: "vaccine",
    align: "start",
    width: 60,
    // fixed: "left",
    render: (vaccine) => <strong>{vaccine}</strong>, // Highlight vaccine name
  },
  ...Array.from({ length: 6 }, (_, i) => ({
    title: `Dose ${i + 1}`,
    dataIndex: `dose${i + 1}`,
    key: `dose${i + 1}`,
    align: "start",
    width: 70,
    render: (dose) => {
      if (!dose) return ""; // Handle missing dose data
      return (
        <Space direction="vertical">
          <Tag color={dose.status === "Completed" ? "green" : "yellow"}>
            {dose.status || "N/A"}
          </Tag>
          <span>{dose.date || "No Date"}</span>
        </Space>
      );
    },
  })),
  // {
  //   title: "Notes",
  //   key: "notes",
  //   align: "start",
  //   fixed: "right",
  //   render: () => (
  //     <Space>
  //       <Button type="text" icon={<PlusOutlined />} />
  //       <Button type="text" icon={<FileTextOutlined />} />
  //     </Space>
  //   ),
  // },
];

const data = [
  {
    key: "1",
    vaccine: "DTaP",
    dose1: { status: "Completed", date: "May 18, 2020" },
    dose2: { status: "Completed", date: "May 18, 2020" },
    dose3: { status: "Completed", date: "May 18, 2020" },
    dose4: { status: "Completed", date: "May 18, 2020" },
  },
  {
    key: "2",
    vaccine: "Hib",
    dose1: { status: "Due", date: "May 18, 2020" },
    dose2: { status: "Completed", date: "May 18, 2020" },
    dose3: { status: "Due", date: "May 18, 2020" },
  },
  {
    key: "3",
    vaccine: "Hep A",
    dose1: { status: "Completed", date: "May 18, 2020" },
    dose2: { status: "Completed", date: "May 18, 2020" },
    dose3: { status: "Completed", date: "May 18, 2020" },
    dose4: { status: "Due", date: "May 18, 2020" },
  },
  {
    key: "4",
    vaccine: "MMR",
    dose1: { status: "Completed", date: "May 18, 2020" },
    dose2: { status: "Due", date: "May 18, 2020" },
    dose3: { status: "Due", date: "May 18, 2020" },
    dose4: { status: "Completed", date: "May 18, 2020" },
    dose5: { status: "Completed", date: "May 18, 2020" },
  },
  {
    key: "5",
    vaccine: "Polio",
    dose1: { status: "Completed", date: "May 18, 2020" },
    dose2: { status: "Completed", date: "May 18, 2020" },
  },
  {
    key: "6",
    vaccine: "Rotavirus",
    dose1: { status: "Completed", date: "May 18, 2020" },
    dose2: { status: "Completed", date: "May 18, 2020" },
  },
];

const ImmunizationRecord = () => {
  const [
    isCreateImmunizationRecordModalOpen,
    setCreateImmunizationRecordModalOpen,
  ] = useState(false);
  return (
    <>
      <div style={{ padding: "16px" }}>
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ gap: "12px" }}
        >
          <div className="d-flex align-items-center">
            <Form.Item
              name="expiredDocument"
              valuePropName="checked"
              className="mb-0 me-2 classroom-show-inactive-toggle-btn"
            >
              <Switch />
            </Form.Item>
            <span className="classroom-inactive-label">
              Exempt student from all immunizations
            </span>
            {/* <Switch className="mr10" />
            <Text>Exempt student from all immunizations</Text> */}
          </div>
          <div>
            <ButtonComponent
              text="Send Reminder"
              gradient={true}
              onClick={() => setCreateImmunizationRecordModalOpen(true)}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          // scroll={{ x: 1200 }} // Ensure responsiveness
          // tableLayout="fixed"
        />
      </div>
      {isCreateImmunizationRecordModalOpen && (
        <CommonModalComponent
          open={isCreateImmunizationRecordModalOpen}
          setOpen={setCreateImmunizationRecordModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <ReminderForm
            CardTitle={"Send Reminder"}
            classroomId={null}
            closeModal={() => setCreateImmunizationRecordModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default ImmunizationRecord;
