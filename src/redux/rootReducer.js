import { combineReducers } from "redux";
import loginReducer from "./reducers/login";
import applicationReducer from "./reducers/application";
import districtsReducer from "./reducers/districts";
import schoolsReducer from "./reducers/schools";
import groupsReducer from "./reducers/groups";
import { filtersReducer } from "./reducers/filters";
import { conversationsReducer, chatReducer } from "./reducers/chat";
import contactsReducer from "./reducers/contacts";
import studentsReducer from "./reducers/students";
import messageReducer from "./reducers/message";
import { newsFeedReducer } from "./reducers/newsFeed";

const rootReducer = combineReducers({
  user: loginReducer,
  application: applicationReducer,
  schools: schoolsReducer,
  groups: groupsReducer,
  districts: districtsReducer,
  filter: filtersReducer,
  chat: chatReducer,
  message: messageReducer,
  conversations: conversationsReducer,

  students: studentsReducer,
  contacts: contactsReducer,
  newsFeed: newsFeedReducer,
});

export default rootReducer;
