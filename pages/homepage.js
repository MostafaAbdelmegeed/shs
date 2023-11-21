import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url("/oip_2.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  logoImage: {
    width: "500px",
    height: "auto",
    marginBottom: "150px",
    marginTop: "20px",
  },
  searchContainer: {
    marginTop: "-150px", 
    background: "rgba(255, 255, 255, 0.7)",
    padding: "16px",
    width: "60%",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  
  searchInput: {
    flex: 1,
    marginRight: "16px", 
  },
  searchButton: {
    marginLeft: "16px",
  },
  header: {
    position: "absolute",
    top: "20px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    background: "rgba(255, 255, 255, 0.5)", // Adjust alpha for transparency
    padding: "16px", // Similar padding for consistency
    borderRadius: "10px", // Similar border-radius
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const handleRegisterProperty = () => {
    router.push("/property/register");
  };

  const handleSearch = () => {
    const searchKeyword = document.getElementById("searchInput").value;
    router.push({
      pathname: "/results",
      query: { keyword: searchKeyword },
    });
  };

  const handleLogout = () => {
    // Implement logout functionality (e.g., clearing session, etc.)
    // Redirect to the sign-in page after logout
    router.push("/");
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Button
          variant="text"
          color="primary"
          onClick={handleRegisterProperty}
        >
          Register Property?
        </Button>
        <IconButton onClick={handleClick}>
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Properties</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <img src="/logo.png" alt="Logo" className={classes.logoImage} />
      <Container maxWidth="sm" className={classes.searchContainer}>
        <TextField
          id="searchInput"
          label="Search using University, City, or Zipcode..."
          variant="outlined"
          fullWidth
          placeholder="Type your search here"
          className={classes.searchInput}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.searchButton}
          onClick={handleSearch} // Attach the click event to the handleSearch function
        >
          Search
        </Button>
      </Container>
    </div>
  );
};

export default Homepage;
