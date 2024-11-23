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


import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfileImageComponent = ({ fileList: initialFileList = [], onChange }) => {
  const [fileList, setFileList] = useState(initialFileList); // fileList is initialized as an array
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    // Set the preview image from the initial fileList if available
    if (initialFileList.length > 0 && initialFileList[0]?.url) {
      setPreviewImage(initialFileList[0].url);
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
    setFileList(newFileList); // Always update state with an array
    if (onChange) {
      onChange(newFileList); // Pass the updated array to the parent
    }
  };

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList} // Ensure fileList is always an array
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent file upload
      >
        {fileList.length < 1 && <PlusOutlined />}
      </Upload>
      {previewImage && (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: setPreviewOpen,
          }}
          src={previewImage} // Preview the selected or initial image
        />
      )}
    </>
  );
};

export default ProfileImageComponent;
