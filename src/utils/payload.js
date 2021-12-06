import { getProperty, getUserId } from "../services/auth";
import { getRandomInt32Id } from "./common";
import { slicePhotoString } from "./photo";

const TRANSACTION_TYPE_PERSON = { ENROLL: 0, ANALYZE: 1 };
const TRANSACTION_REFERENCE_PHOTO = {
  KEEP: 0,
  INSERT: 1,
  DELETE: 2,
};

export const getCheckinPayload = (photo) => {
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
