import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

function fillForm(email: string, password: string) {
  const user = userEvent.setup();
  render(<LoginForm />);

  return {
    user,
    submit: async () => {
      if (email) await user.type(screen.getByLabelText(/e-mail/i), email);
      if (password) await user.type(screen.getByLabelText(/senha/i), password);
      await user.click(screen.getByRole('button', { name: /entrar/i }));
    },
  };
}

describe('LoginForm', () => {
  it('renderiza os campos de e-mail e senha e o botão de envio', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('exibe erro de validação quando o e-mail é inválido', async () => {
    const { submit } = fillForm('email-invalido', 'senha123');
    await submit();

    expect(await screen.findByText(/informe um e-mail válido/i)).toBeInTheDocument();
    expect(screen.queryByText(/login realizado com sucesso/i)).not.toBeInTheDocument();
  });

  it('exibe erro de validação quando a senha é muito curta', async () => {
    const { submit } = fillForm('usuario@exemplo.com', '123');
    await submit();

    expect(
      await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/login realizado com sucesso/i)).not.toBeInTheDocument();
  });

  it('exibe mensagem de sucesso quando e-mail e senha são válidos', async () => {
    const { submit } = fillForm('usuario@exemplo.com', 'senha123');
    await submit();

    expect(await screen.findByText(/login realizado com sucesso/i)).toBeInTheDocument();
  });

  it('alterna a visibilidade da senha ao clicar em "Mostrar"/"Ocultar"', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: /mostrar/i }));
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: /ocultar/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
