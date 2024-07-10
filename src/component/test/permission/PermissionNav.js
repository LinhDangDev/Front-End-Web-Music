import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Lock, Delete, Update, Home } from "@mui/icons-material"; // Import các biểu tượng cần thiết từ Material-UI

const PermissionNav = () => {
  const navItems = [
    { to: "/ListPermission", text: "List Permissions", icon: <Lock /> },
    {
      to: "/create-permission",
      text: "Create - Update Permission",
      icon: <Update />,
    },
    {
      to: "/DeletePermission",
      text: "Delete Permission",
      icon: <Delete />,
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

export default PermissionNav;
