import { NewsFeedUrl, StudentsUrl } from '../../constants/api';
import { conversationsReducer } from "../reducers/chat";
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { endLoading, startLoading } from './application';

export const FETCH_STUDENTS = 'FETCH_STUDENTS';
export const SELECT_STUDENT = 'SELECT_STUDENT';
export const SELECT_ALL_STUDENTS = 'SELECT_ALL_STUDENTS';
export const SELECT_STUDENT_ID = 'SELECT_STUDENT_ID';
export const UNSELECT_STUDENT = 'UNSELECT_STUDENT';
export const UNSELECT_STUDENT_CONTACT = 'UNSELECT_STUDENT_CONTACT';
export const ADD_STUDENTS = 'ADD_STUDENTS';
export const CLEAR_CONTACTS_BY_STUDENTS = 'CLEAR_CONTACTS_BY_STUDENTS';

export const fetchStudents = (page, items, oldItems) => ({
    type: FETCH_STUDENTS,
    payload: page == 1 ? items.data : oldItems.concat(items.data)
});

export const clearContactsByStudents = () => ({
    type: CLEAR_CONTACTS_BY_STUDENTS,
});

export const selectStudent = (index) => ({
    type: SELECT_STUDENT,
    payload: index
});

export const selectAllStudents = (flag) => ({
    type: SELECT_ALL_STUDENTS,
    payload: flag,
});

export const selectStudentById = (id) => ({
    type: SELECT_STUDENT_ID,
    payload: id
});

export const unSelectStudent = (id) => ({
    type: UNSELECT_STUDENT,
    payload: id
});

export const addStudents = () => ({
    type: ADD_STUDENTS,
    payload: {}
});

export const unSelectContactsByStudents = (id) => ({
    type: UNSELECT_STUDENT_CONTACT,
    payload: id,
});

export const getStudents = (page) => {

    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        let url = StudentsUrl + '?page=' + page;
        if (state.conversations.unitId) {
            url = StudentsUrl + '?unit_id=' + state.conversations.unitId + '?page=' + page;
        }
        // console.log('fetching students from url ', url);
        let oldStudents = state.students.items;
        if (page === 1) {
            oldStudents = [];
        }

        if (isExpired(state.user.data.expires_in)) {
            return dispatch(logout());
        }

        dispatch(startLoading());
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '*/*'
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log('students fetched');
                dispatch(fetchStudents(page, data, oldStudents));
            })
            .catch(error => {
                console.log(error);
            }).finally(() => dispatch(endLoading()));
    }
};
