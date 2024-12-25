import React, { useState } from "react";
import { Form, Radio } from "antd";
import CustomDatePicker from "../../components/CustomDatePicker";
import ButtonComponent from "../../components/ButtonComponent";

function PublishShift({ setCancel, deleteData, CardTitle, handlePublish }) {
  const [publishType, setPublishType] = useState("until-date"); // Default to 'until-date'

  const handleCancelClick = () => {
    setCancel(false);
  };

  const handlePublishClick = () => {
    handlePublish(deleteData?.id);
    setCancel(false);
  };

  return (
    <div className="card">
      {CardTitle && (
        <span
          style={{
            backgroundColor: "#eef1fe",
            fontWeight: "bold",
            padding: 15,
            borderRadius: "8px 8px 0 0",
            display: "block",
          }}
        >
          {CardTitle}
        </span>
      )}
      <div style={{ padding: "20px 40px" }}>
        {/* Form Section */}
        <Form layout="vertical">
          <Form.Item className="d-flex justify-content-between">
            <Radio.Group
              value={publishType}
              onChange={(e) => setPublishType(e.target.value)}
              className=""
            >
              <div>
                <Radio value="until-date">Publish Until Date</Radio>
              </div>

              {/* Conditional Date Picker */}
              {publishType === "until-date" && (
                <div>
                  <Form.Item
                    className="mt20"
                    name="untilDate"
                    // rules={[{ required: true, message }]}
                  >
                    <CustomDatePicker name="untilDate" autoSelectToday={true} />
                  </Form.Item>
                </div>
              )}
              <div className="mt20">
                <Radio value="all">Publish All</Radio>
              </div>
            </Radio.Group>
          </Form.Item>

          {/* Action Buttons */}
          <div className="d-flex text-center">
            <ButtonComponent
              text={"Cancel"}
              padding="14px 45px"
              gradient={false}
              onClick={handleCancelClick}
            />
            <ButtonComponent
              text={"Publish"}
              padding="14px 45px"
              type="submit"
              onClick={handlePublishClick}
              disabled={publishType === "until-date"}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PublishShift;
