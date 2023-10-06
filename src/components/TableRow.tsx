import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, GlobalState } from '../types';
import { editMode, removeExpense } from '../redux/actions';

function TableRow() {
  const { expenses } = useSelector((state: GlobalState) => state.wallet);
  const dispatch: DispatchType = useDispatch();

  const handleDelete = (itemId: number) => {
    dispatch(removeExpense(itemId));
  };

  const handleEdit = (itemId: number) => {
    dispatch(editMode(itemId));
  };

  return (
    expenses.map((item) => (
      <tr key={ item.id }>
        <td className="py-2 border-b text-center">{item.description}</td>
        <td className="py-2 border-b text-center">{item.tag}</td>
        <td className="py-2 border-b text-center">{item.method}</td>
        <td className="py-2 border-b text-center">{Number(item.value).toFixed(2)}</td>
        <td
          className="py-2 border-b text-center"
        >
          {item.exchangeRates[item.currency].name}
        </td>
        <td
          className="py-2 border-b text-center"
        >
          {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
        </td>
        <td className="py-2 border-b text-center">
          {(
            Number(item.value) * Number(item.exchangeRates[item.currency].ask)
          ).toFixed(2)}
        </td>
        <td className="py-2 border-b text-center">Real</td>
        <td className="py-2 border-b text-center">
          <button
            data-testid="edit-btn"
            onClick={ () => item.id !== undefined && handleEdit(item.id) }
          >
            <img
              src="/src/images/edit.png"
              alt="Editar"
            />
          </button>

          <button
            data-testid="delete-btn"
            onClick={ () => item.id !== undefined && handleDelete(item.id) }
            className="ml-4"
          >
            <img
              src="/src/images/delete.png"
              alt="Editar"
            />
          </button>
        </td>
      </tr>
    ))
  );
}

export default TableRow;
