import { useSelector } from 'react-redux';
import { GlobalState } from '../types';
import TableRow from './TableRow';

function Table() {
  const { expenses } = useSelector((state: GlobalState) => state.wallet);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((item) => (
          <TableRow key={ item.id } item={ item } />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
