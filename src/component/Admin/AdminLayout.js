// src/components/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import AdminNav from "./AdminNav";

const AdminLayout = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box display="flex">
        <AdminNav />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLayout;
