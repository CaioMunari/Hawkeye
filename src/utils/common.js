import { getProperty } from "../services/auth";

export const getRandomInt32Id = () =>
  Number(Date.now().toString().slice(3, 12));

export const getScoreFromResponse = (response) => {
  return response?.[0]?.Images?.[0]?.Faces?.[0]?.Matchs?.[0].Score;
};

export const checkScoreStatus = (response) => {
  const transactionScore = getScoreFromResponse(response);
  const minScore = getProperty("minScore");
  if (transactionScore >= minScore) {
    return true;
  }
  return false;
};
