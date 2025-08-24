import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  InputNumber,
  Switch,
  Button,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;

    .ant-modal-header {
      border-bottom: none;
      padding: 24px 24px 0;
    }

    .ant-modal-body {
      padding: 24px;
    }
  }
`;

const StyledForm = styled(Form)`
  .ant-form-item-label {
    font-size: 14px;
    color: #6b7280;

    label.ant-form-item-required::before {
      display: none;
    }

    label.ant-form-item-required::after {
      display: inline-block;
      color: #ff4d4f;
      content: "*";
      margin-left: 4px;
    }
  }

  .ant-input,
  .ant-input-number {
    border-radius: 8px;
    border-color: #e5e7eb;

    &:hover,
    &:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }
  }

  .ant-upload.ant-upload-select {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    border: 2px dashed #e5e7eb;

    &:hover {
      border-color: #6366f1;
    }
  }

  .ant-switch {
    background-color: #e5e7eb;

    &.ant-switch-checked {
      background-color: #6366f1;
    }
  }
`;

const AgeInputGroup = styled.div`
  display: flex;
  gap: 12px;

  .ant-form-item {
    margin-bottom: 0;
    flex: 1;
  }
`;

function Dashboard({ open, onClose, onAdd }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onAdd(values);
      form.resetFields();
      onClose();
    } finally {
      setLoading(false);
    }
  };
  return (
    <StyledModal
      title="Create Classroom"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16} align="middle">
          <Col span={18}>
            <Form.Item
              label="Classroom Name"
              name="name"
              required
              rules={[
                { required: true, message: "Please enter classroom name" },
              ]}
            >
              <Input placeholder="Classroom Name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Profile Picture" name="profilePicture">
              <Upload listType="picture-card" showUploadList={false}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Capacity"
          name="capacity"
          required
          rules={[{ required: true, message: "Please enter capacity" }]}
        >
          <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Student : Teacher Ratio" name="ratio">
          <InputNumber min={0} placeholder="4" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Min Age">
          <AgeInputGroup>
            <Form.Item name={["minAge", "year"]}>
              <InputNumber
                min={0}
                placeholder="Year"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item name={["minAge", "month"]}>
              <InputNumber
                min={0}
                max={11}
                placeholder="Month"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </AgeInputGroup>
        </Form.Item>

        <Form.Item label="Max Age">
          <AgeInputGroup>
            <Form.Item name={["maxAge", "year"]}>
              <InputNumber
                min={0}
                placeholder="Year"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item name={["maxAge", "month"]}>
              <InputNumber
                min={0}
                max={11}
                placeholder="Month"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </AgeInputGroup>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          initialValue={true}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span>Active</span>
            <Switch defaultChecked />
            <span>Inactive</span>
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "20px",
              backgroundColor: "#6366F1",
              border: "none",
            }}
          >
            Add
          </Button>
        </Form.Item>
      </StyledForm>
    </StyledModal>
  );
}

export default Dashboard;
