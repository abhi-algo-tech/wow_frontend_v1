import { Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreateStudent, useStudentById, useUpdateStudent } from "../../hooks/useStudent";

const { Option } = Select;

function CreateStudent({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const { data: studentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        firstName: studentData.data.firstName,
        lastName: studentData.data.lastName,
        classroom: "1-Blue-D",
      });
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    const { firstName, lastName, classroom } = values;

    if (!firstName || !lastName || classroom === "select") {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("classroomId", 1);

    if (isEdit) {
      updateStudentMutation.mutate(
        { 
          studentId, 
          studentData: formData 
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
          // message.success("Student created successfully!");
          closeModal();
        },
        onError: (error) => {
          message.error(`Failed to create student: ${error.message}`);
        },
      });
    }
  }
    

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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="row">
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                First Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Please input the first name!" }]}
              >
                <Input
                  placeholder="E.g. John"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Last Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please input the last name!" }]}
              >
                <Input
                  placeholder="E.g. Smith"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className="flex items-center gap-1 student-label ">
              Select Classroom
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="classroom"
              rules={[{ required: true, message: "Please select a classroom!" }]}
            >
              <Select
                className="select-student-add-from"
                placeholder="Select Classroom"
              >
                <Option value="select">Select</Option>
                <Option value="1">1-Blue-D</Option>
                <Option value="2">6-Yellow-R</Option>
              </Select>
            </Form.Item>
            <div className="text-center mt6">
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

export default CreateStudent;
