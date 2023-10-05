import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateEmail } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { email, password } = loginData;

  const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = target.value;
    setLoginData({ ...loginData, email: newEmail });
    validateForm(newEmail, password);
  };

  const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = target.value;
    setLoginData({ ...loginData, password: newPassword });
    validateForm(email, newPassword);
  };

  const validateForm = (newEmail: string, newPassword: string) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    const isPasswordValid = newPassword.length >= 6;
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      dispatch(updateEmail(email));
      navigate('/carteira');
    }
  };

  return (
    <div
      className="min-h-screen
        flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={ { backgroundImage: 'url(\'/src/images/background.png\')' } }
    >
      <div className="bg-white shadow-md rounded pt-8 pb-10 sm:rounded-lg sm:px-14">
        <h2 className="text-2xl text-center mb-5">
          <img
            src="/src/images/login-logo.png"
            alt="Ícone de usuário"
            className="inline mb-2 mr-4"
          />
          Trybe
          <span className="font-bold text-green-500">Wallet</span>
        </h2>
        <input
          className="mb-4 p-2 border rounded block w-full
            focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />
        <input
          className="mb-4 p-2 border rounded block w-full
            focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
        />
        <button
          className={ `bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4
            rounded w-full
            ${!isFormValid ? 'disabled:opacity-50 cursor-not-allowed' : ''}` }
          onClick={ handleSubmit }
          disabled={ !isFormValid }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
