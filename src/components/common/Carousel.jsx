import { Carousel as BsCarousel } from 'react-bootstrap';

function Carousel({ slides, intervalo = 4000 }) {
  return (
    <BsCarousel interval={intervalo}>
      {slides.map((s) => {
        const colorTexto = s.fondo === 'warning' ? 'text-dark' : 'text-white';
        return (
          <BsCarousel.Item key={s.titulo}>
            <div
              className={`d-flex flex-column align-items-center justify-content-center text-center ${colorTexto} bg-${s.fondo || 'dark'} rounded`}
              style={{ height: '300px' }}
            >
              <h2 className="fw-bold">{s.titulo}</h2>
              <p className="mb-0">{s.texto}</p>
            </div>
          </BsCarousel.Item>
        );
      })}
    </BsCarousel>
  );
}

export default Carousel;