import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="localhost:3000">
        SHS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [imageIndex, setImageIndex] = React.useState(0);
  const images = [
    "/placeholder_2.jpg",
    "/placeholder_3.jpg",
    "/placeholder_4.jpg",
  ]; // Replace with the actual image URLs

  const handleImageChange = (forward) => {
    setImageIndex((prevIndex) => {
      const nextIndex = forward
        ? (prevIndex + 1) % images.length
        : (prevIndex - 1 + images.length) % images.length;
      return nextIndex;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      propertyName: data.get("propertyName"),
      address: data.get("address"),
      googlemaps: data.get("googlemaps"),
      price: data.get("price"),
      amenities: data.get("amenities"),
      // Add the rest of the form fields
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Property Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="propertyName"
                  required
                  fullWidth
                  id="propertyName"
                  label="Property Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="googlemaps"
                  label="Google Maps"
                  name="googlemaps"
                  autoComplete="googlemaps"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="amenities"
                  label="Amenities"
                  name="amenities"
                  autoComplete="amenities"
                />
              </Grid>
            </Grid>
            <div style={{ position: "relative" }}>
              <img
                src={images[imageIndex]}
                alt="Property"
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: "16px",
                  borderRadius: "10px",
                }}
              />
              <ArrowBackIosIcon
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  fontSize: "2rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "50%",
                  padding: "8px",
                }}
                onClick={() => handleImageChange(false)}
              />
              <ArrowForwardIosIcon
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  fontSize: "2rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "50%",
                  padding: "8px",
                }}
                onClick={() => handleImageChange(true)}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
