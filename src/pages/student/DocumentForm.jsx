import { Form, Input, message, Select } from "antd";
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

function DocumentForm({ CardTitle, studentId, closeModal, studentData }) {
  const [form] = Form.useForm();

  // const { data: parentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentData.id);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        // documentName: studentData.data.documentName,
        // documentType: studentData.data.documentType,
        // expiryDate: studentData.data.expiryDate,
        // uploadDocument: studentData.data.uploadDocument,
      });
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    if (
      !values.documentName ||
      !values.documentType ||
      !values.uploadDocument
    ) {
      message.error("All required fields must be filled!");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.documentName);
    formData.append("docTypeName", values.documentType);
    formData.append("expiryDate", values.expiryDate);
    formData.append("contentType", "student");
    formData.append("documentFile", values.uploadDocument);
    formData.append("studentId", values.uploadDocument);
    formData.append("schoolId", values.uploadDocument);

    if (isEdit) {
      updateStudentMutation.mutate(
        { studentId, parentData: formData },
        {
          onSuccess: () => {
            message.success("Document updated successfully!");
            closeModal();
          },
          onError: (error) => {
            message.error(`Failed to update document: ${error.message}`);
          },
        }
      );
    } else {
      createStudentMutation.mutate(formData, {
        onSuccess: () => {
          message.success("Document created successfully!");
          closeModal();
        },
        onError: (error) => {
          message.error(`Failed to create document: ${error.message}`);
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
            <div className="flex items-center gap-1 student-label">
              Document Name<span className="text-danger"> *</span>
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

            <div className="items-center gap-1 student-label">
              Document Type<span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="documentType"
              rules={[
                { required: true, message: "Please select the document type!" },
              ]}
            >
              <Select className="select-student-add-from" placeholder="Select">
                <Option value="Birth Cirtificate">Birth Cirtificate</Option>
                <Option value="Registration Forms">Registration Forms</Option>
                <Option value="Special Program Forms">
                  Special Program Forms
                </Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <div className="items-center gap-1 student-label">Expiry Date</div>
            <Form.Item name="expiryDate">
              <CustomDatePicker />
            </Form.Item>

            <div className="items-center gap-1 student-label">
              Upload Document<span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="uploadDocument"
              valuePropName="file"
              rules={[
                { required: true, message: "Please upload the document!" },
              ]}
            >
              <FileUploadComponent />
            </Form.Item>
          </div>

          <div className="text-center">
            <Form.Item>
              <ButtonComponent
                text={isEdit ? "Save" : "Add"}
                padding="19.1px 115px"
                type="submit"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DocumentForm;
