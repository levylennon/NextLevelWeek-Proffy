import React from "react";
import { Link } from "react-router-dom";

import successIcon from "../../assets/images/icons/success-check-icon.svg";

import "./styles.css";

export default function Register() {
  return (
    <div id="page-registered">
      <div className="left-side">
        <div className="success-container">
          <img src={successIcon} alt="success" />
          <h1>Cadastro concluído</h1>
          <small>
            Agora você faz parte da plataforma da Proffy Tenha uma ótima
            experiência.
          </small>
          <Link to="/" className="Btn-Success">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
