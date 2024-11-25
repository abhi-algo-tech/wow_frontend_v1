import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Button,
  Tabs,
  Space,
  Dropdown,
  Menu,
} from "antd";
import {
  EllipsisOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import AddPickup from "./AddPickup";

const { Text } = Typography;

function Pickup() {
  const [isCreatePickupModalOpen, setCreatePickupModalOpen] = useState(false);
  const handleMenuClick = ({ key }) => {
    if (key === "edit") {
      console.log("Edit action triggered");
      // Add your edit logic here
    } else if (key === "delete") {
      console.log("Delete action triggered");
      // Add your delete logic here
    }
  };

  const menu = {
    items: [
      {
        key: "edit",
        label: <span className="student-table-action-label">Edit</span>,
      },
      {
        key: "delete",
        label: <span className="student-table-action-label">Delete</span>,
      },
    ],
    onClick: handleMenuClick,
  };
  return (
    <>
      <div className="padding16">
        <div className=" text-end mb-4 ">
          <ButtonComponent
            text="Add Pickup"
            gradient={true}
            buttonActionType="create"
            onClick={() => setCreatePickupModalOpen(true)}
          />
        </div>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Space>
                  <Avatar src="/wow_images/Andrew-Fenwick.png" size={52} />
                  <Text className="student-about-tab-label-value">
                    Sanjal Fenwick
                  </Text>
                </Space>
                <Dropdown menu={menu} trigger={["click"]}>
                  <EllipsisOutlined className="pointer" />
                </Dropdown>
              </div>
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Row>
                  <Col span={8}>
                    <Text className="student-about-tab-label">Relation</Text>
                  </Col>
                  <Col span={16} className="text-end">
                    <Text className="student-about-tab-label-value">
                      Mother
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text className="student-about-tab-label">Email</Text>
                  </Col>
                  <Col span={16} className="text-end">
                    <Text className="student-about-tab-label-value">
                      testa5011@gmail.com
                    </Text>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Space>
                  <Avatar src="/wow_images/Emma-Fenwick.png" size={52} />
                  <Text className="student-about-tab-label-value">
                    Shane Fenwick
                  </Text>
                </Space>
                <EllipsisOutlined />
              </div>
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Row>
                  <Col span={8}>
                    <Text className="student-about-tab-label">Relation</Text>
                  </Col>
                  <Col span={16} className="text-end">
                    <Text className="student-about-tab-label-value">
                      Father
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text className="student-about-tab-label">Email</Text>
                  </Col>
                  <Col span={16} className="text-end">
                    <Text className="student-about-tab-label-value">
                      testa5011@gmail.com
                    </Text>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
      {isCreatePickupModalOpen && (
        <CommonModalComponent
          open={isCreatePickupModalOpen}
          setOpen={setCreatePickupModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          <AddPickup
            CardTitle={"Add Pickup"}
            classroomId={null}
            closeModal={() => setCreatePickupModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default Pickup;
