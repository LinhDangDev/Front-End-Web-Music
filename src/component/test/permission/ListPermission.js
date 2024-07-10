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
import PermissionNav from "./PermissionNav";

const ListPermission = () => {
  const [permissions, setPermissions] = useState([]);
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

  const fetchPermissions = async () => {
    setLoading(true);
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/permissions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch permissions");
      }

      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setPermissions(data.result); // Update state with fetched permissions
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (error) {
      showError(error.message);
      setPermissions([]); // Reset permissions if fetch fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
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
      <Box display="flex" height="100vh" bgcolor={"#f0f2f5"}>
        <PermissionNav />
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
                  Permissions List
                </Typography>
                {loading ? (
                  <Typography>Loading...</Typography>
                ) : permissions.length === 0 ? (
                  <Typography>No permissions found.</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                          >
                            Description
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {permissions.map((permission) => (
                          <TableRow key={permission.name}>
                            <TableCell>
                              <Typography variant="body1">
                                {permission.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                {permission.description}
                              </Typography>
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

export default ListPermission;
