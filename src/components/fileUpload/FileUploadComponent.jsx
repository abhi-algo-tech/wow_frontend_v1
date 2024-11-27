import React, { useState } from "react";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import "./FileUploadStyles.css";
import { CustomMessage } from "../../utils/CustomMessage";

const FileUploadComponent = ({ onFileBlob }) => {
  const [fileName, setFileName] = useState(""); // State to store the file name

  const handleFile = async (file) => {
    try {
      const blob = new Blob([file], { type: file.type });
      setFileName(file.name); // Update the state with the file name
      onFileBlob(blob); // Return the Blob to the parent component
      CustomMessage.success(`${file.name} is added`);
    } catch (error) {
      console.error("Error creating Blob:", error);
      CustomMessage.error(`Failed to process ${file.name}`);
    }
    return false; // Prevent default upload behavior
  };

  const handleDelete = () => {
    setFileName(""); // Clear the file name
    onFileBlob(null); // Reset the Blob in the parent component
    CustomMessage.info("File removed successfully");
  };

  const uploadProps = {
    beforeUpload: handleFile, // Process file before Ant Design handles it
    showUploadList: false, // Hide the default upload list
  };

  return (
    <div className="file-upload-container">
      {!fileName && (
        <Upload {...uploadProps}>
          <Button className="custom-upload-button">
            Select File <UploadOutlined />
          </Button>
        </Upload>
      )}
      {fileName && (
        <div className="upload-tab">
          <span className="file-name">{fileName}</span>
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
