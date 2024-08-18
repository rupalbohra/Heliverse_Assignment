import React from "react";
import AboutImg from "../../assets/About.png";

export default function About() {
  return (
    <>
      <img src={AboutImg}></img>
      <div
        style={{
          textAlign: "left",
          marginLeft: "10vw",
          marginRight: "10vw",
          justifyContent: "center",
          marginTop: "40px"
        }}
      >
        Welcome to SmartSchool, your ultimate partner in efficient and effective
        school management. Our state-of-the-art School Management System is
        designed to simplify administrative tasks, enhance communication, and
        improve the overall educational experience for students, teachers, and
        parents alike. With SmartSchool, you can easily manage attendance,
        grades, schedules, and more, all in one user-friendly platform. Our
        mission is to empower educational institutions with the tools they need
        to foster a productive and engaging learning environment. Join us in
        revolutionizing education with SmartSchool – where technology meets
        excellence.
      </div>
    </>
  );
}
