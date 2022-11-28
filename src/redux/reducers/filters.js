import {
    SET_FILTER_SCHOOL,
    RESET_FILTER_SCHOOL,
    SET_FILTER_DISTRICT,
    RESET_FILTER_DISTRICT,
    RESET_GROUPS,
    RESET_SCHOOLS,
} from '../actions/filters';
import {initialState} from "../initialStates/filters";

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_GROUPS:
            console.log('RESET_GROUPS ', action.payload);
            return {
                ...state,
                resetGroups: action.payload,
            };
        case RESET_SCHOOLS:
            console.log('RESET_SCHOOLS ', action.payload);
            return {
                ...state,
                resetSchools: action.payload,
            };
        case SET_FILTER_DISTRICT:
            console.log('SET_FILTER_DISTRICT ', action.payload);
            return {
                ...state,
                districtId: action.payload,
            };
        case RESET_FILTER_DISTRICT:
            console.log('RESET_FILTER_DISTRICT ');
            return {
                ...state,
                districtId: null,
            };
        case SET_FILTER_SCHOOL:
            console.log('SET_FILTER_SCHOOL ', action.payload);
            return {
                ...state,
                schoolId: action.payload,
            };
        case RESET_FILTER_SCHOOL:
            console.log('RESET_FILTER_SCHOOL ');
            return {
                ...state,
                schoolId: null,
            };
        default:
            return state;
    }
}