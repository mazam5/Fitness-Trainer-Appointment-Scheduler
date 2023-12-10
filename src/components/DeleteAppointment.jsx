import React, { useContext } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { AppointmentContext } from "../context/AppContext";
import { Warning } from "@mui/icons-material";

export default function DeleteAppointment(index1) {
  const { handleDelDialog, handleDelete } = useContext(AppointmentContext);

  return (
    <div>
      <DialogTitle>{"Delete Appointment?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Warning color="warning" />
          Are you sure you want to delete this appointment?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleDelDialog()}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            handleDelete(index1);
            handleDelDialog();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </div>
  );
}
