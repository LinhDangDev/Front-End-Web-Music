// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken } from "../services/localStorageService";

// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Snackbar,
//   TextField,
//   Typography,
// } from "@mui/material";

// const CreatePermission = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [snackBarOpen, setSnackBarOpen] = useState(false);
//   const [snackBarMessage, setSnackBarMessage] = useState("");
//   const [snackType, setSnackType] = useState("error");
//   const [accessToken, setAccessToken] = useState("");

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       const decodedToken = decodeToken(token);
//       if (!decodedToken || decodedToken.role !== "ADMIN") {
//         navigate("/unauthorized"); // Redirect to unauthorized page if role is not ADMIN
//       } else {
//         setAccessToken(token);
//       }
//     } else {
//       navigate("/login"); // Redirect to login if token is not available
//     }
//   }, [navigate]);

//   const handleCloseSnackBar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackBarOpen(false);
//   };

//   const showError = (message) => {
//     setSnackType("error");
//     setSnackBarMessage(message);
//     setSnackBarOpen(true);
//   };

//   const showSuccess = (message) => {
//     setSnackType("success");
//     setSnackBarMessage(message);
//     setSnackBarOpen(true);
//   };

//   const handleCreatePermission = (event) => {
//     event.preventDefault();

//     const data = {
//       name: name,
//       description: description,
//     };

//     fetch(`http://localhost:8080/identity/permission`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.code !== 1000) throw new Error(data.message);
//         showSuccess("Permission created successfully");
//         setTimeout(() => {
//           navigate("/admin");
//         }, 2000);
//       })
//       .catch((error) => {
//         showError(error.message);
//       });
//   };

//   return (
//     <>
//       <Snackbar
//         open={snackBarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackBar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackBar}
//           severity={snackType}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snackBarMessage}
//         </Alert>
//       </Snackbar>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//         bgcolor="#f0f2f5"
//       >
//         <Card
//           sx={{
//             minWidth: 250,
//             maxWidth: 400,
//             boxShadow: 4,
//             borderRadius: 4,
//             padding: 4,
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="h1" gutterBottom>
//               Create Permission
//             </Typography>
//             <form onSubmit={handleCreatePermission} noValidate>
//               <TextField
//                 label="Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <TextField
//                 label="Description"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 fullWidth
//                 sx={{ mt: 2 }}
//               >
//                 Create Permission
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </Box>
//     </>
//   );
// };

// export default CreatePermission;
