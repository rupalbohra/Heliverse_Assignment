import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const allSlots = ["9-10 AM", "10-11 AM", "11-12 PM", "1-2 PM", "2-3 PM"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TeacherViewTimeTable = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const teacherId = currentUser?._id || "";

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getFullTimeTable"
        );
        const data = response.data;

        const filteredData = data.filter(
          (entry) => entry.teacherId._id === teacherId
        );

        const organizedData = allSlots.reduce((acc, slot) => {
          acc[slot] = days.reduce((dayAcc, day) => {
            dayAcc[day] = "Free";
            return dayAcc;
          }, {});
          return acc;
        }, {});

        filteredData.forEach((entry) => {
          if (organizedData[entry.timeSlot]) {
            organizedData[entry.timeSlot][
              entry.day
            ] = entry.classId.sclassName;
          }
        });

        setTimetable(organizedData);
      } catch (err) {
        setError("Error fetching timetable data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [teacherId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="md" style = {{marginBottom: "10vh"}}>
      <h1 style={{ marginTop: "10vh", marginBottom: "5vh" }}>Teacher Weekly Timetable</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Time Slot</TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Monday</TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Tuesday</TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Wednesday</TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Thursday</TableCell>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Friday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allSlots.map((slot) => (
              <TableRow key={slot}>
                <TableCell style={{ border: '1px solid black' }}>{slot}</TableCell>
                <TableCell style={{
                  fontWeight: timetable[slot]?.Monday !== "Free" ? 'bold' : 'normal',
                  fontSize: timetable[slot]?.Monday === "Free" ? 'small' : 'normal',
                  border: '1px solid black'
                }}>
                  {timetable[slot]?.Monday}
                </TableCell>
                <TableCell style={{
                  fontWeight: timetable[slot]?.Tuesday !== "Free" ? 'bold' : 'normal',
                  fontSize: timetable[slot]?.Tuesday === "Free" ? 'small' : 'normal',
                  border: '1px solid black'
                }}>
                  {timetable[slot]?.Tuesday}
                </TableCell>
                <TableCell style={{
                  fontWeight: timetable[slot]?.Wednesday !== "Free" ? 'bold' : 'normal',
                  fontSize: timetable[slot]?.Wednesday === "Free" ? 'small' : 'normal',
                  border: '1px solid black'
                }}>
                  {timetable[slot]?.Wednesday}
                </TableCell>
                <TableCell style={{
                  fontWeight: timetable[slot]?.Thursday !== "Free" ? 'bold' : 'normal',
                  fontSize: timetable[slot]?.Thursday === "Free" ? 'small' : 'normal',
                  border: '1px solid black'
                }}>
                  {timetable[slot]?.Thursday}
                </TableCell>
                <TableCell style={{
                  fontWeight: timetable[slot]?.Friday !== "Free" ? 'bold' : 'normal',
                  fontSize: timetable[slot]?.Friday === "Free" ? 'small' : 'normal',
                  border: '1px solid black'
                }}>
                  {timetable[slot]?.Friday}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TeacherViewTimeTable;
