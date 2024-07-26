import React, { useRef, useState } from "react";
import AppBar from "../../Components/AppBar";
import Card from "../../Components/card";
import { Paper, Typography, Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../../Home/home.css";


// Customizing the theme
const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            borderColor: "#93AB4F",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#93AB4F",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#93AB4F",
          "&.Mui-checked": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#93AB4F",
          "&.Mui-checked": {
            color: "#93AB4F",
          },
        },
      },
    },
  },
});

const RePrint = () => {
  const paperRef = useRef();
  const [idNumber, setIdNumber] = useState('');
  const [respo, setRespo] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRePrint = async () => {
    if (idNumber.trim() === '') {
      showErrorAlert("Please enter a valid ID number");
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbyQlKJQqWfZp8UyZrTYNwyG9o-g7nm7EiLIYgIRkbldRBSqNQFsG-_R81lfV1XSwX88/exec?idNumber=${idNumber}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      handleDataResponse(data);
    } catch (error) {
      console.error('Error fetching person details:', error);
      showErrorAlert("Error fetching person details. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  const handleDataResponse = (response) => {
    if (response.status === 'success') {
      Swal.fire({
        title: "Success",
        text: "User details found. Proceed with ticket reprint.",
        icon: "success",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: false,
        confirmButtonColor: "#4CAF50",
      });

      const personDetails = response.data;
      navigate("/ticket", {
        state: {
          timestamp: personDetails[0],
          firstName: personDetails[8],
          lastName: personDetails[9],
          eventType: personDetails[4],
          area: personDetails[5],
          helpWith: personDetails[19],
          ticket: personDetails[21],
        },
      });
    } else {
      showErrorAlert(response.message);
    }
  };

  const showErrorAlert = (message) => {
    setRespo(message);
    setShowError(true);

    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }

    const timeoutId = setTimeout(() => {
      setShowError(false);
      setRespo("");
    }, 9000);

    setErrorTimeout(timeoutId);
  };

  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <AppBar />
      <Card />
      <Paper
        ref={paperRef}
        sx={{
          p: 4,
          margin: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#fdfdfd",
          boxShadow: 3,
        }}
      >
        <Box sx={{ textAlign: "center", width: { xs: '90%', sm: '70%', md: '60%', lg: '50%' } }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Ticket Re-Print</Typography>
          <TextField
            id="id-number"
            label="Enter ID number to Re-Print"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#93AB4F' },
              '& .MuiOutlinedInput-input.Mui-focused': { color: 'green' }
            }}
            name="id-number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <Typography className={showError ? "blink-text" : ""} sx={{ mb: 1, fontWeight: 'bold', color: 'red' }}>{respo}</Typography>
          <Button
  variant="contained"
  sx={{
    backgroundColor: loading ? "#FFFFFF" : "#93AB4F",
    color: loading ? "#000000" : "#FFFFFF",
    "&:hover": {
      backgroundColor: loading ? "#FFFFFF" : "#DF6E46",
    },
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    mt: 2,
    '&.Mui-disabled': { 
      backgroundColor: 'white', 
      color: '#FFFFFF', 
    },
  }}
  onClick={handleRePrint}
  disabled={loading}
>
  {loading ? (
    <div className="loader">Loading...</div>
  ) : (
    "Re-Print"
  )}
</Button>
        </Box>
      </Paper>
    </React.Fragment>
    </ThemeProvider>
  );
}

export default RePrint;
