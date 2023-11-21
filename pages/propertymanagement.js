import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
  Divider,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";

import propertiesData from "../public/properties.json"; // Adjust the path

export default function PropertyManagement() {
  const router = useRouter();
  const initialProperties = propertiesData.properties; // Store the initial properties
  const [properties, setProperties] = useState(initialProperties);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter properties based on the search query
    const filteredProperties = initialProperties.filter((property) =>
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProperties(filteredProperties);
  }, [searchQuery, initialProperties]);

  const handleViewProperty = (propertyId) => {
    const selectedProperty = propertiesData.properties.find(
      (property) => property.id === propertyId
    );
    router.push({
      pathname: "/propertydetailsmanagement",
      query: { property: JSON.stringify(selectedProperty) },
    });
  };

  const handleGoBack = () => {
    router.push("/admin"); // Redirect to the admin page
  };

  const handleSearch = () => {
    // Filter properties based on the search query
    const filteredProperties = initialProperties.filter((property) =>
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProperties(filteredProperties);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          sx={{ position: "absolute", top: 20, left: 20 }}
        >
          <ArrowBack />
        </IconButton>
        <Avatar style={{ margin: "8px", backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "16px" }}
        >
          PROPERTY MANAGEMENT
        </Typography>
        <TextField
          id="searchQuery"
          label="Search by Address"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginBottom: "16px" }}
        >
          Search
        </Button>
        <Divider style={{ width: "100%" }} />
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property.id}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1">
                {property.address} - {property.price}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleViewProperty(property.id)}
                style={{ width: "100%", marginTop: "12px" }}
              >
                View
              </Button>
            </div>
          ))
        ) : (
          <Typography>No properties found</Typography>
        )}
      </div>
    </Container>
  );
}
