export type GlobalState = {
  user: {
    email: string, // string que armazena o e-mail da pessoa usuária
  },
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: boolean, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: number, // valor numérico que armazena o id da despesa que está sendo editada
  }
};
