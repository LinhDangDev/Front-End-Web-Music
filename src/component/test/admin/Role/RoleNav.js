import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Lock, RollerShades, Delete, Update, Home } from "@mui/icons-material"; // Import các biểu tượng cần thiết từ Material-UI

const RoleNav = () => {
  const navItems = [
    { to: "/ListRole", text: "List Role", icon: <Lock /> },
    {
      to: "/CreateRole",
      text: "Create-Update Role",
      icon: <RollerShades />, //PersonAdd
    },
    {
      to: "/DeleteRole",
      text: "Delete Role",
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

export default RoleNav;
