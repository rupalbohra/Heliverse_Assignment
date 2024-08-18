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

const StudentViewTimeTable = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const classId = currentUser?.sclassName?._id || "";

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getFullTimeTable"
        );
        const data = response.data;
        console.log(data);
        const filteredData = data.filter((entry) => entry.classId._id === classId);

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
            ] = `${entry.teacherId.name}  (${entry.teacherId.teachSubject.subName})`;
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
  }, [classId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="md">
      <h1 style={{ marginTop: "10vh", marginBottom: "5vh" }}>
        Student Weekly Timetable
      </h1>
      <TableContainer component={Paper} style={{ border: "1px solid black" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerStyle}>Time Slot</TableCell>
              <TableCell style={headerStyle}>Monday</TableCell>
              <TableCell style={headerStyle}>Tuesday</TableCell>
              <TableCell style={headerStyle}>Wednesday</TableCell>
              <TableCell style={headerStyle}>Thursday</TableCell>
              <TableCell style={headerStyle}>Friday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allSlots.map((slot) => (
              <TableRow key={slot}>
                <TableCell style={headerStyle}>{slot}</TableCell>
                {days.map((day) => (
                  <TableCell
                    key={day}
                    style={
                      timetable[slot]?.[day] === "Free"
                        ? { fontSize: "0.8em" }
                        : { fontWeight: "bold" }
                    }
                  >
                    {timetable[slot]?.[day] || "Free"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const headerStyle = {
  backgroundColor: "black",
  color: "white",
  border: "1px solid black",
};

export default StudentViewTimeTable;
