import React from "react";
import { Link } from "react-router-dom";
import { InputLabel } from "../../components/Input";
import logo from "../../assets/images/logo.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import './styles.css'

export default function Home() {
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
          <form>
            <InputLabel label="Usuário" name="user" />
            <InputLabel label="Senha" name="password" type="password" />
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
