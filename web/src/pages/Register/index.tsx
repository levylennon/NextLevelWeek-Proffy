import React from "react";
import { InputLabel } from "../../components/Input";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import backIcon from "../../assets/images/icons/back.svg";


import './styles.css'

export default function Register() {
  return (
    <div id="page-register">
      <div id="page-register-content">
        <div className="left-side">
          <div className="logo-container">
            <img src={logo} alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>
        </div>
        <div className="right-side">
          <Link to="/">
           <img src={backIcon} alt="Voltar"/>
          </Link>

          <div className="header-form">
            <h1>Cadastro</h1>
            <span>Preencha os dados abaixo para começar.</span>
          </div>
          <form>
            <InputLabel label="Nome" name="name" />
            <InputLabel label="Sobrenome" name="lastname" />
            <InputLabel label="E-mail" name="email" type="email" />
            <InputLabel label="Senha" name="password" type="password" />
            <button type="submit">Concluir cadastro</button>
          </form>
        </div>
      </div>
    </div>
  );
}
