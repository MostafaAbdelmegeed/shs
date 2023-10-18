import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormGroup,
  FormLabel,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  HomeOutlined,
  PoolOutlined,
  FitnessCenterOutlined,
  AcUnitOutlined,
  WifiOutlined,
  KitchenOutlined,
} from "@mui/icons-material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PropertyForm() {
  const [previewImages, setPreviewImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          setPreviewImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl component="fieldset" sx={{ m: 1 }}>
          <FormLabel component="legend">Property Details</FormLabel>
          <FormGroup>
            <TextField
              name="propertyName"
              label="Property Name"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
            />
            <TextField
              name="propertySpace"
              label="Property Space (ft²)"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
            />
            <TextField
              name="streetAddress"
              label="Street Address"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
            />
            <TextField
              name="city"
              label="City"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
            />
            <TextField
              name="state"
              label="State"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
            />
            <TextField
              name="zipCode"
              label="Zip Code"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
              inputProps={{
                pattern: "^\\d{5}(?:[-\\s]\\d{4})?$",
              }}
            />
            <Select
              name="propertyType"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Property Type
              </MenuItem>
              <MenuItem value={"room"}>Room</MenuItem>
              <MenuItem value={"house"}>House</MenuItem>
              <MenuItem value={"apartment"}>Apartment</MenuItem>
              <MenuItem value={"studio"}>Studio</MenuItem>
            </Select>
            <Select
              name="leaseTerm"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Lease Term
              </MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
              <MenuItem value={"threeMonths"}>Three Months</MenuItem>
              <MenuItem value={"sixMonths"}>Six Months</MenuItem>
              <MenuItem value={"annual"}>Annual</MenuItem>
            </Select>
            <TextField
              name="price"
              label="Price ($/Month)"
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      {/*<FormControlLabel control={<Checkbox color='default' />} label={<><PoolOutlined />Bills Inclusion</>} sx={{ m: 1 }} />*/}
      <Grid item xs={12}>
        <FormControl component="fieldset" sx={{ m: 1 }}>
          <FormLabel component="legend">Utilities</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox color="default" />}
              label={
                <>
                  <HomeOutlined />
                  Washer/Dryer
                </>
              }
              sx={{ m: 1 }}
            />
            <FormControlLabel
              control={<Checkbox color="default" />}
              label={
                <>
                  <FitnessCenterOutlined />
                  Gym
                </>
              }
              sx={{ m: 1 }}
            />
            <FormControlLabel
              control={<Checkbox color="default" />}
              label={
                <>
                  <AcUnitOutlined />
                  AC
                </>
              }
              sx={{ m: 1 }}
            />
            <FormControlLabel
              control={<Checkbox color="default" />}
              label={
                <>
                  <WifiOutlined />
                  WIFI
                </>
              }
              sx={{ m: 1 }}
            />
            <FormControlLabel
              control={<Checkbox color="default" />}
              label={
                <>
                  <KitchenOutlined />
                  Kitchen Equipment
                </>
              }
              sx={{ m: 1 }}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" sx={{ m: 1 }}>
          <FormLabel component="legend">Upload Images</FormLabel>
          {previewImages.length > 0 ? (
            <>
              {currentImageIndex > 0 && (
                <ArrowBackIosIcon
                  onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  }}
                />
              )}
              <img
                src={previewImages[currentImageIndex]}
                alt="Preview"
                style={{ width: "256px", height: "256px", objectFit: "cover" }}
              />
              {currentImageIndex < previewImages.length - 1 && (
                <ArrowForwardIosIcon
                  onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  }}
                />
              )}
            </>
          ) : (
            <ImageOutlinedIcon
              style={{ fontSize: "256px", color: "lightgray" }}
            />
          )}
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden multiple onChange={handleImageUpload} />
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
}
