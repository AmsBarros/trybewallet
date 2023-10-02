import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function TableRow() {
  const { expenses } = useSelector((state: GlobalState) => state.wallet);

  return (
    expenses.map((item) => (
      <tr key={ item.id }>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{Number(item.value).toFixed(2)}</td>
        <td>{item.exchangeRates[item.currency].name}</td>
        <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {(
            Number(item.value) * Number(item.exchangeRates[item.currency].ask)
          ).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button>Editar</button>
          <button>Excluir</button>
        </td>
      </tr>
    ))
  );
}

export default TableRow;
