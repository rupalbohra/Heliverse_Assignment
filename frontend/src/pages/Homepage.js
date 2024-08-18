import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import { LightPurpleButton } from "../components/buttonStyles";

// rupal
import Logo from "../assets/Logo.jpg";
import BackgroundImage from "../assets/Background.jpg";
//

const Homepage = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(5px)",
            zIndex: -1,
          }}
        />
        <Box>
          <Container
            sx={{
              backgroundColor: "white",
              width: "500px",
              height: "300px",
              boxShadow: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <StyledLink to="/choose">
                  <LightPurpleButton variant="contained" fullWidth>
                    Login
                  </LightPurpleButton>
                </StyledLink>
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                  You Can Test Login as Principle with these credentials:
                </p>
                <p style={{ fontSize: "10px" }}>
                  EMAIL: principle@classroom.com PASSWORD: Admin
                </p>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  Haven't Registered Your School Yet?{" "}
                  <Link
                    to="/Adminregister"
                    style={{ color: "#550080", marginLeft: "0.5rem" }}
                  >
                    Sign up
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* </Box> */}
    </>
    // <StyledContainer>
    //     <Grid container spacing={0}>
    //         <Grid item xs={12} md={6}>
    //             <img src={Students} alt="students" style={{ width: '100%' }} />
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //             <StyledPaper elevation={3}>
    //                 <StyledTitle>
    //                     Welcome to
    //                     <br />
    //                     School Management
    //                     <br />
    //                     System
    //                 </StyledTitle>
    //                 <StyledText>
    //                     Streamline school management, class organization, and add students and faculty.
    //                     Seamlessly track attendance, assess performance, and provide feedback.
    //                     Access records, view marks, and communicate effortlessly.
    //                 </StyledText>
    //                 <StyledBox>
    //                     <StyledLink to="/choose">
    //                         <LightPurpleButton variant="contained" fullWidth>
    //                             Login
    //                         </LightPurpleButton>
    //                     </StyledLink>
    //                     <StyledLink to="/chooseasguest">
    //                         <Button variant="outlined" fullWidth
    //                             sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
    //                         >
    //                             Login as Guest
    //                         </Button>
    //                     </StyledLink>
    //                     <StyledText>
    //                         Don't have an account?{' '}
    //                         <Link to="/Adminregister" style={{color:"#550080"}}>
    //                             Sign up
    //                         </Link>
    //                     </StyledText>
    //                 </StyledBox>
    //             </StyledPaper>
    //         </Grid>
    //     </Grid>
    // </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
