import React, { useState, useEffect } from "react";
import { Image, Upload } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfileImageComponent = ({
  fileList: initialFileList = [],
  onChange,
  setIsProfile,
}) => {
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
    setPreviewOpen(false);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onChange) onChange(newFileList);
  };

  const handleRemove = (file) => {
    setIsProfile(true);
  };

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={() => false} // Disable automatic upload
        showUploadList={{
          showPreviewIcon: false, // Disable the preview icon
          showRemoveIcon: true,
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
