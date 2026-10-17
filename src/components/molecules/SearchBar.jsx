import { useState } from 'react';

function SearchBar({ onSearch, initialValue = '' }) {
  const [texto, setTexto] = useState(initialValue);

  const enviar = (e) => {
    e.preventDefault();
    onSearch?.(texto.trim());
  };

  return (
    <form className="d-flex" role="search" onSubmit={enviar}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        style={{ minWidth: '150px' }}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button className="btn btn-outline-warning" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;