import React, { useState, useEffect } from "react";
import { Image, Upload } from "antd";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfileImageComponent = ({ fileList: initialFileList = [], onChange }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // Initialize fileList with proper structure
  useEffect(() => {
    if (initialFileList[0]?.url) {
      setFileList([
        {
          uid: "-1", // Unique identifier
          name: "profile-picture", // You can replace this with any file name
          status: "done", // 'done' indicates the file is already uploaded
          url: initialFileList[0].url, // URL from initialFileList
        },
      ]);
    }
  }, [initialFileList]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onChange) onChange(newFileList);
  };

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Disable automatic upload
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
          previewIcon: (
            <EyeOutlined
              style={{
                color: "blue",
                fontSize: "16px",
                cursor: "pointer",
              }}
            />
          ),
          removeIcon: (
            <DeleteOutlined
              style={{
                color: "red",
                fontSize: "16px",
                cursor: "pointer",
              }}
            />
          ),
        }}
      >
        {fileList.length < 1 && (
          <div>
            <PlusOutlined style={{ fontSize: "24px" }} />
          </div>
        )}
      </Upload>
      {previewImage && (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: setPreviewOpen,
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ProfileImageComponent;
