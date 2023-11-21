import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import propertiesData from "../../public/properties.json";
import Link from "@mui/material/Link";

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

const PropertyDetailsPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = router.query;
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use the property ID to access the corresponding data
  const { id } = router.query;

  const property = propertiesData.properties.find(
    (property) => property.id === parseInt(id)
  );

  console.log(property);

  useEffect(() => {
    loadGoogleMapsScript();
  }, [property]);

  const loadGoogleMapsScript = () => {
    // Check if the script is already included
    if (!window.google || !window.google.maps) {
      // Create a script element for the Google Maps API
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAXBIS8zw2wLdMWPLBFaCBx1LwkQnJUHmM&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Attach the `initMap` function to the global window object
      window.initMap = initMap;
    } else {
      // If the script is already included, directly call initMap
      initMap();
    }
  };

  const initMap = () => {
    // Function to geocode the address
    const geocodeAddress = (address, callback) => {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          callback(results[0].geometry.location);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };

    if (property !== undefined) {
      // Use the geocode function
      geocodeAddress(property.address, (location) => {
        const mapOptions = {
          center: location,
          zoom: 15,
        };

        const map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        const marker = new google.maps.Marker({
          position: location,
          map,
        });

        setMap(map);
        setMarker(marker);
      });
    }
  };

  // Check if property is loaded before rendering
  if (!property) {
    return <div>Loading...</div>; // Or any other loading placeholder
  }

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
          {property ? property.propertyownerName : "Property not found"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {property ? property.address : ""}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {property ? `Amenities: ${property.amenities}` : ""}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {property ? `Housing Type: ${property.housingType}` : ""}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {property ? `${property.description}` : ""}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {property ? (
            <Link href={"mailto:${property.contactEmai}"}>
              {property.contactEmail}
            </Link>
          ) : (
            ""
          )}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {property ? `${property.contactPhone}` : ""}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {property ? `Rent: $${property.price}/month` : ""}
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
