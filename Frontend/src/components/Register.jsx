import * as React from "react";
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext"; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  position: "relative",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function Register() {
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  // 3. Destructure handleRegister from Context
  const { handleRegister } = useContext(AuthContext);

  const validateInputs = () => {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let newErrors = {};
    let isValid = true;

    if (!name) {
      newErrors.name = "Full name is required.";
      isValid = false;
    }
    if (!username || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    try {
      // 4. Call handleRegister with form data
      const response = await handleRegister(
        data.get("name"),
        data.get("username"),
        data.get("email"),
        data.get("password"),
      );

      // 5. Success Handling
      alert("Registration Successful!");
      navigate("/auth"); // Redirect to login
    } catch (error) {
      // 6. Error Handling
      const serverMessage =
        error.response?.data?.message || "Registration failed";
      setErrors({ server: serverMessage });
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <RegisterContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              fontWeight: "bold",
            }}
          >
            Create Account
          </Typography>

          {/* Show server errors if any */}
          {errors.server && (
            <Typography
              color="error"
              variant="body2"
              sx={{ textAlign: "center", mt: 1 }}
            >
              {errors.server}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="John Doe"
                required
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                id="username"
                name="username"
                placeholder="johndoe123"
                required
                fullWidth
                error={!!errors.username}
                helperText={errors.username}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="••••••"
                required
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" size="large">
              Sign Up
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                to="/auth"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "600",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </>
  );
}
