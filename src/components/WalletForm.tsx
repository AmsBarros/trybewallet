import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, GlobalState } from '../types';
import { addExpense, editExpense, fetchCurrencies } from '../redux/actions';

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
  const {
    currencies,
    expenses,
    editor,
  } = useSelector((state: GlobalState) => state.wallet);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleInputChange = (event: any) => {
    const { name, value: inputValue } = event.target;
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      [name]: inputValue,
    }));
  };

  const handleAddClick = async () => {
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

  const handleEditClick = () => {
    dispatch(editExpense(formInfo));
    setFormInfo({
      ...formInfo,
      value: '',
      description: '',
    });
  };

  return (
    <form
      className="p-12"
    >
      <div className="flex mb-5">
        <div className="">
          <label htmlFor="value" className="pr-5">
            Valor:
          </label>
          <input
            type="number"
            id="value"
            placeholder="0"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ handleInputChange }
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex-1 px-4 mb-4 flex items-center">
          <label htmlFor="description" className="pr-5">
            Descrição:
          </label>
          <input
            type="text"
            id="description"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ handleInputChange }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-around -mx-4 mb-5">
        <div>
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ handleInputChange }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            {currencies.map((currencyOption) => (
              <option key={ currencyOption } value={ currencyOption }>
                {currencyOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ handleInputChange }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>

        <div>
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ handleInputChange }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
      </div>

      <div className="text-center mt-10">
        {
        editor ? (
          <button
            type="button"
            onClick={ handleEditClick }
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ handleAddClick }
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Adicionar despesa
          </button>
        )
      }
      </div>
    </form>
  );
}

export default WalletForm;
