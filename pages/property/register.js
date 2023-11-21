import { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";

const defaultTheme = createTheme();

export default function PropertyRegistration() {
  const router = useRouter(); // Access the router
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleGoBack = () => {
    router.push("/homepage"); // Redirect to the homepage
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(imageUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Checking for empty fields
    const formValues = Array.from(formData.values());
    const hasEmptyFields = formValues.some((value) => value === "");

    if (hasEmptyFields) {
      alert("Please fill all the fields before submitting.");
      return;
    }

    const propertyData = {
      propertyownerName: formData.get("propertyownerName"),
      address: formData.get("address"),
      price: formData.get("price"),
      amenities: formData.get("amenities"),
      housingType: formData.get("housingType"),
      description: formData.get("description"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      //propertyId: Math.floor(Math.random() * 1000), // Generate a random property ID
      approvalStatus: "0",
      images: uploadedImages, // Include uploaded images in the property data
    };

    try {
      const response = await fetch("http://localhost:3002/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        // Property registered successfully
        console.log("Property registered:", propertyData);
        window.alert("Property registered successfully!"); // Show success message
        // Redirect to homepage after alert confirmation
        if (window.confirm("Click OK to go to the homepage.")) {
          router.push("/homepage"); // Redirect to homepage
        }
      } else {
        // Handle registration failure
        console.error("Failed to register property. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const propertyImages = uploadedImages.map((imageUrl, index) => ({
    original: imageUrl,
    thumbnail: imageUrl,
    originalAlt: `Image ${index + 1}`,
    thumbnailAlt: `Thumbnail ${index + 1}`,
  }));

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
          <IconButton
            onClick={handleGoBack}
            sx={{ position: "absolute", top: 20, left: 20 }}
          >
            <ArrowBack />
          </IconButton>

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
                  name="propertyownerName"
                  required
                  fullWidth
                  id="propertyownerName"
                  label="Property Owner Name"
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
                  required
                  fullWidth
                  type="email"
                  id="contactEmail"
                  label="Contact Email"
                  name="contactEmail"
                  autoComplete="contactEmail"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="tel"
                  id="contactPhone"
                  label="Contact Phone Number"
                  name="contactPhone"
                  autoComplete="contactPhone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  autoComplete="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="housingType"
                  label="Housing Type"
                  name="housingType"
                  autoComplete="housingType"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="amenities"
                  label="Amenities"
                  name="amenities"
                  autoComplete="amenities"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 100 }} // Set maximum character limit
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                />
              </Grid>
              {uploadedImages.length > 0 && (
                <Grid item xs={12}>
                  {uploadedImages.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      style={{ width: "100%", marginTop: 10 }}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register Property
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
      </Container>
    </ThemeProvider>
  );
}
