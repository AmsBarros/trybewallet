import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const userEmail = useSelector((state: GlobalState) => state.user.email);

  return (
    <header>
      <div data-testid="email-field">
        {`Email: ${userEmail}`}
      </div>

      <div data-testid="total-field">
        Despesa Total: 0
      </div>

      <div data-testid="header-currency-field">
        BRL
      </div>
    </header>
  );
}

export default Header;
