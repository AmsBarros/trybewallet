import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const { email, expenses } = useSelector((state: GlobalState) => ({
    email: state.user.email,
    expenses: state.wallet.expenses,
  }));

  const total = expenses.reduce((acc, expense) => {
    const { currency } = expense;
    const exchangeRate = parseFloat(expense.exchangeRates[currency].ask);
    const expenseValue = parseFloat(expense.value);
    return acc + exchangeRate * expenseValue;
  }, 0).toFixed(2) || '0.00';

  return (
    <header
      className="bg-white p-12 flex justify-around items-center"
      style={ { width: '90%' } }
    >
      <h2 className="text-2xl text-center">
        <img
          src="/src/images/login-logo.png"
          alt="Ícone de usuário"
          className="inline mb-2 mr-4"
        />
        Trybe
        <span className="font-bold text-green-500">Wallet</span>
      </h2>
      <div className="flex items-center">
        <img
          src="/src/images/total-logo.png"
          alt="Ícone de Total de Despesas"
          className="inline mr-2"
        />
        <p className="mr-2">Total de despesas:</p>
        <p data-testid="total-field">
          <strong className="font-bold">{total}</strong>
        </p>
        <p data-testid="header-currency-field" className="ml-2">BRL</p>
      </div>
      <p data-testid="email-field">
        <img
          src="/src/images/user-logo.png"
          alt="Ícone de Total de Despesas"
          className="inline mr-2"
        />
        {email}
      </p>
    </header>
  );
}

export default Header;
