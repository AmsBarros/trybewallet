import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, GlobalState } from '../types';
import { fetchCurrencies } from '../redux/actions';

function WalletForm() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const dispatch: DispatchType = useDispatch();
  const { currencies } = useSelector((state: GlobalState) => state.wallet);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <form>
      <label htmlFor="value">Valor: </label>
      <input
        type="number"
        id="value"
        placeholder="0"
        data-testid="value-input"
        value={ value }
        onChange={ (event) => setValue(event.target.value) }
      />

      <select
        data-testid="currency-input"
        value={ currency }
        onChange={ (event) => setCurrency(event.target.value) }
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
        onChange={ (event) => setMethod(event.target.value) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <select
        data-testid="tag-input"
        value={ tag }
        onChange={ (event) => setTag(event.target.value) }
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
        onChange={ (event) => setDescription(event.target.value) }
      />

      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
