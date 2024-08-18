import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments } from '../../redux/assignmentsRelated/assignmentsHandle';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const StudentViewAssignments = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { assignments, loading, error } = useSelector((state) => state.assignments);

    useEffect(() => {
        dispatch(getAssignments(currentUser.email));
    }, [dispatch, currentUser.email]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Assignments
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {assignments.map((assignment) => (
                        <ListItem key={assignment.id}>
                            <ListItemText
                                primary={assignment.title}
                                secondary={assignment.description}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default StudentViewAssignments;
