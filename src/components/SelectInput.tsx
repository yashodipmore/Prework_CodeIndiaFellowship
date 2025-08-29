import React from 'react';
import './SelectInput.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

/**
 * A reusable select input component with built-in error handling
 */
const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
}) => {
  // Show error only if the field was touched and there is an error
  const showError = touched && error;

  return (
    <div className="select-input">
      <label htmlFor={id} className="select-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`select-field ${showError ? 'select-error' : ''}`}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showError && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SelectInput;
