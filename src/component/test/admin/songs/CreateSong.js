import React, { useState, useEffect } from "react";
import { getToken } from "../../../../services/localStorageService";

import {
  Box,
  Alert,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import GenreNav from "./GenreNav";

const UploadSong = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");

  useEffect(() => {
    fetchGenres();
  }, []);

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

  const fetchGenres = async () => {
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/genres`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }

      const data = await response.json();
      setGenres(data.result);
      if (data.result.length > 0) {
        setSelectedGenre(data.result[0].id); // Set default genre
      }
    } catch (error) {
      showError(error.message);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file || !selectedGenre) {
      showError("Please select a file and genre.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("genreId", selectedGenre);

    const token = getToken(); // Get the token here

    try {
      const response = await fetch(`http://localhost:8080/songs/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload song");
      }

      const data = await response.json();
      showSuccess(data.message);
      navigate("/songs"); // Redirect to songs list or success page
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
        {/* <GenreNav /> */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          p={3}
        >
          <Card sx={{ width: 500, boxShadow: 4, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Upload Song
              </Typography>
              <Box
                component="form"
                onSubmit={handleUpload}
                encType="multipart/form-data"
              >
                <input type="file" onChange={handleFileChange} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="genre-label">Genre</InputLabel>
                  <Select
                    labelId="genre-label"
                    id="genre-select"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre.genreName} value={genre.genreId}>
                        {genre.genreName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default UploadSong;
