import { SchoolsUrl } from '../../constants/api';
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { endLoading, startLoading } from './application';

export const FETCH_SCHOOLS = 'FETCH_SCHOOLS';
export const FETCH_ALL_SCHOOLS = 'FETCH_ALL_SCHOOLS';
export const SET_PAGES = 'SET_PAGES';
export const SELECT_SCHOOL = 'SELECT_SCHOOL';
export const SELECT_ALL_SCHOOLS = 'SELECT_ALL_SCHOOLS';
export const CLEAR_SCHOOLS = 'CLEAR_SCHOOLS';

export const fetchSchools = (page, items, oldItems) => ({
    type: FETCH_SCHOOLS,
    payload: { schools: page == 1 ? items.data : oldItems.concat(items.data), pagination: items.pagination }
});


export const selectSchool = (schoolId) => ({
    type: SELECT_SCHOOL,
    payload: schoolId,
});

export const selectAllSchools = (flag) => ({
    type: SELECT_ALL_SCHOOLS,
    payload: flag,
});

export const clearSchools = () => ({
    type: CLEAR_SCHOOLS,
});

export const setPages = (pages) => ({
    type: SET_PAGES,
    payload: pages,
});

export const getSchools = (page) => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        const url = state.filter.districtId
            ? SchoolsUrl + '?parent_unit_id=' + state.filter.districtId + '?page=' + page
            : SchoolsUrl + '?page=' + page;

        const oldSchools = state.schools.items;

        if (isExpired(state.user.data.expires_in)) return dispatch(logout());

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
                dispatch(fetchSchools(page, data, oldSchools));
            })
            .catch(error => {
                console.log('error schools:', error);
            }).finally(() => dispatch(endLoading()));
    }
};


export const getPages = () => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;

        if (isExpired(state.user.data.expires_in)) return dispatch(logout());

        dispatch(startLoading());
        return fetch(SchoolsUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '*/*'
            },
        })
            .then(res => res.json())
            .then(data => {
                const pages = data.pagination.total_page;
                dispatch(setPages(pages));
            })
            .catch(error => {
                console.log('error schools:', error);
            }).finally(() => dispatch(endLoading()));
    }
};


