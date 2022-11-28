import { DistrictsUrl } from '../../constants/api';
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { endLoading, startLoading } from './application';

export const FETCH_DISTRICTS = 'FETCH_DISTRICTS';
export const SELECT_DISTRICT = 'SELECT_DISTRICT';
export const CLEAR_DISTRICTS = 'CLEAR_DISTRICTS';
export const SELECT_ALL_DISTRICTS = 'SELECT_ALL_DISTRICTS';

export const fetchDistricts = (page, items, oldItems) => ({
    type: FETCH_DISTRICTS,
    payload: page == 1 ? items.data : oldItems.concat(items.data)
});

export const selectDistrict = (districtId) => ({
    type: SELECT_DISTRICT,
    payload: districtId,
});

export const clearDistricts = () => ({
    type: CLEAR_DISTRICTS,
});

export const selectAllDistricts = (flag) => ({
    type: SELECT_ALL_DISTRICTS,
    payload: flag,
});

export const getDistricts = (page) => {

    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        const url = DistrictsUrl + '?page=' + page;
        var oldDistricts = state.districts.items;
        if (page === 1) {
            oldDistricts = [];
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
                dispatch(fetchDistricts(page, data, oldDistricts));
            })
            .catch(error => {
                console.log('error districts:', error);
            }).finally(() => dispatch(endLoading()));
    }
};

