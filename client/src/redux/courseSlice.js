import { createSlice } from '@reduxjs/toolkit';

export const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        coursesRequested: (state) => {
            state.status = 'loading';
        },
        coursesReceived: (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
        },
        coursesRequestFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const {
    coursesRequested,
    coursesReceived,
    coursesRequestFailed,
} = courseSlice.actions;


export const selectAllCourses = (state) => state.courses.courses;

export const fetchCourses = () => async (dispatch) => {
    dispatch(coursesRequested());
    try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        dispatch(coursesReceived(data));
    } catch (error) {
        dispatch(coursesRequestFailed(error.toString()));
    }
};