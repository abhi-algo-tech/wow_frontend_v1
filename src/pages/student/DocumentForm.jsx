import { Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useUpdateStudent } from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import FileUploadComponent from "../../components/fileUpload/FileUploadComponent";
import { useCreateDocument, useUpdateDocument } from "../../hooks/useDocument";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

function DocumentForm({ CardTitle, studentData, closeModal, studentId }) {
  const [form] = Form.useForm();
  const [isUploaded, setUploaded] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const {
    data: documentDrpDwnData,
    isLoading,
    isError,
    error,
  } = useMasterLookupsByType("document");
  const createDocumentMutation = useCreateDocument();
  const updateDocumentMutation = useUpdateDocument();

  const isEdit = Boolean(studentData);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        documentName: studentData.name,
        documentType: studentData.docTypeId,
        expiryDate: studentData.expiryDate,
        uploadDocument: studentData.fileType,
      });

      // Convert file URL to Blob and set it in the form
      if (studentData.fileurl) {
        fetch(studentData.fileurl)
          .then((response) => response.blob())
          .then((blob) => {
            form.setFieldsValue({ documentFile: blob });
          })
          .catch((error) => {
            console.error(
              "Failed to fetch or convert file URL to Blob:",
              error
            );
          });
      }
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    setIsButton(true);
    if (
      !values.documentName ||
      !values.documentType ||
      !values.uploadDocument
    ) {
      CustomMessage.error("All required fields must be filled!");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.documentName);
    formData.append("docTypeId", values.documentType);
    if (values.expiryDate) formData.append("expiryDate", values.expiryDate);
    formData.append("contentType", "student");
    if (isUploaded) {
      const fileBlob = form.getFieldValue("uploadDocument");
      if (fileBlob) {
        formData.append("documentFile", fileBlob, fileBlob.name);
      } else {
        CustomMessage.error("Please upload a valid file!");
        return;
      }
    }

    formData.append("studentId", studentId);

    if (isEdit) {
      updateDocumentMutation.mutate(
        { documentId: studentData.documentId, documentData: formData },
        {
          onSuccess: () => {
            CustomMessage.success("Document updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to update document: ${error.message}`);
          },
        }
      );
    } else {
      createDocumentMutation.mutate(formData, {
        onSuccess: () => {
          // CustomMessage.success("Document created successfully!");
          closeModal();
        },
        onError: (error) => {
          // CustomMessage.error(`Failed to create document: ${error.message}`);
        },
      });
    }
  };
  const handleFileBlob = (blob) => {
    form.setFieldsValue({ uploadDocument: blob });
    setUploaded(true);
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
                name="documentType"
                className="select-student-add-from"
                placeholder="Select"
              >
                {documentDrpDwnData?.data?.map((doc) => (
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
              {isEdit ? (
                <FileUploadComponent
                  defaultBlob={form.getFieldValue}
                  fileName={studentData.fileName}
                  onFileBlob={handleFileBlob}
                />
              ) : (
                <FileUploadComponent
                  defaultBlob={null}
                  fileName={null}
                  onFileBlob={handleFileBlob}
                />
              )}
            </Form.Item>
          </div>

          <div className="text-center">
            <Form.Item>
              <ButtonComponent
                text={isEdit ? "Save" : "Add"}
                padding="0px 65px"
                type="submit"
                isLoading={isButton}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DocumentForm;
