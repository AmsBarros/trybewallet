import TableRow from './TableRow';

function Table() {
  return (
    <table className="table-fixed w-full bg-green-700 text-white rounded-lg text-sm">
      <thead>
        <tr>
          <th className="border-r-2">Descrição</th>
          <th className="border-r-2">Tag</th>
          <th className="border-r-2">
            Método
            {' '}
            <br />
            {' '}
            de pagamento
          </th>
          <th className="border-r-2">Valor</th>
          <th className="border-r-2">Moeda</th>
          <th className="border-r-2">Câmbio utilizado</th>
          <th className="border-r-2">Valor convertido</th>
          <th className="border-r-2">
            Moeda
            {' '}
            <br />
            {' '}
            de conversão
          </th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        <TableRow />
      </tbody>
    </table>
  );
}

export default Table;
