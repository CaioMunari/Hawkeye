import { getProperty } from "../services/auth";
import {
  checkScoreStatus,
  getRandomInt32Id,
  getScoreFromResponse,
} from "./common";
import { slicePhotoString } from "./photo";

const TRANSACTION_TYPE_PERSON = { ENROLL: 0, ANALYZE: 1 };
const TRANSACTION_REFERENCE_PHOTO = {
  KEEP: 0,
  INSERT: 1,
  DELETE: 2,
};

export const getMotorCheckinPayload = (photo) => {
  const now = new Date();
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
          ReferenceId: userId,
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
    sn: "SN NOT FOUND",
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
