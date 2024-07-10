import React, { useState, useEffect } from "react";
import { getToken } from "../../../services/localStorageService";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField, // Import TextField
  MenuItem, // Import MenuItem
  Select, // Import Select
  InputLabel, // Import InputLabel
} from "@mui/material";
import UserNav from "./UserNav";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");

  const [editUserId, setEditUserId] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserRoles, setEditUserRoles] = useState([]);
  const [editUserPassword, setEditUserPassword] = useState(""); // State for new password
  const [availableRoles, setAvailableRoles] = useState([]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  const showError = (message) => {
    setSnackType("error");
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  };

  const showSuccess = (message) => {
    setSnackType("success");
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setUsers(data.result); // Update state with fetched users
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (error) {
      showError(error.message);
      setUsers([]); // Reset users if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRoles = async () => {
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setAvailableRoles(data.result); // Update state with available roles
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (error) {
      showError(error.message);
      setAvailableRoles([]); // Reset roles if fetch fails
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setEditUserId(userToEdit.id);
      setEditUserEmail(userToEdit.email);
      // Assuming roles are stored as an array of strings
      setEditUserRoles(userToEdit.roles.map((role) => role.name));
      // Password should not be stored in state or retrieved for security reasons
    }
  };

  const handleUpdateUser = async () => {
    const token = getToken();
    const updatedUserData = {
      email: editUserEmail,
      roles: editUserRoles,
    };

    // Add new password if user entered one
    if (editUserPassword) {
      updatedUserData.password = editUserPassword;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/${editUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      showSuccess(`User ${editUserId} updated successfully`);

      // Refresh users list
      fetchUsers();
      // Clear edit form fields
      setEditUserId("");
      setEditUserEmail("");
      setEditUserRoles([]);
      setEditUserPassword(""); // Clear password field after update
    } catch (error) {
      showError(error.message);
    }
  };
  const handleDeleteUser = async (userId) => {
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      showSuccess(`User ${userId} deleted successfully`);

      // Refresh users list after deletion
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAvailableRoles();
  }, []);

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Box display="flex" height="100vh" bgcolor="#f0f2f5">
        <UserNav />
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          flexGrow={1}
          sx={{ padding: 3 }}
        >
          <Grid item xs={12}>
            <Card
              sx={{ height: "100%", overflow: "auto", textAlign: "center" }}
            >
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  User List
                </Typography>
                {loading ? (
                  <Typography>Loading...</Typography>
                ) : users.length === 0 ? (
                  <Typography>No users found.</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Roles</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {user.roles.map((role) => role.name).join(", ")}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleEditUser(user.id)}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {/* Edit User Form */}
                {editUserId && (
                  <Box mt={4} p={2} bgcolor="#e0e0e0">
                    <Typography variant="h5" gutterBottom>
                      Edit User
                    </Typography>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={editUserEmail}
                      onChange={(e) => setEditUserEmail(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select Roles</InputLabel>
                      <Select
                        multiple
                        value={editUserRoles}
                        onChange={(e) => setEditUserRoles(e.target.value)}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {availableRoles.map((role) => (
                          <MenuItem key={role.id} value={role.name}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="New Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={editUserPassword}
                      onChange={(e) => setEditUserPassword(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateUser}
                    >
                      Update User
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ListUser;
