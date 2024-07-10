import React, { useState, useEffect } from "react";
import { getToken } from "../../../../services/localStorageService";
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
  TextField,
  Button,
} from "@mui/material";
import RoleNav from "./RoleNav";

const ListRole = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");
  const [deleteRoleName, setDeleteRoleName] = useState("");

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

  const fetchRoles = async () => {
    setLoading(true);
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
        setRoles(data.result); // Update state with fetched roles
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (error) {
      showError(error.message);
      setRoles([]); // Reset roles if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    const token = getToken();

    try {
      const response = await fetch(
        `http://localhost:8080/roles/${deleteRoleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete role");
      }

      showSuccess(`Role ${deleteRoleName} deleted successfully`);

      // Refresh roles list
      fetchRoles();
    } catch (error) {
      showError(error.message);
    }
  };

  useEffect(() => {
    fetchRoles();
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
        <RoleNav />
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
                  Roles List
                </Typography>
                <TextField
                  label="Enter role name to delete"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  value={deleteRoleName}
                  onChange={(e) => setDeleteRoleName(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeleteRole}
                  sx={{ marginBottom: 2 }}
                >
                  Delete Role
                </Button>
                {loading ? (
                  <Typography>Loading...</Typography>
                ) : roles.length === 0 ? (
                  <Typography>No roles found.</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {roles.map((role) => (
                          <TableRow key={role.name}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.description}</TableCell>
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
      {/* Below is an additional table just for displaying roles */}
      {/* <Box sx={{ marginTop: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.name}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
    </>
  );
};

export default ListRole;
