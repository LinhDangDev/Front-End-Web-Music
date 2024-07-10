import React, { useState } from "react";
import { getToken } from "../../../services/localStorageService";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PermissionNav from "./PermissionNav";

const CreatePermission = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const showSuccess = (message) => {
    setSnackType("success");
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  };

  const handleCreatePermission = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      description: description,
    };

    const token = getToken(); // Get the token here

    fetch(`http://localhost:8080/permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the token retrieved from localStorage
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code !== 1000) throw new Error(data.message);
      })
      .then(() => {
        showSuccess("Permission created successfully");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

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
      <Box display="flex" height="100vh" bgcolor="#f0f2f5">
        <PermissionNav />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Card
            sx={{
              minWidth: 450,
              maxWidth: 800, // Tăng maxWidth lên để làm to hơn
              boxShadow: 4,
              borderRadius: 4,
              padding: 4,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Create Permission
              </Typography>
              <Box
                component="form"
                onSubmit={handleCreatePermission}
                sx={{ mt: 4 }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Create Permission
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      ;
    </>
  );
};

export default CreatePermission;
