import { NewsFeedUrl } from "../../constants/api";
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { endLoading, startLoading } from "./application";


export const FETCH_FEED = 'FETCH_FEED';


export const fetchNewsFeed = (page, items, oldItems) => ({
    type: FETCH_FEED,
    payload: page == 1 ? items.data : oldItems.concat(items.data)
});


export const getNewsFeed = (page) => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        const url = NewsFeedUrl + '?page=' + page;
        const oldNewsFeedItems = state.newsFeed.items;

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
                dispatch(fetchNewsFeed(page, data, oldNewsFeedItems));
            })
            .catch(error => {
                console.log('error', error);
            }).finally(() => dispatch(endLoading()));
    }
};
