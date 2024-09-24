
import React, { useEffect, useState } from 'react';
import {getAllEmails} from '../services/authService'; // Import the service
import { useParams } from 'react-router-dom';

import axios from 'axios';
const Friends = () => {


  


  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/${email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUserData();
  }, [email]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const allEmails = await getAllEmails();
        console.log(allEmails);
        setEmails(allEmails); // Set emails in state
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Server error');
      }
    };

    fetchEmails(); // Fetch emails on component mount
  }, []);

  return (
    <div>
      <h2>{email}'s Emails</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
