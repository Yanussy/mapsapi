
import React, { useEffect, useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

import { useParams } from 'react-router-dom';

import axios from 'axios';
const Friends = () => {

  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState('');
const userEmail = localStorage.getItem('userEmail');


const getAllEmails = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/friends`, {params: { email: userEmail}});
    return response.data; // This will return the array of emails
  } catch (error) {
    console.error(
      "Error fetching emails:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await getAllEmails();
        console.log(response.data)
        setEmails(response); // Set emails in state
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Server error');
      }
    };

    fetchEmails(); // Fetch emails on component mount
  }, []);

  return (
    <div>
      <h2>{userEmail}'s Friends</h2>
  <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}
          <MDBBtn>Follow</MDBBtn>
          
          </li>
          
          
        ))}
      </ul>     
    </div>
  );
};

export default Friends;
