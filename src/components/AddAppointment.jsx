import {
  Box,
  FormControl,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../context/AppContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function AddAppointment() {
  const { appointments, setAppointments } = useContext(AppContext);
  const [appointment, setAppointment] = useState({
    id: "",
    firstName: "",
    lastName: "",
    location: "",
    dateTime: [
      {
        date: "",
        time: "",
      },
    ],
  });
  const [open, setOpen] = useState(false);
  const addAppointment = () => {
    setAppointments([...appointments, appointment]);
    setAppointment({
      id: "",
      firstName: "",
      lastName: "",
      location: "",
      dateTime: [
        {
          date: "",
          time: "",
        },
      ],
    });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Box>
      <Typography variant="h4" color="white">
        Add Appointment
      </Typography>
      <FormControl>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          required
          value={appointment.firstName}
          onChange={(e) =>
            setAppointment({ ...appointment, firstName: e.target.value })
          }
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          required
          value={appointment.lastName}
          onChange={(e) =>
            setAppointment({ ...appointment, lastName: e.target.value })
          }
        />
        <TextField
          id="location"
          label="Location"
          variant="outlined"
          required
          value={appointment.location}
          onChange={(e) =>
            setAppointment({ ...appointment, location: e.target.value })
          }
        />
        <Container sx={{ display: "flex" }}>
          <TextField
            id="date"
            type="date"
            variant="outlined"
            value={appointment.dateTime[0].date}
            required
            onChange={(e) =>
              setAppointment({
                ...appointment,
                dateTime: [
                  { ...appointment.dateTime[0], date: e.target.value },
                ],
              })
            }
          />
          <TextField
            id="time"
            type="time"
            variant="outlined"
            required
            value={appointment.dateTime[0].time}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                dateTime: [
                  { ...appointment.dateTime[0], time: e.target.value },
                ],
              })
            }
          />
        </Container>
        <Button variant="contained" onClick={addAppointment}>
          <AddIcon />
          Appointment
        </Button>
      </FormControl>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
        message="Appointment Added"
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Appointment Added
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default AddAppointment;
