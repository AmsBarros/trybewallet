import { Dispatch } from 'redux';

// Coloque aqui suas actions
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

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

export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStated());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data)
        .filter((currency) => currency !== 'USDT');
      // console.log(currencies);
      dispatch(requestSuccessful(currencies));
    } catch (error) {
      console.error(error);
    }
  };
}
