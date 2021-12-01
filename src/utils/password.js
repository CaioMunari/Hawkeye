export const generatePassword = (word) =>
  btoa(word) + Math.random().toString(36).substring(3, 16);
