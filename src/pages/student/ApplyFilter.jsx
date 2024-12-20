import React, { useState } from "react";
import { Select, Button } from "antd";
import { CustomMessage } from "../../utils/CustomMessage";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import ButtonComponent from "../../components/ButtonComponent";

const { Option } = Select;

function ApplyFilter({ CardTitle, closeModal, onApplyFilter }) {
  const [formValues, setFormValues] = useState({
    classroom: null,
    status: null,
    tag: null,
  });

  // Fetch status and tags using custom hooks
  const { data: status } = useMasterLookupsByType("status");
  const { data: tags } = useMasterLookupsByType("tags");

  const handleSelectChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appliedFilters = Object.fromEntries(
      Object.entries(formValues).filter(([, value]) => value)
    );
    onApplyFilter(appliedFilters);
    closeModal();
    CustomMessage.success("Filters applied successfully!");
  };

  const handleClearAll = () => {
    setFormValues({
      classroom: null,
      status: null,
      tag: null,
    });
    onApplyFilter({});
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
                {status?.data?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
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
                {tags?.data?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            <ButtonComponent
              text="Apply Filter"
              type="primary"
              htmlType="submit"
              style={{ marginRight: 8 }}
            />

            {/* <Button onClick={handleClearAll}>Clear All</Button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyFilter;
