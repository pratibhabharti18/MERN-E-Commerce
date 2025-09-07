import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: null,      // changed from {} to null
  status: null,
  id: null
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg || action.payload, // fallback if msg is undefined
        status: action.payload.status || null,
        id: action.payload.id || null
      };
    case CLEAR_ERRORS:
      return { ...initialState };
    default:
      return state;
  }
}
