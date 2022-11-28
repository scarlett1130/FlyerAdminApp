import { MessageUrl, MessageOptionsUrl } from "../../constants/api";
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { Alert } from "react-native";
import { endLoading, startLoading } from "./application";
import he from "he";

export const FETCH_MESSAGE = "FETCH_MESSAGE";
export const RESET_NEW_MESSAGE = "RESET_NEW_MESSAGE";
export const FETCH_MESSAGE_OPTIONS = "FETCH_MESSAGE_OPTIONS";
export const ADD_MESSAGE_OPTION = "ADD_MESSAGE_OPTION";
export const REMOVE_MESSAGE_OPTION = "REMOVE_MESSAGE_OPTION";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGES_DRAFT = "FETCH_MESSAGES_DRAFT";
export const FETCH_MESSAGES_ARCHIVED = "FETCH_MESSAGES_ARCHIVED";
export const CLEAR_MESSAGE_DETAILS = "CLEAR_MESSAGE_DETAILS";
export const ADD_UNITS = "ADD_UNITS";
export const REMOVE_UNIT = "REMOVE_UNIT";
export const ADD_CONTACTS = "ADD_CONTACTS";
export const REMOVE_CONTACT = "REMOVE_CONTACT";
export const UNIT_ID = "UNIT_ID";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const CREATE_MESSAGE_FAILED = "CREATE_MESSAGE_FAILED";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
export const CREATE_MESSAGE_IN_PROGRESS = "CREATE_MESSAGE_IN_PROGRESS";
export const UPDATE_MESSAGE_FAILED = "UPDATE_MESSAGE_FAILED";
export const UPDATE_MESSAGE_SUCCESS = "UPDATE_MESSAGE_SUCCESS";
export const UPDATE_MESSAGE_IN_PROGRESS = "UPDATE_MESSAGE_IN_PROGRESS";

export const addUnits = (units) => ({
  type: ADD_UNITS,
  payload: units,
});

export const setSearchQuery = (q) => ({
  type: SET_SEARCH_QUERY,
  payload: q,
});

export const resetNewMessage = () => ({
  type: RESET_NEW_MESSAGE,
});

export const createMessageFailed = () => ({
  type: CREATE_MESSAGE_FAILED,
});

export const createMessageBegin = () => ({
  type: CREATE_MESSAGE_IN_PROGRESS,
});

export const createMessageSuccess = () => ({
  type: CREATE_MESSAGE_SUCCESS,
});

export const updateMessageBegin = () => ({
  type: UPDATE_MESSAGE_IN_PROGRESS,
});

export const updateMessageSuccess = () => ({
  type: UPDATE_MESSAGE_SUCCESS,
});

export const updateMessageFailed = () => ({
  type: UPDATE_MESSAGE_FAILED,
});

export const removeUnit = (unitId) => ({
  type: REMOVE_UNIT,
  payload: unitId,
});

export const addContacts = (contacts) => ({
  type: ADD_CONTACTS,
  payload: contacts,
});

export const removeContact = (id) => ({
  type: REMOVE_CONTACT,
  payload: id,
});

export const fetchMessages = (page, items, oldItems) => ({
  type: FETCH_MESSAGES,
  payload: page == 1 ? items.data : oldItems.concat(items.data),
});

export const clearMessageDetails = () => ({
  type: CLEAR_MESSAGE_DETAILS,
});

export const fetchMessagesDraft = (page, items, oldItems) => ({
  type: FETCH_MESSAGES_DRAFT,
  payload: page == 1 ? items.data : oldItems.concat(items.data),
});

export const fetchMessagesArchived = (page, items, oldItems) => ({
  type: FETCH_MESSAGES_ARCHIVED,
  payload: page == 1 ? items.data : oldItems.concat(items.data),
});

export const fetchMessage = (item) => ({
  type: FETCH_MESSAGE,
  payload: item.data,
  attach: item.included,
});

export const fetchMessageOptions = (items) => ({
  type: FETCH_MESSAGE_OPTIONS,
  payload: items.data,
});

export const addMessageOption = (key) => ({
  type: ADD_MESSAGE_OPTION,
  payload: key,
});

export const removeMessageOption = (key) => ({
  type: REMOVE_MESSAGE_OPTION,
  payload: key,
});

export const setFilterUnit = (unit_id) => ({
  type: UNIT_ID,
  payload: unit_id,
});

