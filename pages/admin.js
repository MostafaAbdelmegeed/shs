import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";

const AdminPage = () => {
  const defaultTheme = createTheme();
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Redirect to the homepage
  };

  const handleUserAccountManagement = () => {
    router.push("/useraccountmanagement");
  };
  const handlepropertymanagement = () => {
    router.push("/propertymanagement");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        sx={{
          backgroundColor: "#ddd",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <IconButton onClick={handleGoBack} sx={{ position: "absolute", top: 20, left: 20 }}>
            <ArrowBack />
          </IconButton>
          
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", padding: "10px", marginBottom: "20px" }}>
              ADMIN DASHBOARD
            </Typography>
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: "20px" }}
          >
            <Button variant="contained" color="primary" size="large" onClick={handleUserAccountManagement} sx={{ marginRight: "10px" }}>
              User Account Management
            </Button>
            <Button variant="contained" color="primary" size="large" onClick={handlepropertymanagement}>
              Property Management
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default AdminPage;
