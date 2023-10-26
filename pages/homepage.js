import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router"; // Import the useRouter hook

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
    background: "rgba(255, 255, 255, 0.7)",
    padding: "16px",
    width: "60%",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginRight: "16px", // Add margin to the input
  },
  searchButton: {
    marginLeft: "16px",
  },
}));

const SearchPage = () => {
  const classes = useStyles();
  const router = useRouter(); // Initialize the router

  const handleSearch = () => {
    // Define the function to handle the search button click
    // You can navigate to a specific page by providing the route path
    // Get the search keyword from the input field
    const searchKeyword = document.getElementById("searchInput").value;

    // Use router.push() to navigate to the next page with the search keyword as a query parameter
    router.push({
      pathname: "/results", // Replace with your target page's route
      query: { keyword: searchKeyword },
    });
  };

  return (
    <div className={classes.root}>
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

export default SearchPage;
