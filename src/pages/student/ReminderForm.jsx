import { Checkbox, Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

function ReminderForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const { data: parentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (parentData) {
      form.setFieldsValue({
        staff: parentData.data.staff,
        isSendReminder: parentData.data.isSendReminder,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    const { staff, isSendReminder } = values;

    if (!staff || !isSendReminder) {
      CustomMessage.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("staff", staff);
    formData.append("isSendReminder", isSendReminder);

    if (isEdit) {
      updateStudentMutation.mutate(
        {
          studentId,
          parentData: formData,
        },
        {
          onSuccess: () => {
            CustomMessage.success("Student updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to update student: ${error.message}`);
          },
        }
      );
    } else {
      createStudentMutation.mutate(formData, {
        onSuccess: () => {
          CustomMessage.success("Student created successfully!");
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(`Failed to create student: ${error.message}`);
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
            <div className="custom-text">
              Send parents a reminder email that includes all statuses of
              vaccines on the child’s immunization card.
            </div>
            <div className="mt16">
              <Checkbox>
                <span className=" items-center gap-1 student-label ">
                  Send reminders to staff
                </span>
              </Checkbox>
            </div>

            <div className=" items-center gap-1 student-label mt16">
              Select Staff
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item name="status">
              <Select className="select-student-add-from" placeholder="Select">
                <Option value="select">Select</Option>
                <Option value="1">rohni</Option>
                <Option value="2">smith</Option>
              </Select>
            </Form.Item>

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={isEdit ? "Save" : "Add"}
                  padding="0px 65px"
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

export default ReminderForm;
