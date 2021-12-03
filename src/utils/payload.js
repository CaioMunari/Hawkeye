import { getUserId } from "../services/auth";
import { generateAfapTransactionId } from "./common";
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
  return {
    Id: generateAfapTransactionId(),
    IdOrg: 1,
    TransDate: now,
    Type: TRANSACTION_TYPE_PERSON.ANALYZE,
    Photos: [{ Id: getUserId(), Image: slicedPhoto }],
    Users: [
      {
        Id: getUserId(),
        ReferenceId: 1,
        Date: now,
        Gender: "M",
        References: [
          {
            Action: TRANSACTION_REFERENCE_PHOTO.KEEP,
            Id: 1,
            Image: slicedPhoto,
            Filename: "test",
            Date: now,
          },
        ],
      },
    ],
  };
};
