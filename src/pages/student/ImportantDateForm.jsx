import { Form, message } from "antd";
import React, { useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreateStudent, useUpdateStudent } from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";

function ImportantDateForm({ CardTitle, closeModal, studentData }) {
  const [form] = Form.useForm();

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentData?.id);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        enrollDate: studentData?.registrationDate,
        schoolStartDate: studentData?.startDate,
        currentClassroomDate: studentData?.roomStartDate,
        upcomingMoveDate: studentData?.expectedMoveDate,
        schoolLeavingDate: studentData?.leavingDate,
      });
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("registrationDate", values.enrollDate);
    formData.append("startDate", values.schoolStartDate);
    formData.append("roomStartDate", values.currentClassroomDate);
    formData.append("expectedMoveDate", values.upcomingMoveDate);
    formData.append("leavingDate", values.schoolLeavingDate);

    if (isEdit) {
      updateStudentMutation.mutate(
        {
          studentId: studentData.id,
          studentData: formData,
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

  const dateFields = [
    { name: "enrollDate", label: "Enroll Date" },
    { name: "schoolStartDate", label: "School Start Date" },
    { name: "currentClassroomDate", label: "Current Classroom Date" },
    { name: "upcomingMoveDate", label: "Upcoming Move Date" },
    { name: "schoolLeavingDate", label: "School Leaving Date" },
  ];

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
            {dateFields.map((field) => (
              <div className="col-6" key={field.name}>
                <div className="items-center gap-1 student-label">
                  {field.label}
                </div>
                <Form.Item
                  name={field.name}
                  rules={[
                    { required: true, message: `${field.label} is required!` },
                  ]}
                >
                  <CustomDatePicker name={field.name} />
                </Form.Item>
              </div>
            ))}
            <div className="text-center">
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

export default ImportantDateForm;
