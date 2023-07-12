import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import reservorio from '../img/reservorio.png';
import logo from '../img/logo.png';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function submitLogin(e) {
    e.preventDefault();
    client
      .post('/api/login/', {
        email: email,
        password: password,
      })
      .then(function (res) {
        navigate('/home');
      })
      .catch(function (error) {
        setError('No se pudo iniciar sesión. Verifica tus credenciales.');
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post('/api/logout/', { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col d-flex align-items-center">
          <img
            style={{ backgroundPosition: 'center center' }}
            src={reservorio}
            alt="imgReservorio"
          />
        </div>
        <div className="col">
          <div className="text-end">
            <img src={logo} width={'48'} alt="LOGO" />
          </div>

          <h2 className="fw-bold text-center py-5">
            Bienvenido a nuestra pagina web!
          </h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={(e) => submitLogin(e)}>
            <div className="mb-4">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <Button type="submit" className="btn btn-success">
                Iniciar Sesión
              </Button>
            </div>
          </Form>
          <div className="mt-4 mr-4 form-check">
            <Form.Control
              type="checkbox"
              name="connected"
              className="form-check-input"
            />
            <Form.Label className="form-check-label">
              Mantenerme conectado
            </Form.Label>
          </div>
          <div className="my-3">
            <span>
              No tienes cuenta? <Link to="/register">Regístrate</Link>
            </span>
            <br />
            <span>
              <Link href="#">Recuperar contraseña</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
