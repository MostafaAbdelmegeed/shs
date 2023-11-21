import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function PropertyDetailsManagement() {
  const router = useRouter();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    const getPropertyDetails = async () => {
      const propertyId = router.query.id;
      if (!propertyId) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3002/properties/${propertyId}`
        );
        if (response.ok) {
          const propertyData = await response.json();
          setPropertyDetails(propertyData);
          setEditedDetails(propertyData); // Initialize edited details with fetched data
        } else {
          console.error("Failed to fetch property details");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    getPropertyDetails();
  }, [router.query.id]);

  const handleDeleteProperty = async () => {
    try {
      const propertyId = router.query.id;
      const response = await fetch(
        `http://localhost:3002/properties/${propertyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Property deleted successfully");
        router.push("/propertymanagement");
        window.alert("Property deleted successfully"); // Alert for successful deletion
      } else {
        console.error("Failed to delete property");
        window.alert("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      window.alert("Error deleting property. Please try again.");
    }
  };

  const handleUpdateProperty = async () => {
    try {
      const propertyId = router.query.id;
      const response = await fetch(
        `http://localhost:3002/properties/${propertyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDetails),
        }
      );

      if (response.ok) {
        console.log("Property updated successfully");
        router.push(`/propertydetailsmanagement?id=${propertyId}`); // Refresh the page after update
        window.alert("Property updated successfully"); // Alert for successful update
      } else {
        console.error("Failed to update property");
        window.alert("Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      window.alert("Error updating property. Please try again.");
    }
  };

  const handleGoBack = () => {
    router.push("/propertymanagement");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleGoBack}
            style={{ position: "absolute", top: 20, left: 20 }}
          >
            <ArrowBack />
          </IconButton>
          <Avatar style={{ margin: "8px", backgroundColor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" style={{ marginBottom: "16px" }}>
            PROPERTY DETAILS
          </Typography>
          <Divider style={{ width: "100%" }} />
          {propertyDetails ? (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginTop: "20px",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Property Owner Name:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="propertyownerName"
                      value={editedDetails.propertyownerName || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Typography>
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Address:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="address"
                      value={editedDetails.address || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Typography>
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Price:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="price"
                      value={editedDetails.price || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Typography>
              {/* Repeat this structure for other fields */}
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Amenities:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="amenities"
                      value={editedDetails.amenities || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Typography>
              {/* Housing Type */}
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Housing Type:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="housingType"
                      value={editedDetails.housingType || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Typography>
              {/* Description */}
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Description:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="description"
                      value={editedDetails.description || ""}
                      onChange={handleInputChange}
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Typography>
              {/* Contact Email */}
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Contact Email:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="contactEmail"
                      value={editedDetails.contactEmail || ""}
                      onChange={handleInputChange}
                      fullWidth
                      type="email"
                    />
                  </Grid>
                </Grid>
              </Typography>
              {/* Contact Phone */}
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Contact Phone:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      name="contactPhone"
                      value={editedDetails.contactPhone || ""}
                      onChange={handleInputChange}
                      fullWidth
                      type="tel"
                    />
                  </Grid>
                </Grid>
              </Typography>
              <Typography variant="subtitle1">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    Approval Status:
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {" "}
                    <TextField
                      name="approvalStatus"
                      value={editedDetails.approvalStatus || ""}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Typography>
              <Button
                variant="contained"
                onClick={handleUpdateProperty}
                style={{ width: "100%", marginTop: "12px" }}
              >
                Update Property
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteProperty}
                style={{ width: "100%", marginTop: "12px" }}
              >
                Delete Property
              </Button>
            </div>
          ) : (
            <Typography>No property details found</Typography>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}
