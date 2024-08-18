import React, { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    // Rupal
  Grid,
  Card,
  CardContent,
//   
  Button,
  Container,
  Typography,
} from "@mui/material";

// rupal
import TeacherDetailsImg from "../../../assets/TeacherDetails.png"
// 
const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
            {/* rupal */}
            <img src = {TeacherDetailsImg}></img>
          <Grid container spacing={3} sx = {{ marginTop: "10px"}}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, backgroundColor: "#f5f5f5" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Teacher Name: {teacherDetails?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, backgroundColor: "#f5f5f5" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Class Name: {teacherDetails?.teachSclass?.sclassName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {isSubjectNamePresent ? (
              <>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ boxShadow: 3, backgroundColor: "#f5f5f5" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Subject Name: {teacherDetails?.teachSubject?.subName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ boxShadow: 3, backgroundColor: "#f5f5f5" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Subject Sessions:{" "}
                        {teacherDetails?.teachSubject?.sessions}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ) : (
              <Button variant="contained" onClick={handleAddSubject}>
                Add Subject
              </Button>
            )}
          </Grid>
          {/*  */}
        </Container>
      )}
    </>
  );
};

export default TeacherDetails;
