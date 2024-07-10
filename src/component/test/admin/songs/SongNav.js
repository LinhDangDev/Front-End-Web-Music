import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Lock, RollerShades, Delete, Update, Home } from "@mui/icons-material"; // Import các biểu tượng cần thiết từ Material-UI

const SongNav = () => {
  const navItems = [
    { to: "/ListSong", text: "List Song", icon: <Lock /> },
    {
      to: "/CreateSong",
      text: "Create Song",
      icon: <RollerShades />, //PersonAdd
    },
    {
      to: "/UpdateSong",
      text: "Update Song",
      icon: <Delete />,
    },
    {
      to: "/DeleteSong",
      text: "Delete Song",
      icon: <Delete />,
    },
    {
      to: "/CategorySong",
      text: "Category",
      icon: <Home />,
    },
    {
      to: "/Admin",
      text: "Return",
      icon: <Home />,
    },
  ];

  return (
    <Box sx={{ width: "20%" }}>
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

export default SongNav;
