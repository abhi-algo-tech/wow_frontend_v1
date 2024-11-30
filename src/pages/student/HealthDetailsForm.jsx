import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
// import CustomDatePicker from "../../components/CustomDatePicker";

function HealthDetailsForm({ CardTitle, studentData, closeModal }) {
  const [form] = Form.useForm();

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentData);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        allergies: studentData.data.allergies,
        medication: studentData.data.medication,
        dietRestrictions: studentData.data.dietRestrictions,
        // lastPhysicalDate: studentData.data.lastPhysicalDate,
      });
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    const { allergies, medication, dietRestrictions, lastPhysicalDate } =
      values;

    if (!lastPhysicalDate) {
      message.error("Last Physical Date is required!");
      return;
    }

    const formData = new FormData();
    formData.append("allergies", allergies || "No Allergies");
    formData.append("medication", medication || "No Medication");
    formData.append(
      "dietRestrictions",
      dietRestrictions || "No Diet Restrictions"
    );
    // formData.append("lastPhysicalDate", lastPhysicalDate.format("YYYY-MM-DD"));

    if (isEdit) {
      updateStudentMutation.mutate(
        { studentId, studentData: formData },
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
      <div className="student-create">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className=" items-center gap-1 student-label ">
              Allergies
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item name="allergies">
              <Input
                placeholder="No Allergies"
                className="w-100 student-form-input"
              />
            </Form.Item>
            <div className=" items-center gap-1 student-label ">
              Medication
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item
              name="medication"
              // rules={[
              //     { required: true, message: "Please input the email address!" },
              //     { type: "email", message: "Please enter a valid email address!" },
              //   ]}
            >
              <Input
                placeholder="No Medication"
                className="w-100 student-form-input"
              />
            </Form.Item>
            <div className=" items-center gap-1 student-label ">
              Diet Restrictions
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item name="dietRestrictions">
              <Input
                placeholder="No Diet Restrictions"
                className="w-100 student-form-input"
              />
            </Form.Item>

            {/* <div className=" items-center gap-1 student-label ">
              Last Physical Date
            </div>
            <Form.Item
              name="lastPhysicalDate"
              rules={[
                { required: true, message: "Last Physical Date is required!" },
              ]}
            >
              <CustomDatePicker name="lastPhysicalDate" />
            </Form.Item> */}

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={isEdit ? "Save" : "Add"}
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

export default HealthDetailsForm;
