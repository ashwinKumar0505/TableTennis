import * as actionTypes from "./ActionTypes";

export const storeResults = (winner, looser) => {
  return {
    action: actionTypes.STORE_THE_RESULTS,
    winner: winner,
    looser: looser
  };
};
