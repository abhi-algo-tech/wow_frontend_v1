import React, { useEffect, useState } from "react";
import { Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";
// Custom styles for the calendar elements
const calendarStyles = {
  container: {
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
  },
  head: {
    display: "none",
  },
  body: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
};

function NewOverviewTable() {
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState();
  // const initialEvents = [
  //   {
  //     from: new Date("2025-01-06T01:30:00.786Z"),
  //     to: new Date("2025-01-06T23:30:00.786Z"),
  //     name: "Meeting with Team",
  //     calendar: {
  //       name: "Work Calendar",
  //       enabled: true,
  //     },
  //     style: { backgroundColor: "#DFEAFE", color: "#465CB3" },
  //   },
  //   {
  //     from: new Date("2025-01-04T23:30:00.786Z"),
  //     to: new Date("2025-01-05T01:45:00.786Z"),
  //     name: "Client Call",
  //     calendar: {
  //       name: "Work Calendar",
  //       enabled: true,
  //     },
  //     style: { backgroundColor: "#F5F5DC", color: "#424242" },
  //   },
  // ];

  const handleAddEvent = (evt) => {
    return false; // Prevent event creation
  };

  return (
    <div className="custom-scheduler mt10">
      <Scheduler
        events={events}
        selected={selected}
        setSelected={setSelected}
        view="week" // Week view
        onRequestAdd={handleAddEvent}
        style={calendarStyles} // Passing the custom styles to the calendar
      />
    </div>
  );
}

export default NewOverviewTable;
