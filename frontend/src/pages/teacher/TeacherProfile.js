import React from "react";
import styled from "styled-components";
// rupal
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import TeacherDetailsImg from "../../assets/TeacherProfile.png";
//
import { useSelector } from "react-redux";

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <>
      <img src={TeacherDetailsImg}></img>
      <Grid container spacing={2} sx = {{marginTop: "20px"}}>
        {/* Card for Name */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>Name: {currentUser.name}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Email */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Email: {currentUser.email}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Class */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Class: {teachSclass.sclassName}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Subject */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Subject: {teachSubject.subName}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for School */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>School: {teachSchool.schoolName}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TeacherProfile;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
