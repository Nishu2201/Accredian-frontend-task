import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, TextField, Container, Avatar, Typography, Alert } from '@mui/material';

const SignUp = () => {
  const [responseMessage, setResponseMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async values => {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          setResponseMessage({ type: 'error', message: errorResponse.error });
          return;
        }

        // Signup successful
        setResponseMessage({ type: 'success', message: 'Signup successful' });
      } catch (error) {
        // Log detailed error information
        console.error('Error during signup:', error);
        setResponseMessage({ type: 'error', message: 'Internal Server Error' });
      }
    },
  });

  const handleCloseAlert = () => {
    setResponseMessage(null);
  };

  const ConStyle = {
    padding: '30px 20px',
    width: 350,
    margin: '70px auto',
    background: 'linear-gradient(transparent,#d7e9ea,#d7e9ea,transparent)',
    boxdropfilter: 'transparent',
    boxShadow: '0 8px 32px 0 rgba(31,38,165,0.37)',
    borderradius: '10px',
  };

  const Avstyle = { background: 'blue', margin: '0 110px ', justifyContent: 'center' };

  return (
    <Container style={ConStyle}>
      <Avatar style={Avstyle}></Avatar>
      <Typography variant="h4" align="center">
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) || formik.errors.email}
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
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/login" style={{ margin: '10px', marginLeft:'80px'  }}>
      Login
    </Button>
      </form>

      {responseMessage && (
        <Alert severity={responseMessage.type} onClose={handleCloseAlert}variant='filled' style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 9999}}>
          {responseMessage.message}
        </Alert>
      )}
    </Container>
  );
};

export default SignUp;
