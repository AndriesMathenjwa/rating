import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  IconButton,
  Link
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import Swal from 'sweetalert2';

const VisitorComponent = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    helpWith: "",
    consentID: "",
    Name: "",
    Surname: "",
    idNumber: "",
    relationship: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVisitor = async () => {
    setLoading(true);

    const visitorData = {
      province: formData.helpWith,
      eventType: formData.consentID,
      name: formData.Name,
      surname: formData.Surname,
      idNumber: formData.idNumber,
      relationship: formData.relationship,
    };

    try {
      const response = await fetch("YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
        Swal.fire({
          title: "Success",
          text: "Visitor form submitted successfully!",
          icon: "success",
          customClass: {
            confirmButton: "swal-confirm-button",
          },
          buttonsStyling: false,
          confirmButtonColor: "#4CAF50",
        });
        // Clear form
        setFormData({
          helpWith: "",
          consentID: "",
          Name: "",
          Surname: "",
          idNumber: "",
          relationship: "",
        });
      } else {
        console.error("Failed to submit form:", response.statusText);
        Swal.fire("Error", "Failed to submit form", "error");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      Swal.fire({
        title: "Error",
        text: "Connection timeout...Please try again",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: false,
        confirmButtonColor: "#4CAF50",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "3%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#93AB4F",
          marginTop: 2,
        }}
        paragraph
      >
        Visitor Registration
      </Typography>
      <FormControl
        sx={{
          width: "50%",
          margin: "auto",
          marginBottom: "4px",
          marginTop: "2%",
        }}
      >
        <InputLabel
          id="Member-label"
          sx={{
            backgroundColor: "white",
            padding: "0 4px",
            transform: "translate(14px, -6px) scale(0.75)",
            zIndex: 1,
          }}
        >
          Province *
        </InputLabel>
        <Select
          labelId="Member-label"
          id="Member-required"
          value={formData.helpWith}
          name="helpWith"
          label="Member Type *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>- Choose -</em>
          </MenuItem>
          <MenuItem value="Gauteng">Gauteng</MenuItem>
          <MenuItem value="Limpopo">Limpopo</MenuItem>
          <MenuItem value="Mpumalanga">Mpumalanga</MenuItem>
          <MenuItem value="North West">North West</MenuItem>
          <MenuItem value="Northern Cape">Northern Cape</MenuItem>
          <MenuItem value="FreeState">FreeState</MenuItem>
          <MenuItem value="Eastern Cape">Eastern Cape</MenuItem>
          <MenuItem value="Western Cape">Western Cape</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl
        sx={{ width: "50%", margin: "auto", marginBottom: "2px" }}
      >
        <FormLabel id="popi_act_label">
          <Typography sx={{ marginTop: "5%" }} gutterBottom>
            Event Type *
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="consentID"
          defaultValue=""
          name="consentID"
          onChange={handleChange}
        >
          <FormControlLabel value="RMC" control={<Radio />} label="RMC" />
          <FormControlLabel value="GEPF Day" control={<Radio />} label="GEPF Day" />
        </RadioGroup>
      </FormControl>
      <TextField
        id="Name"
        label="Name *"
        variant="outlined"
        sx={{
          width: "50%",
          margin: "auto",
          marginBottom: "2%",
          marginTop: "2%",
        }}
        name="Name"
        value={formData.Name}
        onChange={handleChange}
      />
      <TextField
        id="Surname"
        label="Surname *"
        variant="outlined"
        sx={{
          width: "50%",
          margin: "auto",
          marginBottom: "2%",
          marginTop: "2%",
        }}
        name="Surname"
        value={formData.Surname}
        onChange={handleChange}
      />
      <TextField
        id="ID number"
        label="ID number *"
        variant="outlined"
        sx={{
          width: "50%",
          margin: "auto",
          marginBottom: "2%",
          marginTop: "2%",
        }}
        name="ID number"
        value={formData.idNumber}
        onChange={handleChange}
      />
      <TextField
        id="Relationship"
        label="Relationship *"
        variant="outlined"
        sx={{
          width: "50%",
          margin: "auto",
          marginBottom: "2%",
          marginTop: "2%",
        }}
        name="Relationship"
        value={formData.relationship}
        onChange={handleChange}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          width: "100%",
        }}
      >
        <Link style={{ flex: 1, textAlign: "left", marginLeft: "24.6%" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#93AB4F",
              color: "#FFFFFF",
              width: "20%",
              marginLeft: "5px",
              "&:hover": { backgroundColor: "#DF6E46" },
            }}
            endIcon={<SendIcon />}
            onClick={handleVisitor}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={25}
                  sx={{ marginRight: "8px", color: "#93AB4F" }}
                />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Link>
      </div>
      <IconButton
        sx={{
          right: "20px",
          bottom: "20px",
          position: "fixed",
          backgroundColor: "#DF6E46",
          "&:hover": { backgroundColor: "#93AB4F" },
        }}
        aria-label="scroll to top"
        onClick={scrollToTop}
      >
        <KeyboardDoubleArrowUpOutlinedIcon />
      </IconButton>
    </Paper>
  );
};

export default VisitorComponent;
