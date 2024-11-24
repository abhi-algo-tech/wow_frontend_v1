// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload } from "antd";
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// const ProfileImageComponent = ({
//   fileList: initialFileList = [],
//   onChange,
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//    const [fileList, setFileList] = useState(initialFileList);
//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//   };
// const handleChange = ({ fileList: newFileList }) => {
//   setFileList(newFileList);
//   if (onChange) onChange(newFileList);
// };

//  const uploadButton = (
//   <button
//   style={{
//     border: 0,
//     background: "none",
//     cursor: "pointer",
//   }}
//   type="button"
// >
//   <PlusOutlined />
// </button>
// );
//   return (
//     <>
//       <Upload
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         listType="picture-circle"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 1 ? null : uploadButton}
//       </Upload>
//       {previewImage && (
//         <Image
//           wrapperStyle={{
//             display: "none",
//           }}
//           preview={{
//             visible: previewOpen,
//             onVisibleChange: (visible) => setPreviewOpen(visible),
//             afterOpenChange: (visible) => !visible && setPreviewImage(""),
//           }}
//           src={previewImage}
//         />
//       )}
//     </>
//   );
// };
// export default ProfileImageComponent;

// // import React, { useState } from "react";
// // import { PlusOutlined } from "@ant-design/icons";
// // import { Image, Upload, Button } from "antd";

// // const getBase64 = (file) =>
// //   new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.readAsDataURL(file);
// //     reader.onload = () => resolve(reader.result);
// //     reader.onerror = (error) => reject(error);
// //   });

// // const ProfileImageComponent = ({
// //   fileList: initialFileList = [],
// //   onChange,
// //   action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", // Default action URL
// // }) => {
// //   const [previewOpen, setPreviewOpen] = useState(false);
// //   const [previewImage, setPreviewImage] = useState("");
// //   const [fileList, setFileList] = useState(initialFileList);

// //   const handlePreview = async (file) => {
// //     if (!file.url && !file.preview) {
// //       file.preview = await getBase64(file.originFileObj);
// //     }
// //     setPreviewImage(file.url || file.preview);
// //     setPreviewOpen(true);
// //   };

// //   const handleChange = ({ fileList: newFileList }) => {
// //     setFileList(newFileList);
// //     if (onChange) onChange(newFileList);
// //   };

// //   const handleClear = () => {
// //     setFileList([]);
// //     if (onChange) onChange([]);
// //   };

// //   const uploadButton = (
// //     <button
// //       style={{
// //         border: 0,
// //         background: "none",
// //         cursor: "pointer",
// //       }}
// //       type="button"
// //     >
// //       <PlusOutlined />
// //     </button>
// //   );

// //   return (
// //     <>
// //       <Upload
// //         action={action}
// //         listType="picture-circle"
// //         fileList={fileList}
// //         onPreview={handlePreview}
// //         onChange={handleChange}
// //         beforeUpload={(file) => {
// //           const isImage = file.type.startsWith("image/");
// //           if (!isImage) {
// //             alert("You can only upload image files!");
// //           }
// //           const isSmallEnough = file.size / 1024 / 1024 < 2; // Less than 2MB
// //           if (!isSmallEnough) {
// //             alert("Image must be smaller than 2MB!");
// //           }
// //           return isImage && isSmallEnough;
// //         }}
// //       >
// //         {fileList.length >= 1 ? null : uploadButton}
// //       </Upload>
// //       {fileList.length > 0 && (
// //         <div style={{ marginTop: "10px", textAlign: "center" }}>
// //           <Button type="link" danger onClick={handleClear}>
// //             Clear Image
// //           </Button>
// //         </div>
// //       )}
// //       {previewImage && (
// //         <Image
// //           wrapperStyle={{
// //             display: "none",
// //           }}
// //           preview={{
// //             visible: previewOpen,
// //             onVisibleChange: (visible) => setPreviewOpen(visible),
// //             afterOpenChange: (visible) => !visible && setPreviewImage(""),
// //           }}
// //           src={previewImage}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default ProfileImageComponent;

import React, { useState } from "react";
import { Image, Upload } from "antd";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

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
}) => {
  const [fileList, setFileList] = useState(initialFileList);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

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
            {/* <div style={{ marginTop: 8 }}>Upload</div> */}
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
