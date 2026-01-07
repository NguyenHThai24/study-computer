import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="relative mx-auto w-full">
      {/* Gradient trắng đậm -> nhạt */}
      <div className="pointer-events-none absolute top-0 left-0 h-36 w-full bg-linear-to-b from-white via-white/70 to-transparent" />

      {/* Header chính */}
      <section className="relative z-10 py-2 text-center">
        <Link
          to={'/'}
          style={{
            fontFamily: '"Tagesschrift", system-ui',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#b33100',
          }}
        >
          Study Computer
        </Link>
      </section>
    </header>
  );
};

export default Header;
