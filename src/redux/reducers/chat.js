import {
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_SUCCESS,
  SET_UNIT_ID,
  FETCH_CHAT_THREAD,
  CREATE_CHAT_MESSAGE,
  SET_CURRENT_CONVERSATION,
  INIT_CHAT_THREAD,
  SET_FILTER_UNIT_ID,
  SET_SEARCH_QUERY,
  SET_UNREAD_COUNTER,
} from "../actions/chat";
import { chatInitialState, initialState } from "../initialStates/chat";

export const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UNIT_ID:
      // console.log('set unit id', action.payload);
      return {
        ...state,
        unitId: action.payload,
      };
    case SET_FILTER_UNIT_ID:
      // console.log('set unit id', action.payload);
      return {
        ...state,
        filter_unitId: action.payload,
      };
    case SET_SEARCH_QUERY:
      // console.log('set unit id', action.payload);
      return {
        ...state,
        search_query: action.payload,
      };

    case FETCH_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_CONVERSATIONS_FAILURE:
      return {
        ...state,
        error: action.meta.msg,
        items: [],
      };
    default:
      return state;
  }
};

export const chatReducer = (state = chatInitialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_THREAD:
      return {
        ...state,
        items: action.payload.data.conversation_messages,
      };
    case INIT_CHAT_THREAD:
      return {
        ...state,
        items: [],
        currentConversation: {},
      };
    case CREATE_CHAT_MESSAGE:
      let chatItems = [state.items];
      chatItems.push(action.payload);
      return {
        ...state,
        items: chatItems,
      };
    case SET_CURRENT_CONVERSATION:
      return {
        ...state,
        currentConversation: { ...action.payload },
      };
    case SET_UNREAD_COUNTER:
      return {
        ...state,
        unreadCounter: action.payload,
      };
    default:
      return state;
  }
};
