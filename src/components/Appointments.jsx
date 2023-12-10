import {
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
import React, { useContext, useEffect, useState } from "react";
import { AppContext, AppointmentContext } from "../context/AppContext";
import AddAppointment from "./AddAppointment";
import DeleteAppointment from "./DeleteAppointment";

export default function AllAppointments() {
  // context api data
  const { appointments, setAppointments } = useContext(AppContext);
  // states
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [editView, setEditView] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

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

  const handleDelDialog = () => {
    setOpenDelDialog(!openDelDialog);
  };

  const handleDelete = () => {
    setDeletedAppointments(appointments[deleteIndex]);
    setAppointments(appointments.filter((_, index1) => index1 !== deleteIndex));
    handleDelDialog();
    setDelSnackOpen(true);
  };

  const [delSnackOpen, setDelSnackOpen] = useState(false);

  const handleDeleteSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDelSnackOpen(false);
    setDeletedAppointments({});
  };

  const action = (
    <>
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
    </>
  );

  // Add Component
  const [openForm, setOpenForm] = useState(false);
  const [addSnackOpen, setAddSnackOpen] = useState(false);

  const [addAppointment, setAddAppointment] = useState({
    firstName: "",
    lastName: "",
    location: "",
    dateTime: [],
  });

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
    setDTAdd({});
    handleAddDialog();
    setAddSnackOpen(true);
  };

  const handleAddSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddSnackOpen(false);
  };

  // edit component
  const [editSnackOpen, setEditSnackOpen] = useState(false);

  const handleEditSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEditSnackOpen(false);
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

  const handleEdit = (index1) => {
    setEditIndex(index1);
    setEditField(appointments[index1]);
    setEditView(true);
  };

  const handleCancel = () => {
    setEditView(false);
    setEditIndex(null);
  };

  // table columns
  const columns = [
    { label: "First & Last Name" },
    { label: "Appointments" },
    { label: "Location" },
    { label: "Actions" },
  ];
  const [newDate, setNewDate] = useState(false);
  const [newDateIndex, setNewDateIndex] = useState(null);
  const [newDateTime, setNewDateTime] = useState({ date: "", time: "" });

  const handleNewDate = (newDateIndex) => {
    setEditField(appointments[newDateIndex]);
    setNewDate(!newDate);
  };
  useEffect(() => {
    console.log(editField);
  }, [editField]);

  const handleAddDateTime = () => {
    const newUpdatedAppointments = [...appointments];
    newUpdatedAppointments[newDateIndex] = {
      ...newUpdatedAppointments,
      firstName: editField.firstName,
      lastName: editField.lastName,
      location: editField.location,
      dateTime: [
        ...newUpdatedAppointments[newDateIndex].dateTime,
        {
          date: newDateTime.date,
          time: newDateTime.time,
        },
      ],
    };
    setAppointments(newUpdatedAppointments);
    setNewDate(false);
    setNewDateTime({ date: "", time: "" });
  };

  return (
    <AppointmentContext.Provider
      value={{
        dTAdd,
        addAppointment,
        setAddAppointment,
        setDTAdd,
        handleAddSnackClose,
        handleAdd,
        handleSave,
        handleCancel,
        handleDelete,
        handleAddDialog,
        handleDelDialog,
        setDelSnackOpen,
      }}
    >
      <Container sx={{ marginTop: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                sm: "2rem",
                md: "2.5rem",
              },
            }}
          >
            My Appointments
          </Typography>
          <Button variant="contained" color="success" onClick={handleAddDialog}>
            <AddCircle />
            Appointment
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ my: "10px" }} elevation={5}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "ButtonText" }}>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
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
                          <Box component={"span"} sx={{ display: "flex" }}>
                            <Box component={"span"}>
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
                            <IconButton
                              variant="contained"
                              color="success"
                              onClick={() => {
                                setNewDateIndex(index1);
                                handleNewDate(index1);
                              }}
                            >
                              <AddCircle />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "semibold", color: "black" }}
                          >
                            {appointment.location}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setEditIndex(index1);
                              handleEdit(index1);
                            }}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setDeleteIndex(index1);
                              handleDelDialog();
                            }}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                    <Dialog open={openDelDialog} onClose={handleDelDialog}>
                      <DeleteAppointment index1={index1} />
                    </Dialog>
                  </TableRow>
                );
              })}
              <Dialog open={openForm} onClose={handleAddDialog}>
                <AddAppointment />
              </Dialog>
              <Dialog open={newDate} onClose={handleNewDate}>
                <DialogTitle>Add New Appointment to Client</DialogTitle>
                <Box
                  sx={{
                    p: "10px",
                    display: "flex",
                  }}
                >
                  <TextField
                    sx={{ mx: "5px" }}
                    type="date"
                    value={newDateTime.date}
                    onChange={(e) =>
                      setNewDateTime({ ...newDateTime, date: e.target.value })
                    }
                  />
                  <TextField
                    sx={{ mx: "5px" }}
                    type="time"
                    value={newDateTime.time}
                    onChange={(e) =>
                      setNewDateTime({ ...newDateTime, time: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddDateTime}
                  >
                    Add
                  </Button>
                </Box>
              </Dialog>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Snackbar
        open={delSnackOpen}
        autoHideDuration={4000}
        onClose={handleDeleteSnackClose}
      >
        <Alert onClose={handleDelDialog} severity="warning" action={action}>
          Appointments deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={4000}
        open={addSnackOpen}
        onClose={handleAddSnackClose}
      >
        <Alert severity="success">Appointment Added Successfully!</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={4000}
        open={editSnackOpen}
        onClose={handleEditSnackClose}
        sx={{ width: "100%" }}
      >
        <Alert severity="info">Appointment Edited Successfully!</Alert>
      </Snackbar>
    </AppointmentContext.Provider>
  );
}
