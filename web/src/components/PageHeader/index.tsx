import React from "react";
import { Link } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";
import "./styles.css";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  page?: string;
  message?: Array<{
    icon: string;
    label: string;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="backPage" />
        </Link>
        {props.page && <span> {props.page} </span>}
        <img src={logo} alt="logo" />
      </div>

      <div className="header-content">
        <div className="header-info">
          <strong> {props.title} </strong>
          { props.message && 
          <div className="message"> 
            <img src={props.message[0].icon} alt="" /> 
            <p>{props.message[0].label}</p> 
          </div>  
          }
          

        </div>
        {props.subtitle && <p> {props.subtitle} </p>}

        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
