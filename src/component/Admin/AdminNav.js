// src/components/admin/AdminNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const AdminNav = () => {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "background.paper",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <List component="nav">
        <ListItem
          button
          component={NavLink}
          to="/admin/create-user"
          sx={{ borderRadius: "4px", marginBottom: "5px" }}
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "#d1e7ff",
          }}
        >
          <ListItemText primary="Create User" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/update-user"
          sx={{ borderRadius: "4px", marginBottom: "5px" }}
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "#d1e7ff",
          }}
        >
          <ListItemText primary="Update User" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/delete-user"
          sx={{ borderRadius: "4px", marginBottom: "5px" }}
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "#d1e7ff",
          }}
        >
          <ListItemText primary="Delete User" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/create-permission"
          sx={{ borderRadius: "4px", marginBottom: "5px" }}
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "#d1e7ff",
          }}
        >
          <ListItemText primary="Create Permission" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/create-role"
          sx={{ borderRadius: "4px", marginBottom: "5px" }}
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "#d1e7ff",
          }}
        >
          <ListItemText primary="Create Role" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/admin/create-song"
          sx={{ borderRadius: "4px", marginBottom: "5px" }}
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "#d1e7ff",
          }}
        >
          <ListItemText primary="Create Song" />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminNav;
