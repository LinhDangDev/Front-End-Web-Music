import React, { useState, useEffect } from "react";
import { getToken } from "../../../../../services/localStorageService";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import GenreNav from "./GenreNav";

const ListGenre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");
  const [deleteGenreId, setDeleteGenreId] = useState(""); // State to store delete genre ID
  const [deleteGenreName, setDeleteGenreName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
    setLoading(true);
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
      if (data.result && Array.isArray(data.result)) {
        setGenres(data.result); // Update state with fetched genres
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (error) {
      showError(error.message);
      setGenres([]); // Reset genres if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGenre = async () => {
    const token = getToken();

    try {
      const response = await fetch(
        `http://localhost:8080/genres/${deleteGenreId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete genre");
      }

      showSuccess(`Genre ${deleteGenreName} deleted successfully`);

      // Refresh genres list
      fetchGenres();
    } catch (error) {
      showError(error.message);
    } finally {
      setDeleteDialogOpen(false); // Close the delete confirmation dialog
      setDeleteGenreId(""); // Reset deleteGenreId after deletion
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteGenreId(""); // Reset deleteGenreId when canceling
  };

  const handleDeleteOpen = (genreId, genreName) => {
    setDeleteGenreId(genreId);
    setDeleteGenreName(genreName);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchGenres();
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
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete genre "{deleteGenreName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteGenre} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" height="100vh" bgcolor="#f0f2f5">
        <GenreNav />
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
                  Genres List
                </Typography>
                <TextField
                  label="Enter genre ID to delete"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  value={deleteGenreId}
                  onChange={(e) => setDeleteGenreId(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleDeleteOpen(deleteGenreId, deleteGenreName)
                  }
                  sx={{ marginBottom: 2 }}
                >
                  Delete Genre
                </Button>
                {loading ? (
                  <Typography>Loading...</Typography>
                ) : genres.length === 0 ? (
                  <Typography>No genres found.</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {genres.map((genre) => (
                          <TableRow key={genre.id}>
                            <TableCell>{genre.id}</TableCell>
                            <TableCell>{genre.genreName}</TableCell>
                            <TableCell>{genre.description}</TableCell>
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

export default ListGenre;
