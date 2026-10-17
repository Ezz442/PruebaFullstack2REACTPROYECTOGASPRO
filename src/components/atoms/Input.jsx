function Input({ id, type = 'text', value, onChange, invalid = false, className = '', ...rest }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`form-control ${invalid ? 'is-invalid' : ''} ${className}`.trim()}
      {...rest}
    />
  );
}

export default Input;