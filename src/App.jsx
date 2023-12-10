import { useState } from "react";
import AllAppointments from "./components/Appointments";
import ResponsiveAppBar from "./components/Appbar";
import { AppContext } from "./context/AppContext";

function App() {
  const [appointments, setAppointments] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      location: "San Diego, USA",
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
      firstName: "Ravi",
      lastName: "Kumar",
      location: "Mumbai, India",
      dateTime: [
        {
          date: "2023-12-25",
          time: "12:00",
        },
      ],
    },
    {
      firstName: "David",
      lastName: "Smith",
      location: "London, UK",
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
      <AllAppointments />
    </AppContext.Provider>
  );
}

export default App;
