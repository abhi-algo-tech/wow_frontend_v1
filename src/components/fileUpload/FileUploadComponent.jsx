import React, { useState } from "react";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import "./FileUploadStyles.css";
import { CustomMessage } from "../../utils/CustomMessage";

const FileUploadComponent = ({ defaultBlob, onFileBlob }) => {
  const [file, setFile] = useState(defaultBlob); // Store the file object

  const handleFile = (file) => {
    try {
      const blob = new Blob([file], { type: file.type });
      setFile(file); // Save file object for rendering and future operations
      onFileBlob(blob); // Notify parent component with the blob
      CustomMessage.success(`${file.name} is added`);
    } catch (error) {
      CustomMessage.error(`Failed to process ${file.name}`);
    }
    return false; // Prevent default upload behavior
  };

  const handleDelete = () => {
    setFile(null); // Clear the file
    onFileBlob(null); // Notify parent component
    CustomMessage.info("File removed successfully");
  };

  const uploadProps = {
    beforeUpload: handleFile, // Handle file before upload
    showUploadList: false, // Hide default Ant Design upload list
  };

  return (
    <div className="file-upload-container">
      {!file && (
        <Upload {...uploadProps}>
          <Button className="custom-upload-button">
            Select File <UploadOutlined />
          </Button>
        </Upload>
      )}
      {file && (
        <div className="upload-tab">
          <span className="file-name">{file.name}</span>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={handleDelete}
            className="delete-button"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
