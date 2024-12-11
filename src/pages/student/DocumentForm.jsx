import { Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useUpdateStudent } from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import FileUploadComponent from "../../components/fileUpload/FileUploadComponent";
import { useCreateDocument } from "../../hooks/useDocument";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";

const { Option } = Select;

function DocumentForm({ CardTitle, StudentId, closeModal, studentData }) {
  const [form] = Form.useForm();
  const {
    data: documentDrpDwnData,
    isLoading,
    isError,
    error,
  } = useMasterLookupsByType("document");
  const createDocumentMutation = useCreateDocument();
  const updateStudentMutation = useUpdateStudent();
  const [selectedValue, setSelectedValue] = useState(null);
  const [documentOptions, setDocumentOptions] = useState([]);
  const isEdit = Boolean(StudentId?.id);

  useEffect(() => {
    if (studentData && StudentId?.id) {
      form.setFieldsValue({
        documentName: studentData?.name,
        documentType: studentData?.docTypeId,
        expiryDate: studentData?.expiryDate,
        uploadDocument: studentData?.fileType,
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
    formData.append("docTypeId", values.documentType);
    formData.append("expiryDate", values.expiryDate);
    formData.append("contentType", "student");
    formData.append("documentFile", "");
    formData.append("studentId", StudentId?.id);
    formData.append("schoolId", StudentId?.schoolId);

    if (isEdit) {
      const studentId = StudentId?.id;
      updateStudentMutation.mutate(
        { studentId, studentData: formData },
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
      createDocumentMutation.mutate(formData, {
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
  const handleFileBlob = (blob) => {
    form.setFieldsValue({ uploadDocument: blob });
  };
  useEffect(() => {
    if (documentDrpDwnData) {
      setDocumentOptions(documentDrpDwnData.data);
    }
  }, [documentDrpDwnData, isError, error]);

  useEffect(() => {
    // Set the initial value for edit mode
    if (studentData?.documentId) {
      setSelectedValue(studentData?.documentId);
    }
  }, [studentData?.documentId]);
  useEffect(() => {
    // Set the initial value for edit mode
    if (studentData?.documentId) {
      setSelectedValue(studentData?.documentId);
    }
  }, [studentData?.documentId]);

  const handleChange = (value) => {
    setSelectedValue(value);
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
              <Select
                className="select-student-add-from"
                placeholder="Select"
                value={selectedValue}
                onChange={handleChange}
              >
                {documentOptions?.map((doc) => (
                  <Option key={doc.id} value={doc.id}>
                    {doc.name}
                  </Option>
                ))}
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
              <FileUploadComponent onFileBlob={handleFileBlob} />
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
