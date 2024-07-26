import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  IconButton,
  Box,
  Rating
} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import GEPF from '../Images/Gepf main.png';
import SendIcon from '@mui/icons-material/Send';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import Swal from 'sweetalert2';

function getDate() {
  const today = new Date();
  const options = {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const dateParts = formatter.formatToParts(today);

  const day = dateParts.find((part) => part.type === "day").value;
  const monthName = dateParts.find((part) => part.type === "month").value;
  const year = dateParts.find((part) => part.type === "year").value;
  const hours = dateParts.find((part) => part.type === "hour").value;
  const minutes = dateParts.find((part) => part.type === "minute").value;

  return `${day} ${monthName} ${year} ${hours}:${minutes}`;
}

const Visitor = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    timestamp: getDate(),
    province: "",
    consentID: "",
    Name: "",
    Surname: "",
    idNumber: "",
    relationship: "",
  });

  const [rating, setRating] = useState(null); // Add state for rating

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
      timestamp: formData.timestamp, 
      province: formData.province,
      eventType: formData.consentID,
      name: formData.Name,
      surname: formData.Surname,
      idNumber: formData.idNumber,
      relationship: formData.relationship,
      rating, // Include rating in the data to be submitted
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxzD7B8ED_uHL499Q-5yQpOCWIvHqgkjI35eMAunsRDBiwsCZFCnYcZoBphyZV696aL/exec", {
        method: "POST",
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
          timestamp: getDate(), 
          relationship: "",
        });
        setRating(null); // Clear rating
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
        Rate your Experience
      </Typography>
      <Card sx={{ width: '90%', maxWidth: '600px', margin: 'auto'}}>
        <CardMedia
          component="img"
          sx={{ 
            width: '100%',
            height: 'auto',
          }}
          image={GEPF}
          title="GEPF"
        />
      </Card>
      <Typography
        sx={{ marginTop: "5%", fontWeight: "bold" }}
        gutterBottom
      >
        How would you rate the overall RMC service at the Giyani roadshow?
      </Typography>
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{ 
            fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } // Increase the size of the stars for different screen sizes
          }}
        />
      </Box>
      <TextField
        id="Relationship"
        label="Tell us about your Experience!"
        variant="outlined"
        sx={{
          width: "50%",
          margin: "auto",
          marginBottom: "2%",
          marginTop: "2%",
        }}
        name="relationship"
        value={formData.relationship}
        onChange={handleChange}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          width: "50%",
        }}
      >
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          width: "100%",
        }}
      >
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
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <KeyboardDoubleArrowUpOutlinedIcon />
      </IconButton>
    </Paper>
  );
};

export default Visitor;
