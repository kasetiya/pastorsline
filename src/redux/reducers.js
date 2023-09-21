import { TOGGLE_MODAL_A, TOGGLE_MODAL_B, LOAD_CONTACTS } from './actionTypes';

const initialState = {
  modalAOpen: false,
  modalBOpen: false,
  contacts: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_A:
      return {
        ...state,
        modalAOpen: action.payload,
      };
    case TOGGLE_MODAL_B:
      return {
        ...state,
        modalBOpen: action.payload,
      };
    case LOAD_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;