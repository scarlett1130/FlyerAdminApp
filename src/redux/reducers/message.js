import {
  ADD_MESSAGE_OPTION,
  ADD_UNITS,
  ADD_CONTACTS,
  REMOVE_CONTACT,
  CLEAR_MESSAGE_DETAILS,
  FETCH_MESSAGE,
  FETCH_MESSAGE_OPTIONS,
  REMOVE_MESSAGE_OPTION,
  REMOVE_UNIT,
  UNIT_ID,
  RESET_NEW_MESSAGE,
  SET_SEARCH_QUERY,
  CREATE_MESSAGE_FAILED,
  UPDATE_MESSAGE_FAILED,
  CREATE_MESSAGE_IN_PROGRESS,
  UPDATE_MESSAGE_IN_PROGRESS,
  CREATE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_SUCCESS,
} from "../actions/message";
import { initialState } from "../initialStates/message";
import { FETCH_MESSAGES } from "../actions/message";
import { FETCH_MESSAGES_DRAFT } from "../actions/message";
import { FETCH_MESSAGES_ARCHIVED } from "../actions/message";

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGE:
      return {
        ...state,
        item: action.payload,
        item_attach: action.attach,
      };
    case RESET_NEW_MESSAGE:
      return {
        ...state,
        newMessage: { ...initialState.newMessage },
        createMessageFailed: false,
        createMessageSuccess: false,
        createMessageInProgress: false,
        updateMessageFailed: false,
        updateMessageSuccess: false,
        updateMessageInProgress: false,
      };
    case CREATE_MESSAGE_IN_PROGRESS:
      return {
        ...state,
        createMessageInProgress: true,
      };
    case CREATE_MESSAGE_FAILED:
      return {
        ...state,
        createMessageFailed: true,
        createMessageInProgress: false,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        createMessageFailed: false,
        createMessageSuccess: true,
        createMessageInProgress: false,
      };
    case UPDATE_MESSAGE_IN_PROGRESS:
      return {
        ...state,
        updateMessageInProgress: true,
      };
    case UPDATE_MESSAGE_SUCCESS:
      return {
        ...state,
        updateMessageFailed: false,
        updateMessageSuccess: true,
        updateMessageInProgress: false,
      };
    case UPDATE_MESSAGE_FAILED:
      return {
        ...state,
        updateMessageFailed: true,
        updateMessageInProgress: false,
      };
    case FETCH_MESSAGE_OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    case ADD_MESSAGE_OPTION:
      let newMessageOptions = [...state.newMessage.message_options];
      newMessageOptions.push(action.payload);

      return {
        ...state,
        newMessage: { ...state.newMessage, message_options: newMessageOptions },
      };
    case REMOVE_MESSAGE_OPTION:
      let newOptions = [...state.newMessage.message_options];
      let index = newOptions.indexOf((x) => x.key === action.payload);
      newOptions.splice(index, 1);

      return {
        ...state,
        newMessage: { ...state.newMessage, message_options: newOptions },
      };
    case ADD_UNITS:
      //console.log("payload: ", action.payload);
      let newUnits = [...state.newMessage.units];
      let result = newUnits.concat(action.payload);

      return {
        ...state,
        newMessage: { ...state.newMessage, units: [...result] },
      };
    case REMOVE_UNIT:
      let refreshedUnits = [...state.newMessage.units];
      let unitIndex = refreshedUnits.indexOf((x) => x === action.payload);
      refreshedUnits.concat(unitIndex, 1);

      return {
        ...state,
        newMessage: { ...state.newMessage, units: [...refreshedUnits] },
      };
    case ADD_CONTACTS:
      let newContacts = [...state.newMessage.contacts];
      let resultContacts = newContacts.concat(action.payload);

      return {
        ...state,
        newMessage: { ...state.newMessage, contacts: [...resultContacts] },
      };
    case REMOVE_CONTACT:
      let refreshedContacts = [...state.newMessage.contacts];
      let cIdx = refreshedContacts.indexOf((x) => x === action.payload);
      refreshedContacts.concat(cIdx, 1);

      return {
        ...state,
        newMessage: { ...state.newMessage, contacts: [...refreshedContacts] },
      };
    case UNIT_ID:
      return {
        ...state,
        unitId: action.payload,
      };
    case CLEAR_MESSAGE_DETAILS:
      return {
        ...state,
        item: {},
        item_attach: null,
      };
    case FETCH_MESSAGES:
      // console.log('FETCH_MESSAGES');
      // console.log(action.payload.length);
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_MESSAGES_DRAFT:
      // console.log('FETCH_MESSAGES_DRAFT');
      // console.log(action.payload.length);
      return {
        ...state,
        items_draft: action.payload,
      };
    case FETCH_MESSAGES_ARCHIVED:
      // console.log('FETCH_MESSAGES_ARCHIVED');
      // console.log(action.payload.length);
      return {
        ...state,
        items_archived: action.payload,
      };

    case SET_SEARCH_QUERY:
      // console.log('SET_SEARCH_QUERY');
      // console.log(action.payload);
      return {
        ...state,
        search_query: action.payload,
      };
    default:
      return state;
  }
}
