import { useSelector } from 'react-redux';
import { GlobalState, WalletType } from '../types';

function Header() {
  const userEmail = useSelector((state: GlobalState) => state.user.email);
  const { expenses } = useSelector((state: WalletType) => state);

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => {
      const { currency } = expense;
      const exchangeRate = parseFloat(expense.exchangeRates[currency].ask);
      const expenseValue = parseFloat(expense.value);
      return total + exchangeRate * expenseValue;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <header>
      <p data-testid="email-field">
        {`Email: ${userEmail}`}
      </p>

      <p data-testid="total-field">
        {`Despesa Total: ${total.toFixed(2)}`}
      </p>

      <p data-testid="header-currency-field">
        BRL
      </p>
    </header>
  );
}

export default Header;
