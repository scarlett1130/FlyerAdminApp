export const INIT_APPLICATION = 'INIT_APPLICATION';
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const initialiseApplication = () => ({
    type: INIT_APPLICATION,
    payload: {},
});

export const setCurrentScreen = (screen) => ({
    type: SET_CURRENT_SCREEN,
    payload: screen,
});

export const startLoading = () => ({ type: START_LOADING });

export const endLoading = () => ({ type: END_LOADING });