import React from 'react';
import './FormInput.css';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  required?: boolean;
}

/**
 * A reusable form input component with built-in error handling
 */
const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
}) => {
  // Show error only if the field was touched and there is an error
  const showError = touched && error;

  return (
    <div className="form-input">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`input-field ${showError ? 'input-error' : ''}`}
        required={required}
      />
      {showError && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormInput;
