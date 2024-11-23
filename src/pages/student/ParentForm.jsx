import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreateStudent, useStudentById, useUpdateStudent } from "../../hooks/useStudent";

const { Option } = Select;

function ParentForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const { data: parentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (parentData) {
      form.setFieldsValue({
        firstName: parentData.data.firstName,
        lastName: parentData.data.lastName,
        email: parentData.data.email,
        phoneNumber: parentData.data.phoneNumber,
        relation: parentData.data.relation,
        isEmergencyContact: parentData.data.isEmergencyContact,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    const { firstName, lastName, relation, email, phoneNumber } = values;

    if (!firstName || !lastName || relation === "select") {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("relation", relation);
    formData.append("isEmergencyContact", isEmergencyContact);

    if (isEdit) {
      updateStudentMutation.mutate(
        { 
          studentId, 
          parentData: formData 
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

            <div className=" items-center gap-1 student-label ">
              Email
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: "Please input the email address!" },
                    { type: "email", message: "Please enter a valid email address!" },
                  ]}
              >
                <Input
                  placeholder="E.g. jane.doe@example.com"
                  className="w-100 student-form-input"
                />
              </Form.Item>

              <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Phone Number
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="phoneNumber"
                rules={[
                    { required: true, message: "Please input the contact number!" },
                    { pattern: /^[0-9]+$/, message: "Contact number must be numeric!" },
                  ]}
              >
                <Input placeholder="E.g. (000) 000-0000" className="w-100 student-form-input" />

              </Form.Item>
            </div>
              <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            Relation
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item
              name="relation"
            >
              <Select
                className="select-student-add-from"
                placeholder="Select"
              >
                <Option value="select">Select</Option>
                <Option value="1">Father</Option>
                <Option value="2">Mother</Option>
              </Select>
            </Form.Item>
            </div>
            {isEdit === false && (
  <Form.Item
    name="isEmergencyContact"
    valuePropName="checked"
    className="parent-create-toggle-btn"
  >
    <div className="d-flex align-items-center">
      <Switch className="me-3" />
      <span className="text-muted">Is Emergency Contact?</span>
    </div>
  </Form.Item>
)}

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

export default ParentForm;
