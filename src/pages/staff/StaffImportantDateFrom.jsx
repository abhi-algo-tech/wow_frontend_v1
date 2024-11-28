import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";

const { Option } = Select;

function StaffImportantDateForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const { data: parentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (parentData) {
      form.setFieldsValue({
        hireDate: parentData.data.hireDate,
        cdaExamination: parentData.data.cdaExamination,
        firstAidCprExpirationDate: parentData.data.firstAidCprExpirationDate,
        backgroundRecordCheckExpirationDate:
          parentData.data.backgroundRecordCheckExpirationDate,
        schoolLeavingDate: parentData.data.schoolLeavingDate,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    const { status, date } = values;

    if (!status || !date) {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("status", status);
    formData.append("date", date);

    if (isEdit) {
      updateStudentMutation.mutate(
        {
          studentId,
          parentData: formData,
        },
        {
          onSuccess: () => {
            message.success("Student updated successfully!");
            closeModal();
          },
          onError: (error) => {
            message.error(`Failed to update student: ${error.message}`);
          },
        }
      );
    } else {
      createStudentMutation.mutate(formData, {
        onSuccess: () => {
          message.success("Student created successfully!");
          closeModal();
        },
        onError: (error) => {
          message.error(`Failed to create student: ${error.message}`);
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
      <div className="staff-imp-date-form">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Hire Date
              </div>
              <Form.Item
                name="hireDate"
                rules={[{ required: true, message: "hireDate is required!" }]}
              >
                <CustomDatePicker name="hireDate" />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                CDA Examination Date
              </div>
              <Form.Item
                name="cdaExamination"
                rules={[
                  { required: true, message: "cdaExamination is required!" },
                ]}
              >
                <CustomDatePicker name="cdaExamination" />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                First Aid/CPR Expiration Date
              </div>
              <Form.Item
                name="firstAidCprExpirationDate"
                rules={[
                  {
                    required: true,
                    message: "First Aid/CPR Expiration Date is required!",
                  },
                ]}
              >
                <CustomDatePicker name="firstAidCprExpirationDate" />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Background Record Check Expiration date
              </div>
              <Form.Item
                name="backgroundRecordCheckExpirationDate"
                rules={[
                  {
                    required: true,
                    message: "backgroundRecordCheckExpirationDate is required!",
                  },
                ]}
              >
                <CustomDatePicker name="backgroundRecordCheckExpirationDate" />
              </Form.Item>
            </div>

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={"Save"}
                  padding="19.1px 65px"
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

export default StaffImportantDateForm;
