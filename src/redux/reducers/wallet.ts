// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  EDIT_MODE,
  REMOVE_EXPENSE,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
} from '../actions';
import { WalletType } from '../../types';

const initialState: WalletType = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: null,
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

    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses
          .filter((expense) => expense.id !== action.payload),
      };

    case EDIT_MODE:
      return {
        ...state,
        editor: true,
        idToEdit: action.payload,
      };

    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (state.idToEdit === expense.id) {
            return { ...expense, ...action.payload };
          }
          return expense;
        }),
        editor: false,
        idToEdit: null,
      };

    default:
      return state;
  }
}

export default walletReducer;
