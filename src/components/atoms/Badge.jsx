function Badge({ text, variant = 'secondary' }) {
  return <span className={`badge bg-${variant}`}>{text}</span>;
}

export default Badge;