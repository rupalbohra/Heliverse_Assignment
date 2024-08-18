import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  doneSuccess,
  // new
  setAvailableSlots,
  //
} from "./teacherSlice";
const REACT_APP_BASE_URL = "http://localhost:5000";

// new

export const fetchAvailableSlots = (day) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/availableSlots/${day}`);
    dispatch(setAvailableSlots(result.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

// Create a timetable entry
export const createTimetable = (teacherId, classId, day, timeSlot) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(`${REACT_APP_BASE_URL}/createTimetable`, {
      teacherId,
      classId,
      day,
      timeSlot
    });
    dispatch(postDone());
    return result.data.message; // Return the success message to display it in the component
  } catch (error) {
    dispatch(getError(error));
    throw new Error(error.response.data.message || 'An error occurred'); // Throw error to be handled in component
  }
};
// export const getAvailableSlots = (day) => async (dispatch) => {
//   dispatch(getRequest());

//   try {
//     const result = await axios.get(
//       `${REACT_APP_BASE_URL}/timetable/available/${day}`
//     );
//     dispatch(setAvailableSlots(result.data));
//   } catch (error) {
//     dispatch(getError(error));
//   }
// };


// export const createTimetable =
//   (teacherId, classId, day, timeSlot) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//       await axios.post(`${REACT_APP_BASE_URL}/timetable`, {
//         teacherId,
//         classId,
//         day,
//         timeSlot,
//       });
//       dispatch(postDone());
//     } catch (error) {
//       dispatch(getError(error.response?.data?.message || error.message));
//     }
//   };
// export const createTimetable =
//   (teacherId, classId, day, timeSlot) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//       const result = await axios.post(`${REACT_APP_BASE_URL}/createTimetable`, {
//         teacherId,
//         classId,
//         day,
//         timeSlot,
//       });
//       dispatch(postDone());
//     } catch (error) {
//       dispatch(getError(error.message));
//     }
//   };

// export const fetchAvailableSlots = (day) => async (dispatch) => {
//   dispatch(getRequest());

//   try {
//     const result = await axios.get(
//       `${REACT_APP_BASE_URL}/availableSlots/${day}`
//     );
//     console.log(Array.isArray(result.data)); // Check if this logs true
//     if (Array.isArray(result.data)) {
//       dispatch(setAvailableSlots(result.data));
//     } else {
//       dispatch(getError("Invalid data format"));
//     }
//   } catch (error) {
//     dispatch(getError(error.message));
//   }
// };

// export const fetchAvailableSlots = (day) => async (dispatch) => {
//   dispatch(getRequest());

//   try {
//     const result = await axios.get(`${REACT_APP_BASE_URL}/availableSlots/${day}`);
//     console.log(Array.isArray(result.data)); // This should log true
//     dispatch(setAvailableSlots(result.data));
//   } catch (error) {
//     dispatch(getError(error.message));
//   }
// };

//
export const getAllTeachers = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/Teachers/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getTeacherDetails = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/Teacher/${id}`);
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateTeachSubject =
  (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());

    try {
      await axios.put(
        `${REACT_APP_BASE_URL}/TeacherSubject`,
        { teacherId, teachSubject },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(postDone());
    } catch (error) {
      dispatch(getError(error));
    }
  };
