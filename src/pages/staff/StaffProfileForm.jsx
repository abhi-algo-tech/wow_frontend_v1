import { Form, Input, InputNumber, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import MultiSelectComponent from "../../components/multiSelect/MultiSelectComponent";

const { Option } = Select;

function StaffProfileForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

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
  //   console.log("selectedClassrooms", selectedClassrooms);

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
              <div className=" items-center gap-1 student-label ">Status</div>
              <Form.Item name="status">
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
                Designation
              </div>
              <Form.Item name="designation">
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                  defaultActiveFirstOption={1}
                >
                  <Option value="select">Select</Option>
                  <Option value="1">Admin</Option>
                  <Option value="2">Lead Teacher</Option>
                  <Option value="2">Staff</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-12">
              <div className=" items-center gap-1 student-label ">
                Allowed Classrooms<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="allowedClassroom"
                rules={[
                  {
                    required: true,
                    message: "Please select allowed Classroom",
                  },
                ]}
              >
                <MultiSelectComponent
                  setSelectedClassrooms={setSelectedClassrooms}
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Primary Classroom<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="primaryClassroom"
                rules={[
                  {
                    required: true,
                    message: "Please select Primary Classroom!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-form"
                  placeholder="Select"
                  defaultActiveFirstOption={true} // Correct usage
                >
                  <Option value="select">Select</Option>
                  {selectedClassrooms.map((classroom, i) => (
                    <Option key={i} value={classroom.id}>
                      {classroom.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Birthdate
              </div>

              <CustomDatePicker name="birthDate" />
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Email<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the Email!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Jessica@wowcare.com"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Phone Number<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the Number!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="e.g. (986) 027-1627"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Street
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="street"
                rules={[
                  {
                    required: true,
                    message: "Please input the Street!",
                  },
                ]}
              >
                <Input
                  placeholder="Eg. Street no"
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
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">Job Tag</div>
              <Form.Item name="jobTag">
                <Select
                  className="select-student-add-form"
                  placeholder="Select"
                  defaultActiveFirstOption={true} // Correct usage
                >
                  <Option value="select">Select</Option>
                  <Option value="1">Full Time</Option>
                  <Option value="2">Half Day</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="text-center mt5">
            <Form.Item>
              <ButtonComponent
                text={"Save"}
                padding="16.1px 60px"
                type="submit"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StaffProfileForm;
