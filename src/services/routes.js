export const routes = {
  transaction: "/sabis/transaction/",
  APIAddUser: "/user/addUser/",
  APIAddCheckInUser: "/checkin/save/",
  APIGetUserCheckInHistoryUser: "/checkin/list/{0}",
  APIUCheckInUserHistory: "/checkin/list/{0}/page/{1}/size/{2}",
  APIUserLogin: "/access/login",
  APIAddUpdate: "/user/updateUser/",
  APIUserProfile: "/user/view/{0}",
  APICheckHealth: "/sabis/user/1",
  APISettings: (userId) => `/settings/score/${userId}`,
  APIPhotoId: (userId) => `/photo/reg/id/${userId}`,
};
