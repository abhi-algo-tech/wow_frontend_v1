import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { WiDayThunderstorm } from "react-icons/wi";
const ProfileImageUpload = () => {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <div>
      <ImgCrop rotationSlider>
        <Upload
          // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-circle"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          className="classroom-profile-icon"
        >
          {fileList.length < 1 && "+ "}
        </Upload>
      </ImgCrop>
    </div>
  );
};
export default ProfileImageUpload;
