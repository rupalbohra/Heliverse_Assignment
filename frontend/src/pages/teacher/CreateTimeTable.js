import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableSlots,
  createTimetable,
} from "../../redux/teacherRelated/teacherHandle";
import { setAvailableSlots } from "../../redux/teacherRelated/teacherSlice";

import TeacherViewTimeTable from "./TeacherViewTimeTable";

const CreateTimetable = () => {
  const dispatch = useDispatch();
  const { availableSlots, loading, error } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);
  const [day, setDay] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");

  const teacherId = currentUser ? currentUser._id : "";
  const classId = currentUser?.teachSclass?._id || "";

  useEffect(() => {
    if (day) {
      dispatch(fetchAvailableSlots(day));
    } else {
      dispatch(setAvailableSlots([]));
    }
  }, [day, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseMessage = await dispatch(
        createTimetable(teacherId, classId, day, timeSlot)
      );

      alert("Time Slot Has Been Added");
      window.location.reload();

      setDay("");
      setTimeSlot("");
    } catch (error) {
      console.error("Error creating timetable:", error.message);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              select
            >
              <MenuItem value="">Select a day</MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
            </TextField>

            <TextField
              label="Time Slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
              select
              disabled={!availableSlots.length}
            >
              <MenuItem value="">Select a time slot</MenuItem>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                  <MenuItem key={index} value={slot}>
                    {slot}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No slots available</MenuItem>
              )}
            </TextField>

            {/* Message to inform user if no time slots are available */}
            {day && availableSlots.length === 0 && (
              <Typography color="error" variant="body2">
                No time slots left for {day}. Please select a different day.
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Timetable"
              )}
            </Button>
            {message && <div>{message}</div>}
            {error && <div>Error: {error}</div>}
          </Stack>
        </form>
      </Container>

      <TeacherViewTimeTable />
    </>
  );
};

export default CreateTimetable;

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   MenuItem,
//   CircularProgress,
//   Stack,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createTimetable,
//   fetchAvailableSlots,
// } from "../../redux/teacherRelated/teacherHandle";

// const CreateTimetable = () => {
//   const dispatch = useDispatch();
//   const { availableSlots, loading, error } = useSelector(
//     (state) => state.teacher
//   );

//   const [teacherId, setTeacherId] = useState("");
//   const [classId, setClassId] = useState("");
//   const [day, setDay] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");

//   useEffect(() => {
//     if (day) {
//       dispatch(fetchAvailableSlots(day));
//     }
//   }, [day, dispatch]);

//   const handleSubmit = async(event) => {
//     event.preventDefault();
//     // dispatch(createTimetable(teacherId, classId, day, timeSlot));
//     try {
//         await dispatch(createTimetable(teacherId, classId, day, timeSlot));
//         // Handle success
//       } catch (error) {
//         console.error("Error creating timetable:", error);
//         // Handle error
//       }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           <TextField
//             label="Teacher ID"
//             value={teacherId}
//             onChange={(e) => setTeacherId(e.target.value)}
//             required
//           />
//           <TextField
//             label="Class ID"
//             value={classId}
//             onChange={(e) => setClassId(e.target.value)}
//             required
//           />
//           <TextField
//             label="Day"
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//             required
//             select
//           >
//             <MenuItem value="Monday">Monday</MenuItem>
//             <MenuItem value="Tuesday">Tuesday</MenuItem>
//             <MenuItem value="Wednesday">Wednesday</MenuItem>
//             <MenuItem value="Thursday">Thursday</MenuItem>
//             <MenuItem value="Friday">Friday</MenuItem>
//           </TextField>
//           <TextField
//             label="Time Slot"
//             value={timeSlot}
//             onChange={(e) => setTimeSlot(e.target.value)}
//             required
//             select
//           >
//             {Array.isArray(availableSlots) && availableSlots.length > 0 ? (
//               availableSlots.map((slot, index) => (
//                 <MenuItem key={index} value={slot}>
//                   {slot}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No slots available</MenuItem>
//             )}
//           </TextField>

//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             sx={{ mt: 2 }}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Create Timetable"
//             )}
//           </Button>
//           {error && <div>Error: {error}</div>}
//         </Stack>
//       </form>
//     </Container>
//   );
// };

// export default CreateTimetable;

// done one feature

// import React, { useState } from "react";
// import axios from "axios";

// const CreateTimetable = () => {
//   const [teacherId, setTeacherId] = useState("");
//   const [classId, setClassId] = useState("");
//   const [day, setDay] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [message, setMessage] = useState("");

//   const fetchAvailableSlots = async (selectedDay) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/availableSlots/${selectedDay}`
//       );
//       console.log("API Response:", response); // Log full response
//       console.log("Available slots:", response.data); // Log available slots data
//       setAvailableSlots(response.data);
//     } catch (error) {
//       console.error("Error fetching available slots:", error); // Log error if any
//       setMessage("Error fetching available slots");
//     }
//   };

//   const handleDayChange = (e) => {
//     const selectedDay = e.target.value;
//     setDay(selectedDay);
//     if (selectedDay) {
//       fetchAvailableSlots(selectedDay);
//     } else {
//       setAvailableSlots([]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/createTimetable",
//         {
//           teacherId,
//           classId,
//           day,
//           timeSlot,
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response.data.message || "An error occurred");
//     }
//   };

