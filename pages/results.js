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

// Import your properties data
import propertiesData from "../public/properties.json";

const useStyles = makeStyles((theme) => ({
  // Your styles here
}));

// TODO: Remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function SearchResultsPage() {
  const router = useRouter();
  const classes = useStyles();
  // Provide a default value for keyword when it's not available
  const { keyword = "" } = router.query;

  // Filter properties based on the search keyword and approval status
  const filteredProperties = propertiesData.properties
    .filter(
      (property) =>
        property.address.toLowerCase().includes(keyword.toLowerCase()) ||
        property.propertyownerName
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||
        property.description.toLowerCase().includes(keyword.toLowerCase())
      // Add more criteria if needed
    )
    .filter((property) => property.approvalStatus === "1");

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
              {keyword}
            </Typography>
          </Container>
          <Container maxWidth="sm">
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
              onClick={() => {
                const searchKeyword =
                  document.getElementById("searchInput").value;
                router.push({
                  pathname: "/results",
                  query: { keyword: searchKeyword },
                });
              }}
            >
              Search
            </Button>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* Display property details or no results message */}
          {filteredProperties.length === 0 ? (
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Sorry, no results found.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {filteredProperties.map((property, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Link href={`/property/${property.id}`} passHref>
                    <a target="_blank" rel="noopener noreferrer">
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
                          image={(() => {
                            const imageUrl = property.images[0];
                            console.log(imageUrl);
                            return imageUrl;
                          })()} // Immediately invoked function to log and return the image URL
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {property.propertyownerName}'s Property
                          </Typography>
                          <Typography>{property.address}</Typography>
                          <Typography>{property.description}</Typography>
                          <Typography>{`Price: $${property.price}`}</Typography>
                          {/* Add more details as needed */}
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
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default SearchResultsPage;
