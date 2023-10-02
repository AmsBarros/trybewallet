import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, GlobalState } from '../types';
import { removeExpense } from '../redux/actions';

function TableRow() {
  const { expenses } = useSelector((state: GlobalState) => state.wallet);
  const dispatch: DispatchType = useDispatch();

  const handleDelete = (itemId: number) => {
    dispatch(removeExpense(itemId));
  };

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

          <button
            data-testid="delete-btn"
            onClick={ () => item.id !== undefined && handleDelete(item.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ))
  );
}

export default TableRow;
