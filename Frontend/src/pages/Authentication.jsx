import * as React from 'react';
import { useContext, useState } from 'react'; 
import { AuthContext } from '../context/AuthContext'; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
}));

export default function Authentication() {
  const { handleLogin } = useContext(AuthContext); 
  const navigate = useNavigate();
  
  const [identifierError, setIdentifierError] = useState(false);
  const [identifierErrorMessage, setIdentifierErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [serverError, setServerError] = useState(''); 

  const validateInputs = () => {
    const identifier = document.getElementById('identifier');
    const password = document.getElementById('password');

    let isValid = true;

    if (!identifier.value || identifier.value.length < 3) {
      setIdentifierError(true);
      setIdentifierErrorMessage('Please enter a valid email or username.');
      isValid = false;
    } else {
      setIdentifierError(false);
      setIdentifierErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const identifier = data.get('identifier');
    const password = data.get('password');

    try {
      setServerError('');
      
      await handleLogin(identifier, identifier, password);

      navigate('/'); 
    } catch (error) {
      console.log(error);
      
      const message = error.response?.data?.message || "Invalid credentials. Please try again.";
      setServerError(message);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          {serverError && (
            <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
              {serverError}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="identifier">Email or Username</FormLabel>
              <TextField
                error={identifierError}
                helperText={identifierErrorMessage}
                id="identifier"
                type="text"
                name="identifier"
                placeholder="email or username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            
            {/* <Link to="#" style={{ alignSelf: 'center', fontSize: '0.875rem' }}>
              Forgot your password?
            </Link> */}
          </Box>
         
        </Card>
      </SignInContainer>
    </>
  );
}