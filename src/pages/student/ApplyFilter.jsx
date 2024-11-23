import React, { useState } from "react";
import { Select, Button, message } from "antd";

const { Option } = Select;

function ApplyFilter({ CardTitle, closeModal, onApplyFilter }) {
  const [formValues, setFormValues] = useState({
    classroom: null,
    status: null,
    tag: null,
  });

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
    message.success("Filters applied successfully!");
  };

  const handleClearAll = () => {
    // Reset all fields locally
    setFormValues({
      classroom: null,
      status: null,
      tag: null,
    });
    onApplyFilter({}); // Notify parent to clear all filters
    message.success("Filters cleared successfully!");
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
                <Option value="1-Blue-D">1-Blue-D</Option>
                <Option value="6-Yellow-R">6-Yellow-R</Option>
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
                <Option value="Active">Active</Option>
                <Option value="In-Active">In-Active</Option>
              </Select>
            </div>

            {/* Tag Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Tag
              </label>
              <Select
                className="w-100 select-student-add-from"
                placeholder="Select Tag"
                value={formValues.tag}
                onChange={(value) => handleSelectChange("tag", value)}
              >
                <Option value={null}>Select</Option>
                <Option value="Full Day">Full Day</Option>
                <Option value="Half Day">Half Day</Option>
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Apply Filter
            </Button>
            <Button onClick={handleClearAll}>Clear All</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyFilter;
