import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom"; // Use 'useNavigate' for navigation

function Login() {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const payload = { email, password };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.log('Request successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email); // Save user email
      navigate(`/user/${data.user.email}`); // Redirect to user page
    } catch (error) {
      console.error('Request failed:', error.message);
      setErrorMessage('Request failed. Please check your email and password.');
    }
  };
  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login or Signup</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-75'
                  labelClass='text-white'
                  label='username'
                  id='formControlLg'
                  type='tet'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-75'
                  labelClass='text-white'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <p className="small mb-3 pb-lg-2">
                  <a className="text-white-50" href="#!">Forgot password?</a>
                </p>
                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' type="submit">
                  Login / Signup
                </MDBBtn>
              </form>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <Link to="/maps" className="text-white-50 fw-bold">Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
