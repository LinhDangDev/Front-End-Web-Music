import React, { useState, useEffect } from "react";
import { getToken } from "../../../services/localStorageService";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserNav from "./UserNav";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");

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

  useEffect(() => {
    fetchUsers();
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
