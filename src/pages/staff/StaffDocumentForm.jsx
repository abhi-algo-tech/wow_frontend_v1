import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import FileUploadComponent from "../../components/fileUpload/FileUploadComponent";

const { Option } = Select;

function StaffDocumentForm({ CardTitle, studentId, closeModal }) {
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
        phoneNumber: parentData.data.phoneNumber,
        relation: parentData.data.relation,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    const { firstName, lastName, relation, phoneNumber } = values;

    if (!firstName || !lastName) {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("relation", relation);

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
  const handleFileBlob = (blob) => {
    console.log("Received Blob:", blob);
    // Handle the Blob file here (e.g., upload it, preview it, etc.)
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
      <div className="staff-document-form">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="flex items-center gap-1 student-label">
              Document name
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="documentName"
              rules={[
                { required: true, message: "Please input the document name!" },
              ]}
            >
              <Input
                placeholder="e.g. Report Card"
                className="w-100 student-form-input"
              />
            </Form.Item>
            <div className=" items-center gap-1 student-label ">
              Document Type
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="documentType"
              rules={[
                { required: true, message: "Please select the Document Type!" },
              ]}
            >
              <Select className="select-student-add-from" placeholder="Select">
                <Option value="select">Select</Option>
                <Option value="1">Father</Option>
                <Option value="2">Mother</Option>
              </Select>
            </Form.Item>
          </div>
          <div className=" items-center gap-1 student-label ">Expiry Date</div>

          <CustomDatePicker
            name="expiryDate"
            // rules={[
            //   { required: true, message: "Please select the Document Type!" },
            // ]}
          />
          <div className=" items-center gap-1 student-label ">
            Upload Document
            <span className="text-danger"> *</span>
          </div>
          <Form.Item
            name="uploadDocument"
            rules={[{ required: true, message: "Please upload the Document!" }]}
          >
            <FileUploadComponent onFileBlob={handleFileBlob} />
          </Form.Item>

          <div className="text-center ">
            <Form.Item>
              <ButtonComponent
                text={isEdit ? "Save" : "Add"}
                padding="15px 65px"
                type="submit"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StaffDocumentForm;
