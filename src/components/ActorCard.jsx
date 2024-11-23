import { Avatar, Col, Row } from "antd";
import React from "react";

function ActorCard() {
  const actors = [
    {
      name: "Ajay",
      image: "/classroom_icons/png/Ajay.png",
      deleteImage: "/classroom_icons/png/delete.png",
    },
    {
      name: "Lex",
      image: "/classroom_icons/png/Lex.png",
      deleteImage: "/classroom_icons/png/delete-1.png",
    },
    {
      name: "Lisa",
      image: "/classroom_icons/png/Lisa.png",
      deleteImage: "/classroom_icons/png/delete.png",
    },
  ];
  return (
    <Row gutter={9}>
      {actors.map((actor, index) => (
        <Col key={index} span={8}>
          <Row className="modal-card-actor-details-border" align="middle">
            <Col>
              <Avatar src={actor.image} size={24} />
              <span className="actor-label" style={{ marginLeft: "8px" }}>
                {actor.name}
              </span>
            </Col>
            <Col>
              <Avatar
                className="modal-card-action-icon"
                src={actor.deleteImage}
              />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}

export default ActorCard;
