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
    <div>
      <input
        type="email"
        placeholder="E-mail"
        data-testid="email-input"
        value={ email }
        onChange={ handleEmailChange }
      />
      <input
        type="password"
        placeholder="Senha"
        data-testid="password-input"
        value={ password }
        onChange={ handlePasswordChange }
      />
      <button
        onClick={ handleSubmit }
        disabled={ !isFormValid }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
