import React, { useState } from "react";
import { Tabs, Checkbox, Avatar, Input, Button, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";

export default function ClassroomNotes() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: "Natasha White",
        avatar: "/wow_images/person1.png",
      },
      text: "Erica's Bag is in the office... Next teacher please take it and give it to the parents",
      time: "17th Nov, 2024 | 04:45 PM",
    },
    {
      id: 2,
      user: {
        name: "Eddie Barnes",
        avatar: "/wow_images/staff.png",
      },
      text: "Children are sleeping now. Please feed them once they wake up",
      time: "17th Nov, 2024 | 04:45 PM",
    },
    {
      id: 3,
      user: {
        name: "Andrew Barnes",
        avatar: "/wow_images/Andrew-Fenwick.png",
      },
      text: "Children are sleeping now. Please feed them once they wake up",
      time: "17th Nov, 2024 | 04:45 PM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const users = [
    { name: "Natasha White", avatar: "/wow_images/person1.png" },
    { name: "Eddie Barnes", avatar: "/wow_images/staff.png" },
    { name: "Andrew", avatar: "/wow_images/Andrew-Fenwick.png" },
  ];

  return (
    <div className="padding16">
      <div className="d-flex align-items-center justify-content-between">
        <div style={{ marginBottom: "16px" }}>
          <Checkbox>
            <span className="label-14-500">Show Unread Only</span>
          </Checkbox>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {users.map((user, index) => (
            <div key={index} className="notes-main-card">
              <div className="d-flex align-items-center gap9">
                <div style={{ position: "relative" }}>
                  <Avatar src={user.avatar} size={24} />
                  <div
                    style={{
                      position: "absolute",
                      top: -3,
                      right: -1,
                      width: 10,
                      height: 10,
                      backgroundColor: "#52c41a",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </div>
                <span className="label-14-500">{user.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="message-container custom-message-bar">
        {messages.map((message) => (
          <>
            <div key={message.id} className="message-card">
              <div className="d-flex  gap9 mb10">
                <div style={{ position: "relative" }}>
                  <Avatar src={message.user.avatar} size={24} />
                  <div
                    style={{
                      position: "absolute",
                      top: -3,
                      right: -1,
                      width: 10,
                      height: 10,
                      backgroundColor: "#52c41a",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </div>
                <div>
                  <div className="label-11-400 mb9">{message.user.name}</div>
                  <div className="notes-message-outer-layer label-14-500 mb7">
                    {message.text}
                  </div>

                  <div className="label-9-500">{message.time}</div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <Input
          placeholder="Type your message here..."
          className="notes-message-input-box"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          suffix={<Avatar src={"/wow_icons/png/chat-add.png"} size={24} />}
          //   suffix={<SendOutlined style={{ color: "#666", cursor: "pointer" }} />}
        />
        <ButtonComponent
          text="Send"
          borderRadius="32px"
          padding="4px 20px"
          fontWeight="light"
        />
      </div>
    </div>
  );
}
