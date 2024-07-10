import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import {
  PersonAdd,
  Person,
  Delete,
  Lock,
  Assignment,
  MusicNote,
  ExitToApp,
} from "@mui/icons-material";

const AdminNav = () => {
  const navItems = [
    { to: "/UserNav", text: "Manger User", icon: <PersonAdd /> },

    { to: "/PermissionNav", text: "Manger Permission", icon: <Lock /> },
    { to: "/RoleNav", text: "Manger Role", icon: <Assignment /> },
    { to: "/SongNav", text: "Manger Song", icon: <MusicNote /> },
    { to: "/GenreNav", text: "Category", icon: <ExitToApp /> },
    { to: "/logout", text: "Logout", icon: <ExitToApp /> },
  ];

  return (
    <Box sx={{ width: "20%", height: "100vh", overflowY: "auto" }}>
      <List component="nav" sx={{ flexDirection: "column" }}>
        {navItems.map((item, index) => (
          <ListItem
            button
            component={NavLink}
            to={item.to}
            key={index}
            sx={{
              borderRadius: "4px",
              margin: "10px 0",
              "&.active": {
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminNav;
