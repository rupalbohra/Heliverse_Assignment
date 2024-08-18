import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
import SeeNotice from "../../components/SeeNotice";
import CountUp from "react-countup";
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";

const StudentHomePage = () => {
  const dispatch = useDispatch();

  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { subjectsList } = useSelector((state) => state.sclass);

  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const classID = currentUser.sclassName._id;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
  }, [dispatch, currentUser._id, classID]);

  const numberOfSubjects = subjectsList && subjectsList.length;

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];
  return (
    <>

    {/* rupal */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} display="flex" justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm = {4}>
            <StyledPaper>
              <img src={Assignment} alt="Subjects" />
              <Title>{currentUser.sclassName.sclassName}</Title>
              <Typography color="white" variant="h6">
                .
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}  sm = {4}>
            <StyledPaper>
              <img src={Subject} alt="Subjects" />
              <Title>
                Total Subjects
                <Typography color="green" variant="h5">
                  {numberOfSubjects}
                </Typography>
              </Title>
              <Typography color="white" variant="h6">
                .
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}  sm = {4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                backgroundColor: "white",
              }}
            >
              {response ? (
                <Typography variant="h6">No Attendance Found</Typography>
              ) : (
                <>
                  {loading ? (
                    <Typography variant="h6">Loading...</Typography>
                  ) : (
                    <>
                      {subjectAttendance &&
                      Array.isArray(subjectAttendance) &&
                      subjectAttendance.length > 0 ? (
                        <>
                          <Typography sx={{ fontWeight: "bold" }}>
                            Attendance Summary
                          </Typography>
                          <CustomPieChart data={chartData} />
                        </>
                      ) : (
                        <Typography variant="h6">
                          No Attendance Found
                        </Typography>
                      )}
                    </>
                  )}
                </>
              )}
            </Paper>
          </Grid>

          {/*  */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// rupal
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;

  height: 330px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
//

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default StudentHomePage;
