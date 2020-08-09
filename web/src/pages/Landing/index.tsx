import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import landing from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

export default function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  api.get("connections").then((Response) => {
    const { total } = Response.data;

    setTotalConnections(total);
  });

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landing} alt="landing" className="hero-image" />

<div className="color"></div>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="" />
            Dar Aulas
          </Link>
        </div>

        <div className="info">
          <span className="welcome-message">
            Seja bem-vindo. <br />
            <strong>O que deseja fazer?</strong>
          </span>
          <span className="total-connections">
            Total de {totalConnections} conexões já realizadas
            <img src={purpleHeartIcon} alt="heart" />
          </span>
        </div>
      </div>
    </div>
  );
}
