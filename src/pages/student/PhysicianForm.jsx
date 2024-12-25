import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import TextArea from "antd/es/input/TextArea";
import {
  useCreatePhysician,
  usePhysicianById,
  useUpdatePhysician,
} from "../../hooks/usePhysician";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

function PhysicianForm({ CardTitle, physicianId, studentId, closeModal }) {
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const { data: parentData } = usePhysicianById(physicianId);
  const createPhysicianMutation = useCreatePhysician();
  const updatePhysicianMutation = useUpdatePhysician();
  const isEdit = Boolean(physicianId);

  useEffect(() => {
    if (parentData) {
      form.setFieldsValue({
        firstName: parentData.data.firstName,
        lastName: parentData.data.lastName,
        email: parentData.data.email,
        phoneNumber: parentData.data.phoneNumber,
        address: parentData.data.address,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    setIsButton(true);
    const { firstName, lastName, email, phoneNumber, address } = values;

    if (!firstName || !lastName) {
      CustomMessage.error("All fields are required!");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      studentId,
    };

    if (isEdit) {
      updatePhysicianMutation.mutate(
        {
          physicianId: physicianId,
          physicianData: payload,
        },
        {
          onSuccess: () => {
            CustomMessage.success("Physician updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to update Physician: ${error.message}`);
          },
        }
      );
    } else {
      createPhysicianMutation.mutate(payload, {
        onSuccess: () => {
          CustomMessage.success("Physician created successfully!");
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(`Failed to create Physician: ${error.message}`);
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
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                First Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input the first name!" }, // Required field rule
                  {
                    pattern: /^[A-Za-z`]*$/, // Regex to allow alphabets and backtick
                    message:
                      "First name can only contain alphabets and a backtick!",
                  },
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
                  { required: true, message: "Please input the last name!" }, // Required field rule
                  {
                    pattern: /^[A-Za-z`]*$/, // Regex to allow alphabets and backtick
                    message:
                      "Last name can only contain alphabets and a backtick",
                  },
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

            <div className="flex items-center gap-1 student-label">
              Phone Number
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input the contact number!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Contact number must be numeric!",
                },
              ]}
            >
              <Input
                placeholder="E.g. (000) 000-0000"
                className="w-100 student-form-input"
                maxLength={10}
                minLength={10}
              />
            </Form.Item>

            <div className="flex items-center gap-1 student-label">
              Address
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item name="address">
              <TextArea
                placeholder="Enter Address"
                className="w-100 student-form-input"
              />
            </Form.Item>

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={isEdit ? "Save" : "Add"}
                  padding="0px 65px"
                  type="submit"
                  isLoading={isButton}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PhysicianForm;
