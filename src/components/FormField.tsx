
import React from 'react';

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
  required?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder = '',
  id,
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block mb-1 font-medium text-biblebrown">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        className="input-field"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormField;
