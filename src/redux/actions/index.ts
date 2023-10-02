import { Dispatch } from 'redux';
import { ExpenseType } from '../../types';

// Coloque aqui suas actions
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  payload: email,
});

function requestStated() {
  return { type: REQUEST_STARTED };
}

function requestSuccessful(payload: any) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload,
  };
}

export function addExpense(payload: ExpenseType, expenses: ExpenseType[]) {
  const id = expenses.length;
  return {
    type: ADD_EXPENSE,
    payload: {
      ...payload,
      id,
    },
  };
}

export function removeExpense(payload: number) {
  return {
    type: REMOVE_EXPENSE,
    payload,
  };
}

export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStated());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data)
        .filter((currency) => currency !== 'USDT');
      dispatch(requestSuccessful(currencies));
    } catch (error) {
      console.error(error);
    }
  };
}
