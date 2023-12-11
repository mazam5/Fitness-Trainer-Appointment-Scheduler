import React, { useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import ResponsiveAppBar from "./Appbar";
import { Container } from "@mui/material";

require("react-big-calendar/lib/css/react-big-calendar.css");

const localizer = momentLocalizer(moment);

export default function ShowCalendar() {
  const { appointments } = useContext(AppContext);

  // Transform the appointments data into events for the Calendar component
  const events = appointments.flatMap((appointment) =>
    appointment.dateTime.map((dateTime) => ({
      title: `${appointment.firstName} ${appointment.lastName}`,
      start: new Date(`${dateTime.date}T${dateTime.time}:00`),
      end: new Date(`${dateTime.date}T${dateTime.time}:00`),
      location: appointment.location,
    })),
  );

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="xl" sx={{ my: "10px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          style={{ height: "80vh", width: "100%" }}
        />
      </Container>
    </>
  );
}
