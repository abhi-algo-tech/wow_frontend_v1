import React from "react";
import { Card, Checkbox, Avatar, Space } from "antd";

function ActorBigCard({
  actor,
  selectedActors,
  handleCheckboxChange,
  renderFlag,
}) {
  return (
    <Card
      className={`text-center position-relative classroom-student-profile-card ${
        actor.status === "absent" ? "opacity-50" : ""
      }`}
    >
      <Checkbox
        className="position-absolute top-0 start-0 mt-2 ms-2"
        checked={selectedActors.includes(actor.id)}
        onChange={() => handleCheckboxChange(actor.id)}
      />
      <div className="position-relative d-inline-block mb-2">
        <Avatar src={actor.avatar} size={48} />
        <div
          className={`position-absolute top-0 end-0 translate-middle rounded-circle ${
            actor.status === "present" ? "active-green" : ""
          }`}
          style={
            actor.status === "present"
              ? {
                  width: "12px",
                  height: "12px",
                  margin: "7px -5px",
                  padding: "5px",
                  border: "solid 3px #fff",
                }
              : {}
          }
        />
      </div>
      <div className="fw-medium">{actor.name}</div>
      {actor?.designation && (
        <div className="staff-designation-label">{actor.designation}</div>
      )}
      <Space size={4} className="d-flex justify-content-center mt-2">
        {actor.flags.map((flag, index) => (
          <img
            key={index}
            className="student-activity-type-icons"
            src={`/classroom_icons/png/${flag}.png`}
            alt={flag}
          />
        ))}
      </Space>
    </Card>
  );
}

export default ActorBigCard;