//   return (
//     <div>
//       <h1>Create Timetable</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Teacher ID:</label>
//           <input
//             type="text"
//             value={teacherId}
//             onChange={(e) => setTeacherId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Class ID:</label>
//           <input
//             type="text"
//             value={classId}
//             onChange={(e) => setClassId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Day:</label>
//           <select value={day} onChange={handleDayChange} required>
//             <option value="">Select a day</option>
//             <option value="Monday">Monday</option>
//             <option value="Tuesday">Tuesday</option>
//             <option value="Wednesday">Wednesday</option>
//             <option value="Thursday">Thursday</option>
//             <option value="Friday">Friday</option>
//           </select>
//         </div>
//         <div>
//           <label>Time Slot:</label>
//           <select
//             value={timeSlot}
//             onChange={(e) => setTimeSlot(e.target.value)}
//             required
//             disabled={!availableSlots.length}
//           >
//             <option value="">Select a time slot</option>
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 No available slots
//               </option>
//             )}
//           </select>
//         </div>
//         <button type="submit">Create Timetable</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CreateTimetable;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAvailableSlots,
//   createTimetable,
//   getTeacherDetails,
// } from "../../redux/teacherRelated/teacherHandle";
// import { setAvailableSlots } from "../../redux/teacherRelated/teacherSlice";

// const CreateTimetable = () => {
//   const dispatch = useDispatch();
//   const availableSlots = useSelector((state) => state.teacher.availableSlots);
//   const [day, setDay] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [message, setMessage] = useState("");

//   const { currentUser, response, error } = useSelector((state) => state.user);

//   // Log user details if response is received
//   useEffect(() => {
//     if (response) {
//       console.log(response);
//     } else if (error) {
//       console.log(error);
//     }
//   }, [response, error]);

//   // Automatically populate teacher and class details
//   const teacherId = currentUser ? currentUser._id : "";
//   const classId =
//     currentUser && currentUser.teachSclass ? currentUser.teachSclass._id : "";

//   useEffect(() => {
//     if (day) {
//       dispatch(fetchAvailableSlots(day));
//     } else {
//       dispatch(setAvailableSlots([]));
//     }
//   }, [day, dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const responseMessage = await dispatch(
//         createTimetable(teacherId, classId, day, timeSlot)
//       );
//       setMessage(responseMessage);
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Timetable</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Day:</label>
//           <select value={day} onChange={(e) => setDay(e.target.value)} required>
//             <option value="">Select a day</option>
//             <option value="Monday">Monday</option>
//             <option value="Tuesday">Tuesday</option>
//             <option value="Wednesday">Wednesday</option>
//             <option value="Thursday">Thursday</option>
//             <option value="Friday">Friday</option>
//           </select>
//         </div>
//         <div>
//           <label>Time Slot:</label>
//           <select
//             value={timeSlot}
//             onChange={(e) => setTimeSlot(e.target.value)}
//             required
//             disabled={!availableSlots.length}
//           >
//             <option value="">Select a time slot</option>
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 No available slots
//               </option>
//             )}
//           </select>
//         </div>
//         <button type="submit">Create Timetable</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CreateTimetable;

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   MenuItem,
//   CircularProgress,
//   Stack,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAvailableSlots, createTimetable } from '../../redux/teacherRelated/teacherHandle';
// import { setAvailableSlots } from '../../redux/teacherRelated/teacherSlice';

// const CreateTimetable = () => {
//   const dispatch = useDispatch();
//   const { availableSlots, loading, error } = useSelector((state) => state.teacher);
//   const { currentUser } = useSelector((state) => state.user);
//   const [day, setDay] = useState('');
//   const [timeSlot, setTimeSlot] = useState('');
//   const [message, setMessage] = useState('');

//   const teacherId = currentUser ? currentUser._id : '';
//   const classId = currentUser?.teachSclass?._id || '';

//   useEffect(() => {
//     if (day) {
//       dispatch(fetchAvailableSlots(day));
//     } else {
//       dispatch(setAvailableSlots([])); // Clear available slots if no day is selected
//     }
//   }, [day, dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const responseMessage = await dispatch(createTimetable(teacherId, classId, day, timeSlot));

//       // Show success message
//       alert('Time Slot Has Been Added');

//       // Clear the input fields
//       setDay('');
//       setTimeSlot('');
//     } catch (error) {
//       console.error('Error creating timetable:', error.message);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           <TextField
//             label="Day"
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//             required
//             select
//           >
//             <MenuItem value="">Select a day</MenuItem>
//             <MenuItem value="Monday">Monday</MenuItem>
//             <MenuItem value="Tuesday">Tuesday</MenuItem>
//             <MenuItem value="Wednesday">Wednesday</MenuItem>
//             <MenuItem value="Thursday">Thursday</MenuItem>
//             <MenuItem value="Friday">Friday</MenuItem>
//           </TextField>

//           <TextField
//             label="Time Slot"
//             value={timeSlot}
//             onChange={(e) => setTimeSlot(e.target.value)}
//             required
//             select
//             disabled={!availableSlots.length}
//           >
//             <MenuItem value="">Select a time slot</MenuItem>
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot, index) => (
//                 <MenuItem key={index} value={slot}>
//                   {slot}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No slots available</MenuItem>
//             )}
//           </TextField>

//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             sx={{ mt: 2 }}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               'Create Timetable'
//             )}
//           </Button>
//           {message && <div>{message}</div>}
//           {error && <div>Error: {error}</div>}
//         </Stack>
//       </form>
//     </Container>
//   );
// };

// export default CreateTimetable;
