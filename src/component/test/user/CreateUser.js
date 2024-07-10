import React, { useState } from "react";
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
import UserNav from "./UserNav"; // Import UserNav component

const CreateUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleCreateUser = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
    };

    fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code !== 1000) throw new Error(data.message);
      })
      .then(() => {
        showSuccess("User created successfully");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <UserNav /> {/* Include UserNav component here */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "#f0f2f5",
          pl: { xs: 0, md: 4 },
          pr: { xs: 0, md: 4 }, // Adjust left padding based on screen size
        }}
      >
        <Card
          sx={{
            minWidth: 250,
            maxWidth: 600,
            width: "100%",
            boxShadow: 4,
            borderRadius: 4,
            p: 2, // Simplified padding setting
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              textAlign="center"
              gutterBottom
            >
              Create User
            </Typography>
            <Box
              component="form"
              onSubmit={handleCreateUser}
              sx={{ mt: 2, width: "100%" }} // Ensure form width spans full card width
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                Create User
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
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
    </Box>
  );
};

export default CreateUser;
