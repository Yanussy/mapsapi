import React, { useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";

function List() {
    const [user, setUser] = useState(null);
    const { email } = useParams(); 
  const [openNavColorThird, setOpenNavColorThird] = useState(false);
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
  return (
    <>
      

      <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>{email}'s map</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColorThird(!openNavColorThird)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColorThird} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Logout/in</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/friends'>Friends</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#/minigame'>Minigame</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );



}
export default List;