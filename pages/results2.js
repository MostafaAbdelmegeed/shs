import { useRouter } from "next/router";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="localhost:3000">
        SHS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function SearchResultsPage() {
  const router = useRouter();
  const classes = useStyles();
  const { keyword } = router.query;
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Search Results for: {keyword}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              City Name Placeholder
            </Typography>
          </Container>
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
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Link href="/property/details" passHref>
                  <a>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image="/placeholder.png"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Property {card} Name
                        </Typography>
                        <Typography>Property Description</Typography>
                        <Typography>Property Price</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                      </CardActions>
                    </Card>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default SearchResultsPage;
