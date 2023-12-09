import { useState } from "react";
import AllAppointments from "./components/Appointments";
import ResponsiveAppBar from "./components/Appbar";
import Content from "./components/Content";
import { AppContext } from "./context/AppContext";

function App() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      location: "Falaknuma, Hyderabad",
      dateTime: [
        {
          date: "2023-12-15",
          time: "12:00",
        },
        {
          date: "2023-12-19",
          time: "10:30",
        },
      ],
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      location: "Banjara Hills, Hyderabad",
      dateTime: [
        {
          date: "2023-12-25",
          time: "12:00",
        },
      ],
    },
    {
      id: 3,
      firstName: "Mohammed",
      lastName: "Azam",
      location: "Falaknuma, Hyderabad",
      dateTime: [
        {
          date: "2023-12-15",
          time: "12:00",
        },
        {
          date: "2023-12-19",
          time: "10:30",
        },
        {
          date: "2023-12-30",
          time: "08:30",
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider value={{ appointments, setAppointments }}>
      <ResponsiveAppBar />
      <Content />
      <AllAppointments />
    </AppContext.Provider>
  );
}

export default App;
