import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste de Login Bem-sucedido', () => {
  it('Login com credencias válidas deve redirecionar o usuário para "/carteira"', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeDisabled();

    await user.type(emailInput, 'teste@example.com');
    await user.type(passwordInput, 'senha123');
    expect(button).toBeEnabled();

    await user.click(button);
    waitFor(() => expect(window.location.pathname).toBe('/carteira'));
  });
});

describe('Teste de Validação de Email e Senha', () => {
  it('Campos de email inválido e senha com menos de 6 caracteres devem manter o botão desabilitado', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, 'testeexample.com');
    await user.type(passwordInput, '1234');
    expect(button).toBeDisabled();
  });
});
