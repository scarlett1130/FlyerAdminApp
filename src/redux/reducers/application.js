import { END_LOADING, INIT_APPLICATION, SET_CURRENT_SCREEN, START_LOADING } from '../actions/application'

const initialState = {
    status: false,
    version: -1,
    loading: false,
    focusedScreen: '',
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_APPLICATION:
            return {
                ...state,
                status: true,
            };
        case SET_CURRENT_SCREEN:
            return {
                ...state,
                focusedScreen: action.payload,
            };
        case START_LOADING:
            return {
                ...state,
                loading: true
            };
        case END_LOADING:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default applicationReducer;
