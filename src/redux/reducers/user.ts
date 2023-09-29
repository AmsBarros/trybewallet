// Esse reducer será responsável por tratar as informações da pessoa usuária
import { AnyAction } from 'redux';
import { UPDATE_EMAIL } from '../actions';

const initialState = {
  email: '',
};

function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
