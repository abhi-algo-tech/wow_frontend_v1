import React, { useState } from "react";
import { Select, Button, message } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import { CustomMessage } from "../../utils/CustomMessage";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";

const { Option } = Select;

function StaffFilter({ CardTitle, closeModal, onApplyFilter, classrooms }) {
  // Fetch status and tags using custom hooks
  const { data: status } = useMasterLookupsByType("status");
  const { data: designation } = useMasterLookupsByType("designation");
  const [formValues, setFormValues] = useState({
    classroom: null,
    status: null,
    designation: null,
  });
  console.log("classrooms", classrooms);

  const handleSelectChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send only selected filters
    const appliedFilters = Object.fromEntries(
      Object.entries(formValues).filter(([, value]) => value)
    );
    onApplyFilter(appliedFilters);
    closeModal();
    CustomMessage.success("Filters applied successfully!");
  };

  const handleClearAll = () => {
    // Reset all fields locally
    setFormValues({
      classroom: null,
      status: null,
      designation: null,
    });
    onApplyFilter({}); // Notify parent to clear all filters
    CustomMessage.success("Filters cleared successfully!");
  };

  return (
    <div className="card">
      <div
        style={{
          backgroundColor: "#eef1fe",
          fontWeight: "bold",
          padding: "19px 40px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        {CardTitle}
      </div>

      <div className="student-create">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Classroom Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Classroom
              </label>
              <Select
                className="w-100 select-student-add-from"
                placeholder="Select Classroom"
                value={formValues.classroom}
                onChange={(value) => handleSelectChange("classroom", value)}
              >
                <Option value={null}>Select</Option>
                {classrooms?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Designation Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Designation
              </label>
              <Select
                className="w-100 select-student-add-from"
                placeholder="Select Designation"
                value={formValues.designation}
                onChange={(value) => handleSelectChange("designation", value)}
              >
                <Option value={null}>Select</Option>
                {designation?.data?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Status Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Status
              </label>
              <Select
                className="w-100 select-student-add-from"
                placeholder="Select Status"
                value={formValues.status}
                onChange={(value) => handleSelectChange("status", value)}
              >
                <Option value={null}>Select</Option>
                {status?.data?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            {/* <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Apply Filter
            </Button> */}
            <ButtonComponent
              text={"Apply"}
              padding="16.1px 60px"
              type="submit"
            />
            {/* <ButtonComponent
              text={"Clear All"}
              padding="16.1px 60px"
              onClick={handleClearAll}
            /> */}
            {/* <Button onClick={handleClearAll}>Clear All</Button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffFilter;
