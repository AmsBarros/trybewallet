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
    <header>
      <p data-testid="email-field">
        {`Email: ${email}`}
      </p>

      <p data-testid="total-field">
        {total}
      </p>

      <p data-testid="header-currency-field">
        BRL
      </p>
    </header>
  );
}

export default Header;
