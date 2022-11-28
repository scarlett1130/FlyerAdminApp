import {FETCH_FEED} from "../actions/newsFeed";
import {initialState} from "../initialStates/newsFeed"


export const newsFeedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FEED:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};
