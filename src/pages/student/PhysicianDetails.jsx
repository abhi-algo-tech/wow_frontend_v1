import React from "react";
import TableComponent from "../../components/TableComponent";
import { Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";

const columns = [
  {
    title: "Physician Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: (
                <div
                // onClick={() => handleEdit(record)}
                >
                  Edit Physician Details
                </div>
              ),
            },
            {
              key: "delete",
              label: (
                <div
                // onClick={() => handleDelete(record)}
                >
                  Delete Physician Details
                </div>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <EllipsisOutlined />
      </Dropdown>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Sanjay Verma",
    email: "testa5011@gmail.com",
    phone: "(986) 027-1627",
    type: "-",
    address: "Nashua, New Hampshire",
  },
  {
    key: "2",
    name: "Marry Dsouza",
    email: "testa5011@gmail.com",
    phone: "(986) 027-1627",
    type: "-",
    address: "Nashua, New Hampshire",
  },
];

function PhysicianDetails() {
  return (
    <div className="padding16">
      <div className=" text-end mb-4 ">
        <ButtonComponent text="Add Physician" buttonActionType="create" />
      </div>
      <TableComponent columns={columns} dataSource={data} />
    </div>
  );
}

export default PhysicianDetails;