export const getMessages = (page) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const unit_id = state.conversations.filter_unitId;
    const search = state.message.search_query;
    let url = MessageUrl + "?page=" + page;

    if (unit_id && unit_id !== "") {
      url += "&unit_id=" + unit_id;
    } else if (search && search !== "") {
      url += "&search_query=" + search;
    }

    const oldMessages = state.message.items;

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
        //console.log('Fetched messages: ', data);
        dispatch(fetchMessages(page, data, oldMessages));
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const getMessageOptions = () => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const url = MessageOptionsUrl;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchMessageOptions(data));
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const getMessagesDraft = (page) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const unit_id = state.message.unitId;
    const search = state.message.search_query;
    let url = MessageUrl + "?status=draft" + "&page=" + page;

    if (unit_id && unit_id !== "") {
      url += "&unit_id=" + unit_id;
    } else if (search && search !== "") {
      url += "&search_query=" + search;
    }
    const oldMessages = state.message.items_draft;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    // console.log('get url ', url);
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
        dispatch(fetchMessagesDraft(page, data, oldMessages));
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const getMessagesArchived = (page) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const unit_id = state.message.unitId;
    const search = state.message.search_query;
    let url = MessageUrl + "?status=archived" + "&page=" + page;
    if (unit_id && unit_id !== "") {
      url += "&unit_id=" + unit_id;
    } else if (search && search !== "") {
      url += "&search_query=" + search;
    }
    const oldMessages = state.message.items_archived;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    // console.log('get url ', url);
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
        dispatch(fetchMessagesArchived(page, data, oldMessages));
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const getMessage = (messageId) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const url = MessageUrl + "/" + messageId;

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
        //   console.log('Gotten message data: ', data);
        dispatch(fetchMessage(data));
      })
      .catch((error) => {
        console.log("error while fetching message:", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const archiveMessage = (messageId, name) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const url = MessageUrl + "/" + messageId + "/" + name;
    let alert_success =
      name === "archive"
        ? "Message archived successfully!"
        : "Message restored successfully!";
    let alert_error =
      name === "archive"
        ? "Error occurred while archiving message:"
        : "Error occurred while restoring message:";

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }
    dispatch(startLoading());

    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.meta && data.meta.code && data.meta.code === 1) {
          Alert.alert(alert_success);
        } else {
          console.log(alert_error, data.meta.msg);
        }
      })
      .catch((error) => {
        console.log(alert_error, error);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const createMessage = (data) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const url = MessageUrl;

    const payload = new FormData();

    payload.append("message_options", JSON.stringify(data.message_options));
    //TODO: ne zeli im se poslati na vise unita, vec samo jedan
    payload.append("units", JSON.stringify(data.units[0]));
    payload.append("contacts", JSON.stringify(data.contacts));
    payload.append("title", data.title);
    payload.append("message", he.encode(data.message));

    if (data.files) {
      if (data.files) {
        const value = data.files;
        const uri = value.uri;
        payload.append(`files[0][uri]`, uri);
        payload.append(`files[0][type]`, value.type);
        payload.append(`files[0][name]`, value.name);
      }
    }

    payload.append("is_draft", data.is_draft);
    payload.append(
      "scheduled_timestamp",
      data.scheduled_timestamp !== "" ? data.scheduled_timestamp : null
    );
    console.log("payload: ", payload);

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(createMessageBegin());
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
      .then((res) => {
        console.log("res: ", res);
        return res.json();
      })
      .then((data) => {
        console.log("result: ", data);
        if (data.meta && data.meta.code && data.meta.code === 1) {
          Alert.alert("Success", data.meta.msg);
          dispatch(createMessageSuccess());
        } else {
          console.log("Error occurred while creating message ", data.meta.msg);
          Alert.alert("Not sent", data.meta.msg);
          dispatch(createMessageFailed());
        }
      })
      .catch((error) => {
        dispatch(createMessageFailed());
        console.log("Error occurred while creating message:", error);
        console.log("not CREATED");
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const updateMessage = (data, id) => {
  console.log("PATCH data ", data, id);

  const payload = new FormData();

  payload.append("message_options", JSON.stringify(data.message_options));
  //TODO: ne zeli im se poslati na vise unita, vec samo jedan
  payload.append("units", JSON.stringify(data.units[0]));
  payload.append("contacts", JSON.stringify(data.contacts));
  payload.append("title", data.title);
  payload.append("message", he.encode(data.message));

  if (data.files) {
    payload.append("files", [
      {
        uri: data.files.uri,
        type: data.files.type,
        name: data.files.name,
      },
    ]);
  }

  payload.append("is_draft", data.is_draft);
  payload.append(
    "scheduled_timestamp",
    data.scheduled_timestamp !== "" ? data.scheduled_timestamp : null
  );

  console.log("PATCH payload ", payload);

  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    const url = MessageUrl + "/" + id.toString();

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(updateMessageBegin());
    dispatch(startLoading());

    return fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("result", data);
        if (data.meta && data.meta.code && data.meta.code === 1) {
          Alert.alert("Message updated successfully!", "Success");
          console.log("UPDATED");
          dispatch(updateMessageSuccess());
        } else {
          console.log(
            "Error occurred while updating message: then: ",
            data.meta.msg
          );
          Alert.alert("Not updated", data.meta.msg);
          dispatch(updateMessageFailed());
        }
      })
      .catch((error) => {
        dispatch(updateMessageFailed());
        console.log("Error occurred while updating message: catch: ", error);
        Alert.alert("Not updated", "Error occurred while updating message.");
        console.log("not UPDATED");
      })
      .finally(() => dispatch(endLoading()));
  };
};
