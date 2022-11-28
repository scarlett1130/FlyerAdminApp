export const SET_FILTER_DISTRICT = 'SET_FILTER_DISTRICT';
export const RESET_FILTER_DISTRICT = 'RESET_FILTER_DISTRICT';
export const RESET_SCHOOLS = 'RESET_SCHOOLS';

export const SET_FILTER_SCHOOL = 'SET_FILTER_SCHOOL';
export const RESET_FILTER_SCHOOL = 'RESET_FILTER_SCHOOL';
export const RESET_GROUPS = 'RESET_GROUPS';


export const setDistrictFilter = (id) => ({
    type: SET_FILTER_DISTRICT,
    payload: id,
});

export const setSchoolFilter = (id) => ({
    type: SET_FILTER_SCHOOL,
    payload: id,
});

export const setResetSchools = (flag) => ({
    type: RESET_SCHOOLS,
    payload: flag,
});

export const resetDistrictFilter = () => ({
    type: RESET_FILTER_DISTRICT,
});

export const resetSchoolFilter = () => ({
    type: RESET_FILTER_SCHOOL,
});

export const setResetGroups = (flag) => ({
    type: RESET_GROUPS,
    payload: flag,
});