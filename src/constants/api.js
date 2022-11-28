const DEVELOPMENT = true;

const BASE_URL = DEVELOPMENT
  ? "https://www2.flyerschoolapp.com.farshore.net/api/admin"
  : "https://my.flyerschoolapp.com/api/admin/v1";

const BASE_URL_V2 = DEVELOPMENT
  ? "https://www2.flyerschoolapp.com.farshore.net/api/admin/v2"
  : "https://my.flyerschoolapp.com/api/admin/v2";

const BASE_URL_LOGIN = DEVELOPMENT
  ? "https://www2.flyerschoolapp.com.farshore.net/api/admin/v2"
  : "https://my.flyerschoolapp.com/api/admin";

export const LoginUrl = BASE_URL_V2 + "/me/auth/token";
export const UserUrl = BASE_URL_V2 + "/me";
export const ChatRoomsUrl = BASE_URL_V2 + "/conversations";
export const UpdatePasswordUrl = BASE_URL_V2 + "/me/password";
export const ConversationsUrl = BASE_URL_V2 + "/conversations";

/* export const ChatRoomsUrl = BASE_URL + "/conversations";
export const LoginUrl = BASE_URL + "/me/auth/token";
export const UserUrl = BASE_URL + "/me";
export const UpdatePasswordUrl = BASE_URL + "/me/password";
export const ConversationsUrl = BASE_URL + "/conversations"; */
export const SchoolsUrl = BASE_URL_V2 + "/units/type/schools";
export const GroupsUrl = BASE_URL_V2 + "/units/type/groups";
export const DistrictsUrl = BASE_URL_V2 + "/units/type/districts";
export const StudentsUrl = BASE_URL_V2 + "/user/students";
export const ContactsUrl = BASE_URL_V2 + "/user/contacts";
export const AttachmentsUrl =
  "https://my.flyerschoolapp.com/uploads/attachments/";
export const RegisterUrl = BASE_URL_V2 + "/register/";
export const NewsFeedUrl = BASE_URL_V2 + "/me/newsFeed";
export const MessageUrl = BASE_URL + "/messages";
export const MessageOptionsUrl = BASE_URL + "/messages/options";
