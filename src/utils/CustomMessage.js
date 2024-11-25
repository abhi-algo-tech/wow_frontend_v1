import { message } from "antd";

export const CustomMessage = {
  success: (content) => {
    message.success({
      content,
      style: {
        marginTop: "8vh",
        textAlign: "right",
      },
    });
  },
  error: (content) => {
    message.error({
      content,
      style: {
        marginTop: "8vh",
        textAlign: "right",
      },
    });
  },
  info: (content) => {
    message.info({
      content,
      style: {
        marginTop: "8vh",
        textAlign: "right",
      },
    });
  },
};
