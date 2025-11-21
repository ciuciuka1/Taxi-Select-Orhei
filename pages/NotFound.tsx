import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10 text-white bg-brand-dark">
      <h1 className="text-9xl font-bold font-serif text-brand-gold">404</h1>
      <p className="text-2xl mt-4 mb-8">Pagina nu a fost găsită</p>
      <Link to="/" className="bg-white text-brand-dark px-6 py-2 rounded font-bold hover:bg-gray-200">
        Înapoi la Taxi Select
      </Link>
    </div>
  );
};

export default NotFound;
