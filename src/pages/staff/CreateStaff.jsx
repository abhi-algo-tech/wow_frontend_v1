import { Form, Input, InputNumber, message, Select } from "antd";
import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";

const { Option } = Select;

function CreateStaff({ CardTitle, closeModal }) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    classroom: "",
    primaryClassroom: "",
    designation: "",
  });

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      classroom,
      primaryClassroom,
      designation,
    } = formValues;

    // Basic Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      classroom === "select" ||
      primaryClassroom === "select" ||
      designation === "select"
    ) {
      message.error("All fields are required!");
      return;
    }

    // Submit Data
    message.success("Staff added successfully!");
    closeModal();
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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <label className="staff-label">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                className="staff-form-input"
                placeholder="E.g. John"
                value={formValues.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="staff-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                className="staff-form-input"
                placeholder="E.g. Smith"
                value={formValues.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="staff-label">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                className="staff-form-input"
                placeholder="E.g. john.smith@example.com"
                value={formValues.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="staff-label">
                Phone Number <span className="text-danger">*</span>
              </label>
              <InputNumber
                className="w-100 staff-form-input"
                placeholder="E.g. 1234567890"
                value={formValues.phoneNumber}
                onChange={(value) => handleChange("phoneNumber", value)}
              />
            </div>
            <div className="col-6">
              <label className="staff-label">
                Classrooms <span className="text-danger">*</span>
              </label>
              <Select
                className="w-100 staff-form-input"
                placeholder="Select"
                value={formValues.classroom}
                onChange={(value) => handleChange("classroom", value)}
              >
                <Option value="select">Select</Option>
                <Option value="1-Blue-D">1-Blue-D</Option>
                <Option value="6-Yellow-R">6-Yellow-R</Option>
              </Select>
            </div>
            <div className="col-6">
              <label className="staff-label">
                Primary Classroom <span className="text-danger">*</span>
              </label>
              <Select
                className="w-100 h40"
                placeholder="Select"
                value={formValues.primaryClassroom}
                onChange={(value) => handleChange("primaryClassroom", value)}
              >
                <Option value="select">Select</Option>
                <Option value="1-Blue-D">1-Blue-D</Option>
                <Option value="6-Yellow-R">6-Yellow-R</Option>
              </Select>
            </div>
            <div className="col-6">
              <label className="staff-label">
                Designation <span className="text-danger">*</span>
              </label>
              <Select
                className="w-100 h40"
                placeholder="Select"
                value={formValues.designation}
                onChange={(value) => handleChange("designation", value)}
              >
                <Option value="select">Select</Option>
                <Option value="Staff">Staff</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </div>
            <div className="text-center mt-4">
              <ButtonComponent text="Add" padding="10px 50px" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStaff;
