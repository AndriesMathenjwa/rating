import React, { useRef, useState } from "react";
import AppBar from "../Components/AppBar";
import Visitors from "../Visitors/visitors";
import { useNavigate } from "react-router-dom";
import Start from "../Components/start";
import Card from "../Components/card";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Toolbar from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import SignatureCanvas from "react-signature-canvas";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import "./home.css";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@mui/material";
//-------------------------------


import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import { styled } from '@mui/system';



//--------------------------------


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
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#D81730",
          "&:hover": {
            color: "#A01523",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: "#93AB4F",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#93AB4F", // Set primary color to green
    },
    secondary: {
      main: "#D81730", // Keeping secondary color as maroon (or you can change it)
    },
  },
});



const ContentContainer = styled(Box)(({ theme, open }) => ({
  display: "flex",
  flexGrow: 1,
  marginTop: 30,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? 0 : -130,
  width: open ? `calc(100% - 240px)` : "100%",
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  width: "95%",
}));


const CapitalizedTab = styled(Tab)(({ theme }) => ({
  textTransform: 'capitalize',
  color: '#8bc34a', // Set the text color to green for inactive state
  '&.Mui-selected': {
    color: '#8bc34a', // Set the text color to green for active state
  },
}));

const provinceOptions = {
  // Gauteng: [
  //   //"Vaal(Sebokeng)", "West Rand(kagiso)", //,
  // ],
  Limpopo: ["Thohoyandou", "Giyani"],
  // Mpumalanga: ["Nkomazi", "Carolina"],
  // "North West": ["Zeerust", "Taung"],
  // "Northern Cape": ["Springbok", "Upington"],
  // FreeState: ["Bethlehem", "Qwaqwa"],
  // KZN: ["Pietermaritzburg", "Durban"],
  // "Eastern Cape": ["Mthatha", "Bizana", "East London"],
  // "Western Cape": ["Cape Town"],
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
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

console.log(getDate());

let nextId = 1;

function generateNextId() {
  const idString = String(nextId).padStart(3, "0");
  nextId += 1;
  return idString;
}

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mainFormRef = useRef(null);
  const signCanvasRef = useRef(null);
  const [registrationType, setRegistrationType] = useState("");
  const [ticket, setTicket] = useState("");

  const handleRegistrationTypeChange = (e) => {
    const selectedType = e.target.value;
    setRegistrationType(selectedType);

    if (selectedType === "On-site Registration") {
      // const uniqueId = generateNextId();
      const uniqueId = uuidv4().substring(0, 3);
      setTicket(uniqueId);
      console.log("Generated Ticket ID:", uniqueId); // Debugging log
    } else {
      setTicket("");
    }
  };

  // const handleRegistrationTypeChange = (e) => {
  //   const selectedType = e.target.value;
  //   setRegistrationType(selectedType);
  // };

  const [formData, setFormData] = useState({
    timestamp: getDate(),
    disclaimer: "",
    province: "",
    eventType: "",
    area: "",
    title: "",
    idNumber: "",
    pensionNumber: "",
    department: "",
    memberType: "",
    phoneNumber: "",
    email: "",
    consentID: "",
    phone: "",
    physicalAddress: "",
    helpWith: [],
    otherText: "",
    campaignSource: "",
    initials: "",
    firstName: "",
    lastName: "",
    ticket: "",
    signatureUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlevChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  



  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedHelpWith = checked
      ? [...formData.helpWith, value]
      : formData.helpWith.filter((item) => item !== value);
    setFormData({ ...formData, helpWith: updatedHelpWith });
  };

  const handleProvinceChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, province: value, area: "" }); // Reset area when province changes
  };

  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      if (signCanvasRef.current) {
        const signatureUrl = signCanvasRef.current
          .getTrimmedCanvas()
          .toDataURL();
        console.log("Signature URL:", signatureUrl);

        const completeFormData = {
          ...formData,
          signatureUrl,
          registrationType,
          ticket,
        };
        console.log("Complete Form Data:", completeFormData); // Debugging log

        const finalFormData = new FormData();
        finalFormData.append("Timestamp", formData.timestamp);
        Object.entries(completeFormData).forEach(([key, value]) => {
          finalFormData.append(key, value);
        });

        setLoading(true);
        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxf0AH9CWpj-JSm52QjcXus_QG9zAVJdZ4EbZx_j2VdGDECSz-38T4jfkzoswpwVC-g/exec",
            {
              method: "POST",
              body: finalFormData,
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("Form submitted successfully:", responseData);
            Swal.fire({
              title: "Success",
              text: "Form submitted successfully!",
              icon: "success",
              customClass: {
                confirmButton: "swal-confirm-button",
              },
              buttonsStyling: false,
              confirmButtonColor: "#4CAF50",
            });
            navigate("/ticket", {
              state: {
                timestamp: formData.timestamp,
                firstName: formData.firstName,
                lastName: formData.lastName,
                eventType: formData.eventType,
                area: formData.area,
                helpWith: formData.helpWith,
                otherText: formData.otherText,

              },
            });

            setFormData({
              timestamp: "",
              disclaimer: "",
              province: "",
              eventType: "",
              area: "",
              title: "",
              idNumber: "",
              pensionNumber: "",
              department: "",
              memberType: "",
              phoneNumber: "",
              email: "",
              consentID: "",
              phone: "",
              physicalAddress: "",
              helpWith: [],
              campaignSource: "",
              initials: "",
              firstName: "",
              lastName: "",
              ticket: "",
              signatureUrl: "",
            });

            if (registrationType === "On-site Registration") {
              setTicket("");
            }

            setRegistrationType("");
          } else {
            console.error("Failed to submit form:", response.statusText);
            Swal.fire("Error", "Failed to submit form", "error");
          }
        } catch (error) {
          console.error("An error occurred while submitting the form:", error);
          // Swal.fire("Error", "Connection timeout...Please try again", "error");
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
      }
    }
  };
  //------------------------------------------
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
      const response = await fetch("https://script.google.com/macros/s/AKfycbw7GeG0JiIzCagHlmNHE-k6NDcf-F9pww6eU5KjAkpub5guzw8zl34QbvpHpz32PCY4/exec", {
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
  
  //------------------------------------------
  const validateForm = () => {
    const {
      disclaimer,
      province,
      eventType,
      area,
      title,
      idNumber,
      department,
      memberType,
      email,
      consentID,
      phone,
      physicalAddress,
      helpWith,
      campaignSource,
      registrationType,
      initials,
      firstName,
      lastName,
    } = formData;

    if (!disclaimer) {
      Swal.fire({
        title: "Error",
        text: "Please provide a disclaimer",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!province) {
      Swal.fire({
        title: "Error",
        text: "Please select a province",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!eventType) {
      Swal.fire({
        title: "Error",
        text: "Please provide an event type",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!area) {
      Swal.fire({
        title: "Error",
        text: "Please provide an area",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!title) {
      Swal.fire({
        title: "Error",
        text: "Please provide a title",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!initials) {
      Swal.fire({
        title: "Error",
        text: "Please provide initials",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!firstName) {
      Swal.fire({
        title: "Error",
        text: "Please provide a first name",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!lastName) {
      Swal.fire({
        title: "Error",
        text: "Please provide a last name",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!consentID) {
      Swal.fire({
        title: "Error",
        text: "Please select consent option",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    } else if (consentID === "No") {
      Swal.fire({
        title: "Error",
        text: "Please provide consent in order to process your information",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!/^\d{13}$/.test(idNumber)) {
      Swal.fire({
        title: "Error",
        text: "ID number must be 13 digits",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!department) {
      Swal.fire({
        title: "Error",
        text: "Please provide a department",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!memberType) {
      Swal.fire({
        title: "Error",
        text: "Please select a member type",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      Swal.fire({
        title: "Error",
        text: "Phone number must be 10 digits",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    // if (!physicalAddress) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Please provide a physical address",
    //     icon: "error",
    //     customClass: {
    //       confirmButton: "swal-confirm-button", // Custom class for the confirmation button
    //     },
    //     buttonsStyling: false, // Disable default styling to use custom styles
    //     confirmButtonColor: "#4CAF50", // Background color for the confirmation button
    //   });
    //   return false;
    // }

    if (!helpWith) {
      Swal.fire({
        title: "Error",
        text: 'Please select at least one option for "What do you need help with?"',
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!campaignSource) {
      Swal.fire({
        title: "Error",
        text: "Please provide a campaign source",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    // if (!registrationType) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Please provide a Registration Type",
    //     icon: "error",
    //     customClass: {
    //       confirmButton: "swal-confirm-button",
    //     },
    //     buttonsStyling: false,
    //     confirmButtonColor: "#4CAF50",
    //   });
    //   return false;
    // }

    if (signCanvasRef.current.isEmpty()) {
      Swal.fire({
        title: "Error",
        text: "Please Sign",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }
    return true;
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <AppBar />
        <Toolbar/>
          <Visitors/>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default Home;
