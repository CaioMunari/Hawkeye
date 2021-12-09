export const routes = {
  transaction: "/sabis/transaction/",
  APIAddUser: "/user/addUser/",
  APIAddCheckInUser: "/checkin/save/",
  APIGetUserCheckInHistoryUser: "/checkin/list/{0}",
  APICheckInUserHistory: (id, page) =>
    `/checkin/list/${id}/page/${page}/size/5`,
  APIUserLogin: "/access/login",
  APIAddUpdate: "/user/updateUser/",
  APIUserProfile: "/user/view/{0}",
  APICheckHealth: "/sabis/user/1",
  APITransPhotoThumbnail: (id) => `/photo/trans/thumb/${id}`,
  APISettings: (userId) => `/settings/score/${userId}`,
  APIPhotoId: (userId) => `/photo/reg/id/${userId}`,
  APIRemoveUser: (userId) => `/user/rollback/{id}?userId=${userId}`,
};
