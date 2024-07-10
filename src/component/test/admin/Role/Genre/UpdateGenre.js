import React, { useState, useEffect } from "react";
import { getToken } from "../../../../../services/localStorageService";
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
import { useNavigate, useParams } from "react-router-dom";
import GenreNav from "./GenreNav";

const UpdateGenre = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the genre ID from URL params
  const [genreName, setGenreName] = useState("");
  const [description, setDescription] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");

  useEffect(() => {
    fetchGenreById();
  }, []);

  const fetchGenreById = async () => {
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/genres/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch genre: ${response.statusText}`);
      }

      const data = await response.json();
      setGenreName(data.genreName);
      setDescription(data.description);
    } catch (error) {
      console.error("Error fetching genre:", error);
    }
  };

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

  const handleUpdateGenre = async (event) => {
    event.preventDefault();

    const data = {
      genreName: genreName,
      description: description,
    };

    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/genres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update genre: ${response.statusText}`);
      }

      const responseData = await response.json();
      showSuccess("Genre updated successfully");
    } catch (error) {
      showError(error.message);
    }
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
        <GenreNav />
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
              maxWidth: 800,
              boxShadow: 4,
              borderRadius: 4,
              padding: 4,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Update Genre
              </Typography>
              <Box component="form" onSubmit={handleUpdateGenre} sx={{ mt: 4 }}>
                <TextField
                  label="Genre Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={genreName}
                  onChange={(e) => setGenreName(e.target.value)}
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
                  Update Genre
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default UpdateGenre;
