function Button({
  label,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;