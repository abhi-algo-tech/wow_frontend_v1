import React, { useEffect, useState } from "react";
import { Table, Switch, Form, Space, Tag } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import ReminderForm from "./ReminderForm";
import ImmunizationDetailsForm from "./ImmunizationDetailsForm";
import { useGetAllImmunizationsByStudent } from "../../hooks/useImmunizations";
import { transformImmunizationData } from "./StudentCommon";

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

const ImmunizationRecord = ({ studentId }) => {
  const [
    isCreateImmunizationRecordModalOpen,
    setCreateImmunizationRecordModalOpen,
  ] = useState(false);
  const [isDoseModalOpen, setDoseModalOpen] = useState(false); // For dose modal
  const [selectedDose, setSelectedDose] = useState(null); // Store selected dose data
  const [formattedData, setFormattedData] = useState([]);

  const {
    data: immunizations,
    isLoading,
    isError,
  } = useGetAllImmunizationsByStudent(studentId);

  useEffect(() => {
    if (immunizations) {
      const transformed = transformImmunizationData(immunizations);
      console.log("transformed:", transformed);
      setFormattedData(transformed);
    }
  }, [immunizations]);

  const columns = [
    {
      title: "Vaccine",
      dataIndex: "vaccine",
      key: "vaccine",
      align: "start",
      width: 60,
      render: (vaccine) => <strong>{vaccine}</strong>, // Highlight vaccine name
    },
    ...Array.from({ length: 6 }, (_, i) => ({
      title: `Dose ${i + 1}`,
      dataIndex: `dose${i + 1}`,
      key: `dose${i + 1}`,
      align: "start",
      width: 70,
      render: (dose, record) => {
        if (!dose) return ""; // Handle missing dose data
        return (
          <Space direction="vertical">
            <Tag
              color={dose.status === "Completed" ? "green" : "yellow"}
              onClick={() =>
                handleDoseClick(record.key, record.vaccine, i + 1, dose)
              } // Click handler
              style={{ cursor: "pointer" }} // Add pointer cursor for interaction
            >
              {dose.status || "N/A"}
            </Tag>
            <span>{dose.date || "No Date"}</span>
          </Space>
        );
      },
    })),
  ];

  // Handle dose click
  const handleDoseClick = (id, vaccine, doseId, data) => {
    setSelectedDose({ id, vaccine, doseId, data });
    setDoseModalOpen(true); // Open dose modal
  };

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
          dataSource={formattedData}
          pagination={false}
          size="small"
        />
      </div>

      {/* Send Reminder Modal */}
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

      {/* Dose Details Modal */}
      {isDoseModalOpen && selectedDose && (
        <CommonModalComponent
          open={isDoseModalOpen}
          setOpen={setDoseModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <ImmunizationDetailsForm
            CardTitle={`${selectedDose.vaccine} - Dose ${selectedDose.doseId}`}
            doseData={selectedDose}
            studentId={studentId}
            closeModal={() => setDoseModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default ImmunizationRecord;
