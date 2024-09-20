
import React, { useEffect, useState } from 'react';
import {getAllEmails} from '../services/authService'; // Import the service

const Friends = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await getAllEmails();
        setEmails(fetchedEmails);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h2>User Emails</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
