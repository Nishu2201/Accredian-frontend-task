import React, { useState } from 'react';
import{Link} from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, TextField, Container, Avatar, Typography, Alert } from '@mui/material';

function Login() {
  const [responseMessage, setResponseMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    onSubmit: async (values) => {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(values),
          });
      
          if (response.ok) {
            // Authentication successful
            setResponseMessage({ type: 'success', message: 'Login successful' });
          } else {
            // Authentication failed
            const errorResponse = await response.json();
            setResponseMessage({ type: 'error', message: `Login failed: ${errorResponse.error}` });
          }
        } catch (error) {
          console.error('Error during login:', error);
          setResponseMessage({ type: 'error', message: 'Internal Server Error' });
        }
      },
  });

  const handleCloseAlert = () => {
    setResponseMessage(null);
  };

  const logStyle = {
    padding: '30px 20px',
    width: 300,
    height: '70vh',
    margin: '20px auto',
    background: 'linear-gradient(transparent,#d7e9ea,#d7e9ea,transparent)',
    boxdropfilter: 'transparent',
    boxShadow: '0 8px 32px 0 rgba(31,38,165,0.37)',
    borderradius: '10px',
  };

  const Avstyle = { background: 'blue', margin: '0 110px ', justifyContent: 'center' };

  return (
    <Container style={logStyle}>
      <Avatar style={Avstyle}></Avatar>

      <Typography variant="h4" align="center">
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Username or Email"
          name="usernameOrEmail"
          value={formik.values.usernameOrEmail}
          onChange={formik.handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/signup" style={{ margin: '10px', marginLeft:'80px'  }}>
      Signup
    </Button>
      </form>

      {responseMessage && (
        <Alert severity={responseMessage.type} onClose={handleCloseAlert} variant='filled' style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 9999}}>
          {responseMessage.message}
        </Alert>
      )}
    </Container>
  );
}

export default Login;
