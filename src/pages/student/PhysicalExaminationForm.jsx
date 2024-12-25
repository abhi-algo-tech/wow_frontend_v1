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

function PhysicalExaminationForm({
  CardTitle,
  studentId,
  trackerData,
  closeModal,
  module,
}) {
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const createPhysicalTrackerMutation = useCreatePhysicalTracker();
  const updatePhysicalTrackerMutation = useUpdatePhysicalTracker();

  const { data: statusData } = useMasterLookupsByType("physical_status");

  const isEdit = Boolean(trackerData?.id);

  useEffect(() => {
    if (trackerData) {
      form.setFieldsValue({
        status: trackerData?.statusId,
        physicalCheckupDate: trackerData?.physicalDate,
      });
    }
  }, [trackerData, form]);

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
      ...(module === "student" ? { studentId } : { staffId: studentId }),
    };

    if (isEdit) {
      updatePhysicalTrackerMutation.mutate(
        {
          trackerId: trackerData?.id,
          trackerData: payload,
        },
        {
          onSuccess: () => {
            if (module === "student") {
              CustomMessage.success(
                `Physical ${
                  module === "student" ? "Examination" : "Checkup"
                } updated successfully!`
              );
            } else {
              CustomMessage.success(
                `Physical ${
                  module === "student" ? "Examination" : "Checkup"
                } updated successfully!`
              );
            }
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(
              `Failed to update Physical ${
                module === "student" ? "Examination" : "Checkup"
              }: ${error.message}`
            );
          },
        }
      );
    } else {
      createPhysicalTrackerMutation.mutate(payload, {
        onSuccess: () => {
          CustomMessage.success(
            `Physical ${
              module === "student" ? "Examination" : "Checkup"
            } created successfully!`
          );
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(
            `Failed to create Physical ${
              module === "student" ? "Examination" : "Checkup"
            }: ${error.message}`
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
                  padding="0px 65px"
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

export default PhysicalExaminationForm;
