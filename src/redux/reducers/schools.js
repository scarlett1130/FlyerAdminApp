import {
    FETCH_ALL_SCHOOLS,
    FETCH_SCHOOLS, SET_PAGES, SELECT_SCHOOL, SELECT_ALL_SCHOOLS, CLEAR_SCHOOLS
} from '../actions/schools';
import { initialState } from "../initialStates/schools";

export default function schoolsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SCHOOLS:
            //console.log('FETCH_SCHOOLS ', action.payload.schools);
            return {
                ...state,
                items: action.payload.schools,
                pagination: action.payload.pagination,
            };

        case CLEAR_SCHOOLS:
            return {
                ...state,
                items: [],
                pagination: {},
            };

        case FETCH_ALL_SCHOOLS:
            return {
                ...state,
                items: action.payload,
            };

        case SET_PAGES:
            return {
                ...state,
                pages: action.payload,
            };

        case SELECT_SCHOOL:
            let newSchools = [...state.items];
            let selectedSchool = newSchools.find(x => x.id === action.payload);
            if (selectedSchool !== undefined) {
                let index = newSchools.indexOf(x => x.id = selectedSchool.id);
                selectedSchool['checked'] = !(selectedSchool.hasOwnProperty('checked') && selectedSchool['checked'] === true);
                newSchools[index] = selectedSchool;
            }
            return {
                ...state,
                items: newSchools,
            };

        case SELECT_ALL_SCHOOLS:
            let schoolsState2 = [...state.items];
            state.items.map((s, sd) => {
                s['checked'] = action.payload;
                schoolsState2[sd] = s;
            });
            return {
                ...state,
                items: schoolsState2,
            };

        default:
            return state;
    }
}
