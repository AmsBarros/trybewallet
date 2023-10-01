import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, GlobalState } from '../types';
import { addExpense, fetchCurrencies } from '../redux/actions';

function WalletForm() {
  const [formInfo, setFormInfo] = useState({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });
  const { value, description, currency, method, tag } = formInfo;
  const dispatch: DispatchType = useDispatch();
  const { currencies } = useSelector((state: GlobalState) => state.wallet);
  const { expenses } = useSelector((state: GlobalState) => state.wallet);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleInputChange = (event: any) => {
    setFormInfo((prevInfo) => ({ ...prevInfo, [event.target.name]: event.target.value }));
  };

  const handleClick = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const newExpense = {
      ...formInfo,
      exchangeRates: data,
    };
    dispatch(addExpense(newExpense, expenses));
    setFormInfo({
      ...formInfo,
      value: '',
      description: '',
    });
  };

  return (
    <form>
      <label htmlFor="value">Valor: </label>
      <input
        type="number"
        id="value"
        placeholder="0"
        data-testid="value-input"
        value={ value }
        name="value"
        onChange={ handleInputChange }
      />

      <select
        data-testid="currency-input"
        value={ currency }
        name="currency"
        onChange={ handleInputChange }
      >
        {currencies.map((currencyOption) => (
          <option key={ currencyOption } value={ currencyOption }>
            {currencyOption}
          </option>
        ))}
      </select>

      <select
        data-testid="method-input"
        value={ method }
        name="method"
        onChange={ handleInputChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <select
        data-testid="tag-input"
        value={ tag }
        name="tag"
        onChange={ handleInputChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>

      <label htmlFor="description">Descrição: </label>
      <input
        type="text"
        id="description"
        placeholder="Descrição da despesa"
        data-testid="description-input"
        value={ description }
        name="description"
        onChange={ handleInputChange }
      />

      <button
        type="button"
        onClick={ handleClick }
      >
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
