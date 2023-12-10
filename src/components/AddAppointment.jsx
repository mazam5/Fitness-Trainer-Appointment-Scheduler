import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import React, { useContext } from "react";
// import AddIcon from "@mui/icons-material/Add";
import { AppointmentContext } from "../context/AppContext";
// import MuiAlert from "@mui/material/Alert";

function AddAppointment() {
  const {
    addAppointment,
    setAddAppointment,
    dTAdd,
    setDTAdd,
    handleAdd,
    handleAddDialog,
  } = useContext(AppointmentContext);
  return (
    <>
      <DialogTitle>{"Add Appointment"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          value={addAppointment.firstName}
          onChange={(e) =>
            setAddAppointment({
              ...addAppointment,
              firstName: e.target.value,
            })
          }
          label="First Name"
          type="text"
          variant="filled"
        />
        <TextField
          required
          margin="dense"
          label="Last Name"
          value={addAppointment.lastName}
          onChange={(e) =>
            setAddAppointment({
              ...addAppointment,
              lastName: e.target.value,
            })
          }
          type="text"
          variant="filled"
        />
        <TextField
          required
          margin="dense"
          label="Location"
          value={addAppointment.location}
          onChange={(e) =>
            setAddAppointment({
              ...addAppointment,
              location: e.target.value,
            })
          }
          type="text"
          variant="filled"
        />
        <br />
        <TextField
          required
          margin="dense"
          type="date"
          variant="outlined"
          value={addAppointment.dateTime.date}
          onChange={(e) => {
            setDTAdd({
              ...dTAdd,
              date: e.target.value,
            });
          }}
        />
        <TextField
          required
          margin="dense"
          type="time"
          variant="outlined"
          value={dTAdd.time}
          onChange={(e) =>
            setDTAdd({
              ...dTAdd,
              time: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddDialog} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained" color="success">
          Add Appointment
        </Button>
      </DialogActions>
    </>
  );
}

export default AddAppointment;
