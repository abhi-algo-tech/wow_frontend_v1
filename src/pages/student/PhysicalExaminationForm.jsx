import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useCreatePhysicalTracker } from "../../hooks/usePhysicalTracker";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

function PhysicalExaminationForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const createPhysicalTrackerMutation = useCreatePhysicalTracker();

  const { data: statusData } = useMasterLookupsByType("physical_status");

  const handleSubmit = (values) => {
    const { status, physicalCheckupDate } = values;

    if (!status || !physicalCheckupDate) {
      CustomMessage.error("All fields are required!");
      return;
    }

    const payload = {
      statusId: status,
      physicalDate: physicalCheckupDate,
      studentId: studentId,
    };
    createPhysicalTrackerMutation.mutate(payload, {
      onSuccess: () => {
        CustomMessage.success("Physical Tracker created successfully!");
        closeModal();
      },
      onError: (error) => {
        CustomMessage.error(
          `Failed to create Physical Tracker: ${error.message}`
        );
      },
    });
  };

  return (
    <div className="card">
      <span
        style={{
          backgroundColor: "#eef1fe",
          fontWeight: "bold",
          padding: 15,
          borderRadius: "8px 8px 0 0",
        }}
      >
        {CardTitle}
      </span>
      <div className="student-create">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Physical Checkup Date
              </div>
              <Form.Item
                name="physicalCheckupDate"
                rules={[
                  {
                    required: true,
                    message: "physicalCheckupDate is required!",
                  },
                ]}
              >
                <CustomDatePicker name="physicalCheckupDate" />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Status
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item name="status">
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  {statusData?.data?.map((status) => (
                    <Option key={status?.id} value={status?.id}>
                      {status?.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={"Add"}
                  padding="19.1px 115px"
                  type="submit"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PhysicalExaminationForm;
