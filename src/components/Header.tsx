import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const userEmail = useSelector((state: GlobalState) => state.user.email);

  return (
    <header>
      <p data-testid="email-field">
        {`Email: ${userEmail}`}
      </p>

      <p data-testid="total-field">
        Despesa Total: 0
      </p>

      <p data-testid="header-currency-field">
        BRL
      </p>
    </header>
  );
}

export default Header;
