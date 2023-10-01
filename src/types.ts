import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserType = {
  email: string, // string que armazena o e-mail da pessoa usuária
};

export type WalletType = {
  currencies: [], // array de string
  expenses: ExpenseType[], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: boolean, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: number, // valor numérico que armazena o id da despesa que está sendo editada
};

export type GlobalState = {
  user: UserType,
  wallet: WalletType,
};

export type ExpenseType = {
  id?: number;
  exchangeRates: any;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
};

export type DispatchType = ThunkDispatch<GlobalState, null, AnyAction>;
