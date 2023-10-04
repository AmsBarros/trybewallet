import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const initialState = {
  user: {
    email: 'teste@example.com',
  },
  wallet: {
    currencies: Object.keys(mockData),
    expenses: [],
    editor: false,
    idToEdit: null,
  },
};

describe('Testes do componente Wallet', () => {
  it('Deve exibir elementos na tela corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar/i });

    expect(emailField).toHaveTextContent('teste@example.com');
    expect(totalField).toHaveTextContent('0.00');
    expect(currencyField).toHaveTextContent('BRL');
    expect(addExpenseBtn).toBeInTheDocument();
  });

  it('Testa funcionalidade da tabela', async () => {
    const MOCK_RESPONSE = {
      json: async () => mockData,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    waitFor(() => renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState }));
    const user = userEvent.setup();

    const valueInput = screen.getByTestId('value-input');
    const currencySelect = await screen.findByTestId('currency-input');
    const methodSelect = screen.getByTestId('method-input');
    const tagSelect = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar/i });
    const totalField = screen.getByTestId('total-field');

    expect(valueInput).toHaveTextContent('');
    expect(currencySelect).toHaveTextContent('USD');
    expect(methodSelect).toHaveTextContent('Dinheiro');
    expect(tagSelect).toHaveTextContent('Alimentação');
    expect(descriptionInput).toHaveTextContent('');

    await user.type(valueInput, '50');
    await user.selectOptions(currencySelect, 'AUD');
    await user.selectOptions(methodSelect, 'Cartão de débito');
    await user.selectOptions(tagSelect, 'Transporte');
    await user.type(descriptionInput, 'Meu Produto');
    await user.click(addExpenseBtn);

    await waitFor(() => { expect(screen.getByText('3.42')).toBeInTheDocument(); });

    expect(totalField).toHaveTextContent('171.09');

    const editBtn = screen.getByTestId('edit-btn');
    await user.click(editBtn);

    await user.type(valueInput, '75');
    await user.type(descriptionInput, 'Alterando meu produto');
    const editExpenseBtn = screen.getByRole('button', { name: 'Editar despesa' });
    await user.click(editExpenseBtn);

    await waitFor(() => { expect(totalField).toHaveTextContent('256.63'); });

    const deleteBtn = screen.getByTestId('delete-btn');
    await user.click(deleteBtn);

    expect(totalField).toHaveTextContent('0.00');
    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });
});
