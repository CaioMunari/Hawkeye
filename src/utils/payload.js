import { getProperty, getSNToken } from "../services/auth";
import {
  checkScoreStatus,
  getRandomInt32Id,
  getScoreFromResponse,
  generateAppID,
} from "./common";
import { slicePhotoString } from "./photo";
import { timeStamp } from "../utils/time";
import { generatePassword } from "./password";
const TRANSACTION_TYPE_PERSON = { ENROLL: 0, ANALYZE: 1 };
const TRANSACTION_REFERENCE_PHOTO = {
  KEEP: 0,
  INSERT: 1,
  DELETE: 2,
};

export const getMotorCheckinPayload = (photo) => {
  const now = Date.now();
  const slicedPhoto = slicePhotoString(photo);
  const userId = getProperty("userId");
  return [
    {
      Id: getRandomInt32Id(),
      IdOrg: 1,
      TransDate: now,
      Type: TRANSACTION_TYPE_PERSON.ANALYZE,
      Photos: [{ Id: getRandomInt32Id(), Image: slicedPhoto }],
      Users: [
        {
          Id: userId,
          ReferenceId: 1,
          Date: now,
          Gender: "M",
          References: [
            {
              Action: TRANSACTION_REFERENCE_PHOTO.KEEP,
              Id: getProperty("photoId"),
              FileName: "",
              Date: now,
            },
          ],
        },
      ],
    },
  ];
};
export const getAdminCheckinPayload = (response, photo, afapTransactionId) => {
  const now = new Date();
  const slicedPhoto = slicePhotoString(photo);
  const approval = checkScoreStatus(response);
  const score = getScoreFromResponse(response);
  return {
    afapTransactionId,
    approval,
    checkTime: now,
    imei: "IMEI NOT FOUND",
    regPhoto: getProperty("photoId"),
    score,
    sn: getSNToken(),
    transactionalPhoto: slicedPhoto,
    userId: getProperty("userId"),
  };
};

export const mockCheckinResponse = () => {
  return [
    {
      TransactionId: "000000",

      Status: 0,

      Images: [
        {
          IdPhoto: 0,

          Faces: [
            {
              Matchs: [
                {
                  IdPhoto: 0,

                  IdUser: 0,

                  Score: 75,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};

export const getAdminRegisterPayload = (formData, photo) => {
  const now = Date.now();
  const slicedPhoto = slicePhotoString(photo);
  const fullname = formData.name.trim();
  const nameArr = fullname.split(" ");
  const name = nameArr[0];
  let lastName = "";
  nameArr.forEach(function (word, i) {
    if (i === 0) return;
    lastName = lastName + word + " ";
  });
  return {
    afapTransactionId: now,
    date: timeStamp(),
    name: name.trim(),
    lastName: lastName.trim(),
    gender: formData.gender,
    matricula: formData.registration,
    userName: formData.userName,
    password: generatePassword(formData.password),
    id: 0, //dummy data
    idGroup: 1, //dummy data
    orgId: 1, //dummy data
    birthDate: "19800101", //dummy data
    rg: "000000000", //dummy data
    cpf: "00000000000", //dummy data
    photo: {
      id: 0, //dummy data
      image: slicedPhoto,
    },
  };
};

export const getMotorRegisterPayload = (user, formData, photo) => {
  const now = new Date();
  const slicedPhoto = slicePhotoString(photo);
  return [
    {
      Id: getRandomInt32Id(),
      TransDate: now,
      IdOrg: 1,
      Type: TRANSACTION_TYPE_PERSON.ENROLL,
      Photos: [
        {
          Id: getRandomInt32Id(),
          Image: "",
        },
      ],
      Users: [
        {
          Id: user.id,
          ReferenceId: 1,
          Gender: formData.gender,
          Date: now,
          References: [
            {
              Action: TRANSACTION_REFERENCE_PHOTO.INSERT,
              Id: user.photo.id,
              FileName: "",
              Image: slicedPhoto,
              Date: now,
            },
          ],
        },
      ],
    },
  ];
};

export const getRegisterDevicePayload = (sn) => {
  return {
    appId: generateAppID(),
    groupId: 1,
    id: 0,
    imei: "IMEI NOT FOUND",
    macAddress: "MAC ADDRESS NOT FOUND",
    model: window.navigator.userAgent,
    origin: 1, //pwa
    sn,
    token: "TOKEN NOT FOUND",
  };
};

export const getDeviceUsagePayload = (hours) => {
  return {
    hours,
    sn: getSNToken(),
  };
};
