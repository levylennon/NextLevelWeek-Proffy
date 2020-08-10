import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { InputLabel } from "../../components/Input";
import logo from "../../assets/images/logo.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import api from "../../services/api";

export default function Home() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [remember, SetRemember] = useState(false);

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    api.post("/login",{
      email,
      password
    }).then((Response) => {
      const { total } = Response.data;
    });
  }

  return (
    <div id="page-home">
      <div id="page-home-content">
        <div className="left-side">
          <div className="logo-container">
            <img src={logo} alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>
        </div>
        <div className="right-side">
          <span>Fazer login</span>
          <form onSubmit={handleLogin}>
            <InputLabel
              label="E-mail"
              name="email"
              value={email}
              onChange={(event) => {
                SetEmail(event.target.value);
              }}
            />
            <InputLabel
              label="Senha"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                SetPassword(event.target.value);
              }}
            />
            <div className="options-form">
              <div className="remember">
                <input type="radio" name="" id="remember" />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <a href="#">Esqueci minha senha</a>
            </div>
            <button type="submit">Entrar</button>
          </form>
          <div className="footer-right-side">
            <span>
              Não tem conta?
              <Link to="/register">Cadastre-se</Link>
            </span>

            <span>
              É de graça <img src={purpleHeartIcon} alt="heart" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
