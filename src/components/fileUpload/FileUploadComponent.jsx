import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import "./FileUploadStyles.css";
import { CustomMessage } from "../../utils/CustomMessage";

const FileUploadComponent = ({ defaultBlob, fileName, onFileBlob }) => {
  const [file, setFile] = useState(defaultBlob); // Local file state

  useEffect(() => {
    if (defaultBlob) {
      // Handle dynamic blob -> file conversion if `defaultBlob` exists
      const fileFromBlob = new File([defaultBlob], fileName || "defaultFile", {
        type: defaultBlob.type,
      });
      setFile(fileFromBlob);
    }
  }, [defaultBlob, fileName]);

  const handleFile = async (file) => {
    try {
      const blobToFile = new File([file], file.name, { type: file.type }); // Convert blob explicitly
      setFile(blobToFile);
      onFileBlob(blobToFile); // Notify parent of change
      CustomMessage.success(`${file.name} is added`);
    } catch (error) {
      CustomMessage.error(`Failed to process ${file.name}`);
    }
    return false; // Prevent upload behavior
  };

  const handleDelete = () => {
    setFile(null);
    onFileBlob(null);
    CustomMessage.info("File removed successfully");
  };

  const uploadProps = {
    beforeUpload: handleFile,
    showUploadList: false,
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
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            className="delete-button"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
