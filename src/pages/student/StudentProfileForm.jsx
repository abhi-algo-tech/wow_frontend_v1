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
import YesNoRadio from "../../components/radio/YesNoRadio";
import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";

const { Option } = Select;

function StudentProfileForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);

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

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };
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

  const handleChange = (e) => {
    console.log("Selected Value:", e.target.value);
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
            <div className="col-3">
              <div className="flex items-center gap-1 student-label">
                First Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input the First Name!",
                  },
                ]}
              >
                <Input
                  placeholder="First Name"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <div className="flex items-center gap-1 student-label">
                Last Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input the Last Name!",
                  },
                ]}
              >
                <Input
                  placeholder="Last Name"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">
                Status
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="status"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select the Status!",
                //   },
                // ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="1">Active</Option>
                  <Option value="2">Inactive</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">
                Classroom
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="classroom"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select the Classroom!",
                //   },
                // ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="1">black-1</Option>
                  <Option value="2">blue</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Birthdate
              </div>

              <CustomDatePicker
                name="birthDate"
                // rules={[
                //   { required: true, message: "Please select the Document Type!" },
                // ]}
              />
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                State Subsidy
              </div>
              <YesNoRadio
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                defaultValue="no"
                onChange={handleChange}
              />
            </div>

            <div className=" items-center gap-1 student-label ">
              Select Tags
              <span className="text-danger"> *</span>
            </div>

            <Form.Item
              name="tags"
              rules={[
                { required: true, message: "Please select at least one tag" },
              ]}
            >
              <MultiSelectWithTags
                name="tags"
                value={selectedTags}
                onChange={handleTagChange}
                options={[
                  { value: "5 days" },
                  { value: "Full Day" },
                  { value: "Photo Permission" },
                  { value: "cyan" },
                ]}
                placeholder="Select"
              />
            </Form.Item>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Notes
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="notes"
                rules={[
                  {
                    required: true,
                    message: "Please input the Notes!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Child Custody
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="childCustody"
                rules={[
                  {
                    required: true,
                    message: "Please select the Child Custody!",
                  },
                ]}
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

            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Address Line
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input the Address Line!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                City
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input the City!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                State
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Please select the State!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="1">test</Option>
                  <Option value="2">demo</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Country
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please select the Country!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="1">India</Option>
                  <Option value="2">USA</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Zip Code
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="zipCode"
                rules={[
                  {
                    required: true,
                    message: "Please input the Zip Code!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
          </div>
          <div className="text-center ">
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

export default StudentProfileForm;
