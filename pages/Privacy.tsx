import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 relative z-10 bg-brand-dark min-h-screen text-gray-300">
      <div className="container mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-white mb-8">Politica de Confidențialitate</h1>
        <div className="prose prose-invert">
           <p>Respectăm confidențialitatea datelor dumneavoastră.</p>
           <h3 className="text-white mt-4">Colectarea Datelor</h3>
           <p>Nu colectăm date personale prin intermediul acestui site web. Numărul de telefon este utilizat strict pentru efectuarea apelului din dispozitivul dumneavoastră.</p>
           <h3 className="text-white mt-4">Cookie-uri</h3>
           <p>Acest site folosește cookie-uri tehnice pentru a reține preferința de limbă.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
