import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<Props> = ({ currentLang, setLang }) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'ro', label: 'RO' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLang(lang.code)}
          className={`px-2 py-1 text-xs font-bold rounded transition-colors duration-200 ${
            currentLang === lang.code
              ? 'bg-brand-gold text-brand-dark'
              : 'bg-transparent text-white border border-white/30 hover:border-brand-gold hover:text-brand-gold'
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
