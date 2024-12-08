import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreateGuardian, useUpdateGuardian } from "../../hooks/useStudent";

const { Option } = Select;

function ParentForm({
  cardTitle,
  selectedStudentData,
  selectedGaurdianData,
  closeModal,
}) {
  const [form] = Form.useForm();
  const createGaurdianMutation = useCreateGuardian();
  const updateGaurdianMutation = useUpdateGuardian();
  const [emergencyContact, setEmergencyContact] = useState(false);
  const isEdit = Boolean(selectedGaurdianData?.gurdianId);

  useEffect(() => {
    if (selectedGaurdianData) {
      form.setFieldsValue({
        firstName: selectedGaurdianData?.gurdianFirstName,
        lastName: selectedGaurdianData?.gurdianLastName,
        email: selectedGaurdianData?.email,
        phoneNumber: selectedGaurdianData?.phoneNumber,
        relation: selectedGaurdianData?.relation,
        isEmergencyContact: selectedGaurdianData?.isEmergencyContact,
      });
    }
  }, [selectedGaurdianData, form]);

  const handleSubmit = (values) => {
    const { firstName, lastName, relation, email, phoneNumber } = values;

    if (!firstName || !lastName || relation === "select") {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    const guardianId = selectedGaurdianData?.gurdianId;

    // Append fields to formData

    formData.append("schoolId", selectedStudentData?.classroomId);
    formData.append("studentId", selectedStudentData?.studentId);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("inviteFlag", "true");
    formData.append("relation", relation);
    formData.append("isEmergency", emergencyContact);
    if (isEdit) {
      updateGaurdianMutation.mutate(
        {
          guardianId,
          guardianData: formData,
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
      createGaurdianMutation.mutate(formData, {
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
  const handleEmergencyContact = (e) => {
    setEmergencyContact(e);
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
        {cardTitle}
      </span>
      <div className="student-create">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                First Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input the first name!" },
                ]}
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
                rules={[
                  { required: true, message: "Please input the last name!" },
                ]}
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
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
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
                  {
                    required: true,
                    message: "Please input the contact number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Contact number must be numeric!",
                  },
                ]}
              >
                <Input
                  placeholder="E.g. (000) 000-0000"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Relation
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item name="relation">
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
                className="parent-create-toggle-btn d-flex align-items-center"
              >
                <span className="text-muted">Is Emergency Contact?</span>
                <Switch
                  name="isEmergencyContact"
                  className="ml10"
                  onChange={handleEmergencyContact}
                />
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
