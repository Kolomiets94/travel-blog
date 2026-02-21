import React from "react";
import "./FormField.scss";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  counter?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  children,
  counter,
}) => {
  return (
    <div className={`form-field ${error ? "form-field--error" : ""}`}>
      <div className="form-field__label-wrapper">
        {required && <span className="required-star">*</span>}
        <label className="form-field__label">{label}</label>
      </div>
      {children}
      {error && <div className="form-field__error">{error}</div>}
      {counter && <div className="form-field__counter">{counter}</div>}
    </div>
  );
};

export default FormField;
