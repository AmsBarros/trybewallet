// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { REQUEST_STARTED, REQUEST_SUCCESSFUL } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0,
};

function walletReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
      };
    case REQUEST_SUCCESSFUL:
      return {
        ...state,
        currencies: action.payload,
      };
    default:
      return state;
  }
}

export default walletReducer;
