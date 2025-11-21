import React from 'react';
import { TranslationStructure } from '../types';

interface Props {
  t: TranslationStructure;
}

const Terms: React.FC<Props> = ({ t }) => {
  return (
    <div className="pt-32 pb-20 px-6 relative z-10 bg-brand-dark min-h-screen text-gray-300">
      <div className="container mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl text-white mb-8">{t.terms.title}</h1>
        <div className="prose prose-invert">
           <p>{t.terms.intro}</p>
           <h3 className="text-white mt-4">{t.terms.p1Title}</h3>
           <p>{t.terms.p1Text}</p>
           <h3 className="text-white mt-4">{t.terms.p2Title}</h3>
           <p>{t.terms.p2Text}</p>
           <h3 className="text-white mt-4">{t.terms.p3Title}</h3>
           <p>{t.terms.p3Text}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;