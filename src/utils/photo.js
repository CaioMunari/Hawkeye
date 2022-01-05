export const slicePhotoString = (photoString) => photoString.slice(23);

export const buildBase64URL = (photo) => `data:image/jpeg;base64,` + photo;
