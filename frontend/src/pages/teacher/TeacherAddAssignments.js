import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
const TeacherAddAssignments = () => {
  const { currentUser} = useSelector((state) => state.user);
  console.log(currentUser.email);
  console.log(currentUser.teachSubject);
  console.log(currentUser.teachSclass);

  return (
    <div>
      <h2>Add Assignment</h2>
      
    </div>
  );
};

export default TeacherAddAssignments;
