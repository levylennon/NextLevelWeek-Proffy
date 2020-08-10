import React, { useState, FormEvent } from "react";
import { InputLabel } from "../../components/Input";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import backIcon from "../../assets/images/icons/back.svg";
import { useHistory } from "react-router-dom";

import "./styles.css";
import api from "../../services/api";

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmitFormRegister(event: FormEvent) {
    event.preventDefault();

    api
      .post("/user", {
        name,
        lastname,
        email,
        password,
      })
      .then((Response) => {
        Response.status === 200
          ? history.push("/success")
          : alert("error database, please try again");
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <img src={backIcon} alt="Voltar" />
          </Link>

          <div className="header-form">
            <h1>Cadastro</h1>
            <span>Preencha os dados abaixo para começar.</span>
          </div>
          <form onSubmit={handleSubmitFormRegister}>
            <InputLabel
              label="Nome"
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <InputLabel
              label="Sobrenome"
              name="lastname"
              value={lastname}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />

            <InputLabel
              label="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <InputLabel
              label="Senha"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <button type="submit">Concluir cadastro</button>
          </form>
        </div>
      </div>
    </div>
  );
}
