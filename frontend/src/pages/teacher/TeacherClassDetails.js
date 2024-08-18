import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TeacherClassDetails = () => {
  const { currentUser, response, err } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (err) {
    console.log(err);
  }

  const classId = currentUser.teachSclass._id || "";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (classId) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/Sclass/Students/${classId}`
          );
          setStudents(response.data);
        } catch (err) {
          setError("Failed to load students");
        } finally {
          setLoading(false);
        }
      };

      fetchStudents();
    }
  }, [classId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Classmates in {currentUser?.sclassName?.name || "your class"}
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 16px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Name
            </th>
            <th
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 16px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Roll Number
            </th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) => student._id !== currentUser._id) // Exclude current user
            .map((student) => (
              <tr
                key={student._id}
                style={{
                  borderBottom: "1px solid #ddd",
                  backgroundColor: "#fff",
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: "16px",
                  }}
                >
                  {student.name}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: "16px",
                  }}
                >
                  {student.rollNum}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherClassDetails;
