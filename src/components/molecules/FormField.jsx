import Input from '../atoms/Input.jsx';

// Etiqueta + control (input, select o textarea) + mensaje de error
function FormField({ id, label, error, options, as, required = false, className = 'mb-3', ...rest }) {
  const invalido = error ? 'is-invalid' : '';
  let control;

  if (options) {
    control = (
      <select id={id} name={id} className={`form-select ${invalido}`.trim()} {...rest}>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
    );
  } else if (as === 'textarea') {
    control = (
      <textarea id={id} name={id} rows={3} className={`form-control ${invalido}`.trim()} {...rest} />
    );
  } else {
    control = <Input id={id} invalid={!!error} {...rest} />;
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {control}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default FormField;