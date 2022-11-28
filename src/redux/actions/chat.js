import { ConversationsUrl, ChatRoomsUrl } from "../../constants/api";
import { Alert } from "react-native";
import base64 from "Base64";
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
//import Toast from "react-native-simple-toast";
import { endLoading, startLoading } from "./application";
import he from "he";

export const FETCH_CONVERSATIONS_BEGIN = "FETCH_CONVERSATIONS_BEGIN";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";
export const FETCH_CHAT_THREAD = "FETCH_CHAT_THREAD";
export const CREATE_CHAT_MESSAGE = "CREATE_CHAT_MESSAGE";
export const SET_CURRENT_CONVERSATION = "SET_CURRENT_CONVERSATION";
export const INIT_CHAT_THREAD = "INIT_CHAT_THREAD";
export const SET_UNIT_ID = "SET_UNIT_ID";
export const SET_FILTER_UNIT_ID = "SET_FILTER_UNIT_ID";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_UNREAD_COUNTER = "SET_UNREAD_COUNTER";

export const setSearchQuery = (q) => ({
  type: SET_SEARCH_QUERY,
  payload: q,
});

export const setFilterUnitId = (id) => ({
  type: SET_FILTER_UNIT_ID,
  payload: id,
});

export const fetchConversationsSuccess = (page, items, oldItems) => ({
  type: FETCH_CONVERSATIONS_SUCCESS,
  payload: page == 1 ? items.data : oldItems.concat(items.data),
});

export const fetchConversationsFailure = (error) => ({
  type: FETCH_CONVERSATIONS_FAILURE,
  payload: error,
});

export const fetchChatThread = (items) => ({
  type: FETCH_CHAT_THREAD,
  payload: items,
});

export const initChatThread = () => ({
  type: INIT_CHAT_THREAD,
  payload: [],
});

export const addChatMessage = (data) => ({
  type: CREATE_CHAT_MESSAGE,
  payload: data,
});

export const setCurrentConversation = (data) => ({
  type: SET_CURRENT_CONVERSATION,
  payload: data,
});

export const setUnitId = (unitId) => ({
  type: SET_UNIT_ID,
  payload: unitId,
});

export const getConversations = (page) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const unit_id = state.conversations.filter_unitId;
    const search = state.conversations.search_query;

    let url = ChatRoomsUrl + "?page=" + page;
    if (unit_id && unit_id !== "") {
      url += "&unit_id=" + unit_id;
    } else if (search && search !== "") {
      url += "&search_query=" + search;
    }

    const oldChatItems = state.conversations.items;
    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(startLoading());
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchConversationsSuccess(page, data, oldChatItems));
      })
      .catch((error) => {
        dispatch(fetchConversationsFailure(error));
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const postConversation = (data) => {
  const payload = new FormData();

  const url = ConversationsUrl + "/create-message";

  var c;
  for (c = 0; c < data.contacts.length; c++) {
    const conStr = "contact_ids[" + c + "]";
    payload.append(conStr, data.contacts[c]);
  }

  payload.append("unit_id", data.unit);

  if (data.message) {
    payload.append("message", data.message);
  }

  if (data.files) {
    const value = data.files;
    var f;
    for (f = 0; f < value.length; f++) {
      const strUri = "files[" + f + "][uri]";
      const strType = "files[" + f + "][type]";
      const strName = "files[" + f + "][name]";
      const encodedUri = base64.btoa(value[f].res.uri);

      payload.append(strUri, encodedUri);
      payload.append(strType, value[f].res.type);
      payload.append(strName, value[f].res.name);
    }
  }

  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(startLoading());
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("send chat json---->", json);
        if (json.meta?.code === 1) {
          Alert.alert("Success", "Your chat was sent");
        } else {
          Alert.alert("Error", "Create Conversation Failed");
        }
      })
      .catch((err) => {
        Alert.alert(
          "Create Conversation Failed",
          "Some error occurred, please retry"
        );
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const postChatMessage =
  (data, conversationID) => async (dispatch, getState) => {
    const payload = new FormData();
    payload.append("conversation_ids[0]", conversationID);
    if (data.message) payload.append("message", he.encode(data.message));

    if (data.files) {
      const value = data.files;
      var f;
      for (f = 0; f < value.length; f++) {
        const strUri = "files[" + f + "][uri]";
        const strType = "files[" + f + "][type]";
        const strName = "files[" + f + "][name]";
        const encodedUri = base64.btoa(value[f].res.uri);

        payload.append(strUri, encodedUri);
        payload.append(strType, value[f].res.type);
        payload.append(strName, value[f].res.name);
      }
    }

    /* if (data.files) {
      const value = data.files;
      payload.append(`files[0][uri]`, value.uri);
      payload.append(`files[0][type]`, value.type);
      payload.append(`files[0][name]`, value.name);
    } */

    const state = getState();
    const token = state.user.data.access_token;
    let url = ConversationsUrl + "/create-message";

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(startLoading());
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
      body: payload,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.meta?.code === 1) {
          // dispatch(addChatMessage(data));
          dispatch(getChatThread(conversationID));
          /* Toast.show("Chat Message Sent", Toast.SHORT); */
        } else {
          console.log("Error:", json);
          Alert.alert("Error", "Create Chat Message Failed");
        }
      })
      .catch((err) => {
        Alert.alert(
          "Create Chat Message Failed",
          "Some error occurred, please retry"
        );
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };

export const getChatThread = (conversationID) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    let url = ConversationsUrl + "/" + conversationID;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }
    //dispatch(startLoading());
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchChatThread(json));
      })
      .catch((error) => {
        console.log("error chat messages:", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const setUnreadCounterAction = (counter) => (dispatch, useState) => {
  dispatch({ type: SET_UNREAD_COUNTER, payload: counter });
};
