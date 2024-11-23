import { Table, Select } from "antd";
import { styled } from "styled-components";

// Styled wrapper for custom table styles
// const StyledTableWrapper = styled.div`
//   .ant-table-thead > tr > th {
//     background: white;
//     border-bottom: 1px solid #2c63e233;
//     &.students-column {
//       background: #2c63e219 !important;
//     }
//     &.staff-column {
//       background: #cbf6ff66 !important;
//     }
//     &.ratio-column {
//       background: #ffe5cb66 !important;
//     }
//     &.name-column,
//     .capcity-column,
//     .FTE-column {
//       background: #f9f5fab3 !important;
//     }
//   }
//   .select-classroom .ant-table-cell {
//     text-align: start;
//   }
//   .select-classroom {
//     width: 185px;
//     height: 40px;
//     border-radius: 8px;
//     background-color: rgba(177, 175, 233, 0.1);
//     left: 0;
//     text-align: start;
//     z-index: 1;
//   }

//   // .ant-table-container {
//   //   margin-top: -48px;
//   // }
// `;

export default function TableOverview() {
  const columns = [
    {
      title: (
        <Select
          defaultValue="all"
          options={[
            { value: "all", label: "Select Classroom" },
            { value: "1", label: "Classroom 1" },
            { value: "2", label: "Classroom 2" },
          ]}
          className="select-classroom !text-start"
        />
      ),
      dataIndex: "name",
      key: "name",
      width: 200,
      children: [
        {
          title: "Name",
          dataIndex: "active",
          key: "active",
          className: "name-column",
        },
        {
          title: "Capacity",
          dataIndex: "capacity",
          key: "capacity",
          className: "name-column",
        },
        {
          title: "FTE",
          dataIndex: "fte",
          key: "fte",
          className: "name-column",
        },
      ],
    },

    {
      title: "Students",
      className: "students-column",
      children: [
        {
          title: "Active",
          dataIndex: "active",
          key: "active",
          className: "students-column",
        },
        {
          title: "Upcoming",
          dataIndex: "upcoming",
          key: "upcoming",
          className: "students-column",
        },
        {
          title: "Present",
          dataIndex: "present",
          key: "present",
          className: "students-column",
        },
      ],
    },
    {
      title: "Staff",
      className: "staff-column",
      children: [
        {
          title: "Assigned",
          dataIndex: "assigned",
          key: "assigned",
          className: "staff-column",
        },
        {
          title: "Present",
          dataIndex: "staffPresent",
          key: "staffPresent",
          className: "staff-column",
        },
      ],
    },
    {
      title: "Ratio",
      className: "ratio-column",
      children: [
        {
          title: "Current",
          dataIndex: "current",
          key: "current",
          className: "ratio-column",
        },
      ],
    },
    {
      title: "",
      key: "action",
      children: [
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ],
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      name: "1-Blue-D",
      capacity: 24,
      fte: "82%",
      active: 20,
      upcoming: 4,
      present: 19,
      assigned: 3,
      staffPresent: 2,
      current: "Warning",
    },
    // Add more data as needed
  ];

  return (
    // <StyledTableWrapper>
    <div className="classroom-table">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: true }}
      />
    </div>
    // </StyledTableWrapper>
  );
}
