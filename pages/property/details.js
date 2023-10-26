import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "16px",
    overflow: "hidden", // Hide overflowing content within the rounded container
  },
  propertyImages: {
    position: "relative",
    width: "100%", // Set to 100% to fill the entire width
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderTopLeftRadius: "16px", // Round the top left corner
    borderTopRightRadius: "16px", // Round the top right corner
  },
  mapContainer: {
    width: "100%",
    height: "300px",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    cursor: "pointer",
    color: "white",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    padding: "0.5rem",
  },
  arrowLeft: {
    left: "1rem",
  },
  arrowRight: {
    right: "1rem",
  },
  propertyInfo: {
    width: "100%", // Make the property info wider
    marginTop: "10px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.7)",
    padding: "1rem",
    borderRadius: "16px",
    color: "black",
  },
}));

// Placeholder data
const placeholderData = {
  1: {
    name: "Property 1",
    address: "123 Main St, City",
    amenities: "Swimming pool, Gym, Parking",
    rent: 1500,
    location: {
      latitude: 40.7128, // Replace with the property's latitude
      longitude: -74.006, // Replace with the property's longitude
    },
    images: ["/placeholder_2.jpg", "/placeholder_4.jpg"],
  },
  2: {
    name: "Property 2",
    address: "456 Elm St, City",
    amenities: "Gym, Parking",
    rent: 1200,
    location: {
      latitude: 34.0522, // Replace with the property's latitude
      longitude: -118.2437, // Replace with the property's longitude
    },
    images: ["/property2-image1.jpg", "/property2-image2.jpg"],
  },
};

const PropertyDetailsPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use the property ID to access the corresponding data
  const property = placeholderData[1]; // Placeholder data for Property 1

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    // Create a script element for the Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Attach the `initMap` function to the global window object
    window.initMap = initMap;
  };

  const initMap = () => {
    const mapOptions = {
      center: {
        lat: property.location.latitude,
        lng: property.location.longitude,
      },
      zoom: 15,
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const marker = new google.maps.Marker({
      position: mapOptions.center,
      map,
    });

    setMap(map);
    setMarker(marker);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${
      property ? property.images[currentImageIndex] : ""
    })`,
  };

  return (
    <Container className={classes.root}>
      <div className={classes.propertyImages} style={backgroundImageStyle}>
        <ArrowBackIcon
          className={`${classes.arrow} ${classes.arrowLeft}`}
          onClick={handlePrevImage}
        />
        <ArrowForwardIcon
          className={`${classes.arrow} ${classes.arrowRight}`}
          onClick={handleNextImage}
        />
      </div>
      <div className={classes.propertyInfo}>
        <Typography variant="h4" gutterBottom>
          {property ? property.name : "Property not found"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {property ? property.address : ""}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {property ? `Amenities: ${property.amenities}` : ""}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {property ? `Rent: $${property.rent}/month` : ""}
        </Typography>
        <div id="map" className={classes.mapContainer}></div>
      </div>
    </Container>
  );

  function handlePrevImage() {
    if (property && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }

  function handleNextImage() {
    if (property && currentImageIndex < property.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }
};

export default PropertyDetailsPage;
