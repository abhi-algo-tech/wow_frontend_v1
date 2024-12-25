import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import CustomDatePicker from "../../components/CustomDatePicker";
import {
  useCreatePhysicalTracker,
  useUpdatePhysicalTracker,
} from "../../hooks/usePhysicalTracker";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

function ImmunizationDetailsForm({
  CardTitle,
  doseData,
  studentId,
  closeModal,
}) {
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const createPhysicalTrackerMutation = useCreatePhysicalTracker();
  const updatePhysicalTrackerMutation = useUpdatePhysicalTracker();

  const { data: statusData } = useMasterLookupsByType("physical_status");

  const isEdit = Boolean(doseData?.id);

  useEffect(() => {
    if (doseData) {
      const date = new Date(doseData?.data?.date);
      const formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
      form.setFieldsValue({
        status: doseData?.data?.statusId,
        physicalCheckupDate: formattedDate,
      });
    }
  }, [doseData, form]);

  const handleSubmit = (values) => {
    setIsButton(true);
    const { status, physicalCheckupDate } = values;

    if (!status || !physicalCheckupDate) {
      CustomMessage.error("All fields are required!");
      return;
    }

    const payload = {
      statusId: status,
      physicalDate: physicalCheckupDate,
      studentId,
    };

    if (isEdit) {
      updatePhysicalTrackerMutation.mutate(
        {
          trackerId: doseData?.id,
          doseData: payload,
        },
        {
          onSuccess: () => {
            CustomMessage.success(`Immunization updated successfully!`);
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(
              `Failed to update Immunization: ${error.message}`
            );
          },
        }
      );
    } else {
      createPhysicalTrackerMutation.mutate(payload, {
        onSuccess: () => {
          CustomMessage.success(`Immunization created successfully!`);
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(
            `Failed to create Immunization: ${error.message}`
          );
        },
      });
    }
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
              <div className=" items-center gap-1 student-label ">Status</div>
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
                  padding="19.1px 65px"
                  type="submit"
                  isLoading={isButton}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ImmunizationDetailsForm;
