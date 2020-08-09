import React, { InputHTMLAttributes } from "react";

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

export const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={ name }>{ label }</label>
      <input type="text" id={ name } {...rest} />
    </div>
  );
};

export const InputLabel: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block-label">
      <input type="text" id={ name } {...rest} required/>
      <label htmlFor={ name }>{ label }</label>
    </div>
  );
};
