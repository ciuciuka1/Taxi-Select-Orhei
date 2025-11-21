import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 relative z-10 bg-brand-dark min-h-screen text-gray-300">
      <div className="container mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-white mb-8">Termeni și Condiții</h1>
        <div className="prose prose-invert">
           <p>Acești termeni guvernează utilizarea serviciilor Taxi Select Orhei.</p>
           <h3 className="text-white mt-4">1. Comenzi</h3>
           <p>Comenzile se efectuează exclusiv telefonic. Timpul estimat este informativ.</p>
           <h3 className="text-white mt-4">2. Responsabilitate</h3>
           <p>Compania nu răspunde pentru întârzieri cauzate de trafic sau condiții meteo extreme.</p>
           <h3 className="text-white mt-4">3. Comportament</h3>
           <p>Ne rezervăm dreptul de a refuza transportul persoanelor în stare de ebrietate avansată sau agresive.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
