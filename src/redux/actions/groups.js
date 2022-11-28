import { GroupsUrl } from '../../constants/api';
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { endLoading, startLoading } from './application';

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const SET_PAGES = 'SET_PAGES';
export const SELECT_GROUP = 'SELECT_GROUP';
export const SELECT_ALL_GROUPS = 'SELECT_ALL_GROUPS';
export const CLEAR_GROUPS = 'CLEAR_GROUPS';

export const fetchGroups = (page, items, oldItems) => ({
    type: FETCH_GROUPS,
    payload: { groups: page == 1 ? items.data : oldItems.concat(items.data), pagination: items.pagination }
});

export const selectGroup = (groupId) => ({
    type: SELECT_GROUP,
    payload: groupId,
});

export const selectAllGroups = (flag) => ({
    type: SELECT_ALL_GROUPS,
    payload: flag,
});

export const clearGroups = () => ({
    type: CLEAR_GROUPS,
});


export const setPages = (pages) => ({
    type: SET_PAGES,
    payload: pages,
});

export const getGroups = (page) => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        const url = state.filter.schoolId
            ? GroupsUrl + '?parent_unit_id=' + state.filter.schoolId + '?page=' + page
            : GroupsUrl + '?page=' + page;

        const oldItems = state.groups.items;

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
                dispatch(fetchGroups(page, data, oldItems));
            })
            .catch(error => {
                console.log('error groups:', error);
            }).finally(() => dispatch(endLoading()));
    }
};


export const getGroupsPages = () => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;

        if (isExpired(state.user.data.expires_in)) return dispatch(logout());

        dispatch(startLoading());
        return fetch(GroupsUrl, {
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

