import * as actionTypes from "../Action/ActionTypes";

const initialState = {
  winners: [],
  loosers: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_THE_RESULTS: {
      let newWinners = [...state.winners];
      newWinners.push(action.winner);
      let newLoosers = [...state.loosers];
      newLoosers.push(action.looser);

      return {
        ...state,
        winners:newWinners,
        loosers:newLoosers,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
