import { useState } from 'react';
import type { FormEvent } from 'react';
import './LoginForm.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Informe um e-mail válido.';
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    return newErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccess(Object.keys(validationErrors).length === 0);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>

      <div className="form-field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <button type="submit">Entrar</button>

      {success && <p className="success-message">Login realizado com sucesso!</p>}
    </form>
  );
}

export default LoginForm;
