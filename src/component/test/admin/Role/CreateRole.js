import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../../services/localStorageService";
import RoleNav from "./RoleNav"; // Adjust the import path based on your project structure

const CreateRole = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await fetch(`http://localhost:8080/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          permissions: [selectedPermission],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create role");
      }

      const data = await response.json();
      console.log("Role created successfully:", data);
      setSnackBarMessage("Role created successfully");
      setSnackType("success");
      setSnackBarOpen(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      showError(error.message);
    }
  };

  useEffect(() => {
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
          setPermissions(data.result);
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (error) {
        showError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <Box display="flex" height="100vh" bgcolor="#f0f2f5">
      <RoleNav />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Create Role
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                {loading ? (
                  <Typography>Loading permissions...</Typography>
                ) : (
                  <FormControl fullWidth margin="normal">
                    <TextField
                      select
                      label="Permissions"
                      value={selectedPermission}
                      onChange={(e) => setSelectedPermission(e.target.value)}
                      SelectProps={{
                        native: false,
                      }}
                      variant="outlined"
                      required
                    >
                      <MenuItem value="">Select Permission</MenuItem>
                      {permissions.map((perm) => (
                        <MenuItem key={perm.name} value={perm.name}>
                          {perm.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Create Role
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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

export default CreateRole;
