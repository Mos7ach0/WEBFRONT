import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login', () => {
  test('renders form elements', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('does not alert when fields are filled', () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(window.alert).not.toHaveBeenCalled();
  });

  test('alerts if fields are empty', () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // No rellenamos campos
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
  });
});
