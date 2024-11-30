import { Col, Input, Row, Select } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import ActorCard from "../../components/ActorCard";
import { useState, useEffect } from "react";
import { generateClassroomDemoData } from "../../services/common";

function Transfer({ setCancel }) {
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Generate the demo data only once when the component is mounted
    const formattedClassroomData = generateClassroomDemoData(10);

    setData(formattedClassroomData);
    setFilteredData(formattedClassroomData); // Initially show all classrooms
  }, []);

  const handleCancelClick = () => {
    setCancel(false);
  };

  // Handle classroom selection
  const onClassroomSelect = (value) => {
    setSelectedClassroom(value);

    if (value === "all") {
      setFilteredData(data); // Show all data
    } else {
      // Filter the data by the selected classroom
      const filtered = data.filter((item) => item.name === value);
      setFilteredData(filtered);
    }
  };

  // Remove duplicate classrooms based on the `name`
  const uniqueClassrooms = [
    { value: "all", label: "All Classrooms" },
    ...[
      ...new Set(data.map((item) => item.name)), // Ensure uniqueness based on name
    ].map((name) => ({
      value: name,
      label: name,
    })),
  ];

  return (
    <div className="card modal-card-padding">
      <span className="modal-card-label-name">Transfer</span>
      <ActorCard />
      <Row>
        <Col className="mr16">
          <label className="d-block  classroom-label">Current Classroom</label>
          <Input className="modal-tansfer-input" placeholder="1-Blue-D" />
        </Col>
        <Col>
          <label className="d-block  classroom-label">
            Transfer to Classroom
          </label>
          <Select
            value={selectedClassroom}
            onChange={onClassroomSelect}
            className="modal-tansfer-dropdown"
            placeholder="Select Classroom"
            options={uniqueClassrooms} // Use uniqueClassrooms for dropdown options
          />
        </Col>
      </Row>
      <div className="text-center">
        <ButtonComponent
          text="Cancel"
          padding={"16px 62.6px"}
          margin="0 16px 0 0"
          onClick={handleCancelClick}
          gradient={false}
        />

        <ButtonComponent
          text="Submit"
          gradient={true}
          padding={"16px 62.6px"}
        />
      </div>
    </div>
  );
}

export default Transfer;
