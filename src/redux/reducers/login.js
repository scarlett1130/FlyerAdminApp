import { initialState } from "../initialStates/login";
import {
  USER_LOGOUT,
  USER_LOGIN,
  GET_USER_DATA,
  SET_USER_ID,
} from "../actions/login";

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    case GET_USER_DATA: {
      return {
        ...state,
        userData: action.payload.data,
      };
    }

    case SET_USER_ID: {
      return {
        ...state,
        userData: { ...state.user.userData, userId: action.payload },
      };
    }

    default:
      return state;
  }
};

export default loginReducer;
