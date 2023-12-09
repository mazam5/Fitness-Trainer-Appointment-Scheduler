import {
  Add,
  AddCircle,
  Close,
  Delete,
  Edit,
  RemoveCircle,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  Menu,
  MenuItem,
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
import { AppContext } from "../context/AppContext";

export default function AllAppointments() {
  const { appointments, setAppointments } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editView, setEditView] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

    // Reset state after saving
    setEditView(false);
    setEditIndex(null);
  };

  const columns = [
    {
      id: "firstName",
      label: "First Name",
    },
    {
      id: "lastName",
      label: "Last Name",
    },
    {
      id: "appointments",
      label: "Appointments",
    },
    {
      id: "location",
      label: "Location",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];

  const rows = appointments.map((appointment, index) => {
    return {
      id: index, // Use a unique identifier for the key
      firstName: appointment.firstName,
      lastName: appointment.lastName,
      location: appointment.location,
      dateTime: appointment.dateTime.map((dateTime, innerIndex) => {
        return (
          <Box
            key={innerIndex}
            sx={{
              mb: "2px",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                {new Date(
                  dateTime.date + "T" + dateTime.time + ":00",
                ).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
              <Typography sx={{ color: "grey" }}>
                {new Date(
                  dateTime.date + "T" + dateTime.time + ":00",
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
      }),
    };
  });

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleDelete = () => {
    setDeletedAppointments(appointments[deleteIndex]);
    if (deleteIndex !== null) {
      const updatedAppointments = appointments.filter(
        (_, index) => index !== deleteIndex,
      );
      setAppointments(updatedAppointments);
      setDeleteIndex(null);
    }
    handleDialog();
    setDelSnackOpen(true);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditField(appointments[index]);
    console.log(appointments[index]);
    setEditView(true);
    handleMenu();
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu = () => {
    setAnchorEl(null);
  };

  // delete snackbar
  const [delSnackOpen, setDelSnackOpen] = useState(false);
  const [deletedAppointments, setDeletedAppointments] = useState({});

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDelSnackOpen(false);
    setDeletedAppointments({});
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
        onClick={handleSnackClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  useEffect(() => {
    console.log("deleteIndex", deleteIndex);
    console.log("editIndex", editIndex);
  });

  return (
    <Container>
      <Typography variant="h4">My Appointments</Typography>
      <TableContainer component={Paper} elevation={5} sx={{ my: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    minWidth: column.minWidth,
                    color: "grey",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ color: "black" }}>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {editView && editIndex === index ? (
                  <>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        value={editField.firstName}
                        onChange={(e) =>
                          setEditField({
                            ...editField,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="lastName"
                        label="Last Name"
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
                        {editField.dateTime.map((datetime, index) => {
                          return (
                            <Box
                              key={index}
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
                                        if (innerIndex === index) {
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
                                        if (innerIndex === index) {
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
                                        (_, innerIndex) => innerIndex !== index,
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
                        label="Location"
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
                      <Box sx={{ display: "flex" }}>
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
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>
                      <Box
                        component={"span"}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Box>{row.dateTime}</Box>
                        <Box component={"span"}>
                          <IconButton>
                            <AddCircle color="success" />
                          </IconButton>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ my: "2" }}
                      >
                        <Add sx={{ mr: "2" }} />
                        Add
                      </Button>
                      <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenu}
                      >
                        <MenuItem
                          onClick={() => {
                            setEditIndex(index);
                            handleEdit(index);
                          }}
                        >
                          <Edit sx={{ mr: "2" }} />
                          Edit
                        </MenuItem>
                        <MenuItem
                          sx={{ color: "indianred" }}
                          onClick={() => {
                            setDeleteIndex(index);
                            handleDialog();
                            handleMenu();
                          }}
                        >
                          <Delete sx={{ mr: "2" }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
            <Dialog open={openDialog} onClose={handleDialog}>
              <DialogTitle>{"Delete Appointment?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this appointment?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => handleDialog()}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              open={delSnackOpen}
              autoHideDuration={4000}
              onClose={handleSnackClose}
            >
              <Alert
                onClose={handleDialog}
                severity="warning"
                sx={{ width: "100%" }}
                action={action}
              >
                Appointments deleted successfully!
              </Alert>
            </Snackbar>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
