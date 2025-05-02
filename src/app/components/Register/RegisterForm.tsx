'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import './RegisterForm.css';

type RegisterFormProps = {
    loadUser: () => void;
};

const RegisterForm = (props: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [submitError, setSubmitError] = useState<string>('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Enviando os dados para a API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          username: '',
        });
        setSubmitError('');
        props.loadUser();
      } else {
        setSubmitError(data.message);
        throw new Error(data.message || 'Ocorreu um erro');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className='register-form'>
    <header>
      <h2 className="register-title">
        {'Cadastre-se'}
      </h2>
    </header>

    {submitStatus === 'success' && (
      <div className="message-success">
        Cadastro realizado com sucesso, você será redirecionado para a página principal!
      </div>
    )}

    {submitStatus === 'error' && (
      <div className="message-error">
        Ocorreu um erro ao realizar seu cadastro:
        <br></br>
        {submitError}
        <br></br>Por favor, tente novamente.
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">
          Usuário desejado*
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Usuario1234"
          maxLength={30}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  </div>
)};

export default RegisterForm;
