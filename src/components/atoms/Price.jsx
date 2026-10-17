import { formatearPrecio } from '../../utils/formatters.js';

function Price({ value, oldValue, className = '' }) {
  return (
    <span className={`fw-bold ${className}`.trim()}>
      {oldValue ? (
        <small className="text-muted text-decoration-line-through me-2">
          {formatearPrecio(oldValue)}
        </small>
      ) : null}
      <span>{formatearPrecio(value)}</span>
    </span>
  );
}

export default Price;