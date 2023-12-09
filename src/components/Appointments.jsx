import {
  Add,
  AddCircle,
  Close,
  Delete,
  Edit,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function AllAppointments() {
  // context api data
  const { appointments, setAppointments } = useContext(AppContext);
  // states
  const [openDialog, setOpenDialog] = useState(false);
  const [editView, setEditView] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [addAppointment, setAddAppointment] = useState({
    firstName: "",
    lastName: "",
    location: "",
    dateTime: [],
  });

  const [editField, setEditField] = useState({
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

  const [deletedAppointments, setDeletedAppointments] = useState({});

  const handleCancel = () => {
    setEditView(false);
    setEditIndex(null);
  };

  const handleSave = () => {
    const updatedAppointments = [...appointments];
    updatedAppointments[editIndex] = {
      ...updatedAppointments[editIndex],
      firstName: editField.firstName,
      lastName: editField.lastName,
      location: editField.location,
      dateTime: editField.dateTime,
    };
    setAppointments(updatedAppointments);
    setEditView(false);
    setEditIndex(null);
    setEditSnackOpen(true);
  };

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleDelete = () => {
    setDeletedAppointments(appointments[deleteIndex]);
    setAppointments(appointments.filter((_, index1) => index1 !== deleteIndex));
    handleDialog();
    setDelSnackOpen(true);
  };

  const handleEdit = (index1) => {
    setEditIndex(index1);
    setEditField(appointments[index1]);
    setEditView(true);
    // handleMenu();
  };

  // delete snackbar
  const [delSnackOpen, setDelSnackOpen] = useState(false);
  const [editSnackOpen, setEditSnackOpen] = useState(false);
  const [addSnackOpen, setAddSnackOpen] = useState(false);

  const handleDeleteSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDelSnackOpen(false);
    setDeletedAppointments({});
  };

  const handleEditSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEditSnackOpen(false);
  };
  const handleAddSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddSnackOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          setAppointments([...appointments, deletedAppointments]);
          setDeletedAppointments({});
          setDelSnackOpen(false);
        }}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleDeleteSnackClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // Add Appointment

  const [dTAdd, setDTAdd] = useState({
    date: "",
    time: "",
  });

  const handleAddDialog = () => {
    setOpenForm(!openForm);
  };

  const handleAdd = () => {
    addAppointment.dateTime.push(dTAdd);
    setAppointments([...appointments, addAppointment]);
    setAddAppointment({
      firstName: "",
      lastName: "",
      location: "",
      dateTime: [],
    });
    setOpenForm(!openForm);
    setAddSnackOpen(true);
  };

  const columns = [
    {
      id: "appointments",
      label: "Appointments",
      align: "center",
    },
    {
      id: "name",
      label: "First & Last Name",
      align: "center",
    },
    {
      id: "location",
      label: "Location",
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      align: "center",
    },
  ];

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">My Appointments</Typography>
        <Button variant="contained" color="success" onClick={handleAddDialog}>
          <AddCircle />
          New Appointment
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={5} sx={{ my: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "Highlight" }}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    minWidth: column.minWidth,
                    color: "white",
                    borderRight: "1px solid white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ color: "black" }}>
            {appointments.map((appointment, index1) => {
              return (
                <TableRow key={index1}>
                  {editView && editIndex === index1 ? (
                    <>
                      <TableCell>
                        <Box>
                          {editField.dateTime.map((datetime, editIndex) => {
                            return (
                              <Box
                                key={editIndex}
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <TextField
                                  value={datetime.date}
                                  onChange={(e) => {
                                    setEditField({
                                      ...editField,
                                      dateTime: editField.dateTime.map(
                                        (date, innerIndex) => {
                                          if (innerIndex === editIndex) {
                                            return {
                                              ...date,
                                              date: e.target.value,
                                            };
                                          } else {
                                            return date;
                                          }
                                        },
                                      ),
                                    });
                                  }}
                                  type="date"
                                />
                                <TextField
                                  type="time"
                                  value={datetime.time}
                                  onChange={(e) => {
                                    setEditField({
                                      ...editField,
                                      dateTime: editField.dateTime.map(
                                        (time, innerIndex) => {
                                          if (innerIndex === editIndex) {
                                            return {
                                              ...time,
                                              time: e.target.value,
                                            };
                                          } else {
                                            return time;
                                          }
                                        },
                                      ),
                                    });
                                  }}
                                />
                                <Box>
                                  <IconButton
                                    onClick={() => {
                                      setEditField({
                                        ...editField,
                                        dateTime: editField.dateTime.filter(
                                          (_, innerIndex) =>
                                            innerIndex !== editIndex,
                                        ),
                                      });
                                    }}
                                  >
                                    <RemoveCircle color="error" />
                                  </IconButton>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <TextField
                          id="firstName"
                          variant="outlined"
                          value={editField.firstName}
                          onChange={(e) =>
                            setEditField({
                              ...editField,
                              firstName: e.target.value,
                            })
                          }
                        />
                        <TextField
                          id="lastName"
                          variant="outlined"
                          value={editField.lastName}
                          onChange={(e) =>
                            setEditField({
                              ...editField,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="location"
                          variant="outlined"
                          value={editField.location}
                          onChange={(e) =>
                            setEditField({
                              ...editField,
                              location: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            sx={{ m: "2" }}
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ m: "2" }}
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <Box
                          component={"span"}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            {appointment.dateTime.map((datetime, index2) => {
                              return (
                                <Box
                                  key={index2}
                                  sx={{
                                    mb: "5px",
                                  }}
                                >
                                  <Box>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                      {new Date(
                                        datetime.date +
                                          "T" +
                                          datetime.time +
                                          ":00",
                                      ).toLocaleString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </Typography>
                                    <Typography sx={{ color: "grey" }}>
                                      {new Date(
                                        datetime.date +
                                          "T" +
                                          datetime.time +
                                          ":00",
                                      ).toLocaleString("en-IN", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                        timeZoneName: "short",
                                      })}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {appointment.firstName}
                        <br />
                        <Typography
                          component={"span"}
                          sx={{ fontWeight: "bold" }}
                        >
                          {appointment.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontWeight: "semibold", color: "black" }}
                        >
                          {appointment.location}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex" }}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddDialog}
                            sx={{ my: "2" }}
                          >
                            <Add sx={{ mr: "2" }} />
                            Appointment
                          </Button>
                          <Button
                            onClick={() => {
                              setEditIndex(index1);
                              handleEdit(index1);
                            }}
                          >
                            <Edit sx={{ mr: "2" }} />
                          </Button>
                          <Button
                            onClick={() => {
                              setDeleteIndex(index1);
                              handleDialog();
                            }}
                            color="error"
                          >
                            <Delete sx={{ mr: "2" }} />
                          </Button>
                        </Box>
                      </TableCell>
                    </>
                  )}
                  <Dialog open={openDialog} onClose={handleDialog}>
                    <DialogTitle>{"Delete Appointment?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this appointment?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        onClick={() => handleDialog()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleDelete(index1);
                          handleDialog();
                        }}
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableRow>
              );
            })}
            <Dialog open={openForm} onClose={handleAddDialog}>
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
            </Dialog>
            <Snackbar
              open={delSnackOpen}
              autoHideDuration={4000}
              onClose={handleDeleteSnackClose}
            >
              <Alert onClose={handleDialog} severity="warning" action={action}>
                Appointments deleted successfully!
              </Alert>
            </Snackbar>
            <Snackbar
              autoHideDuration={4000}
              open={editSnackOpen}
              onClose={handleEditSnackClose}
              sx={{ width: "100%" }}
            >
              <Alert severity="info">Appointment Edited Successfully!</Alert>
            </Snackbar>
            <Snackbar
              autoHideDuration={4000}
              open={addSnackOpen}
              onClose={handleAddSnackClose}
              sx={{ width: "100%" }}
            >
              <Alert severity="success">Appointment Added Successfully!</Alert>
            </Snackbar>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
    </Container>
  );
}
