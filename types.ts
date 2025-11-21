export type Language = 'ro' | 'ru' | 'en';

export interface TranslationStructure {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    title: string;
    city: string;
    cityDesc: string;
    airport: string;
    airportDesc: string;
    inter: string;
    interDesc: string;
  };
  about: {
    title: string;
    desc: string;
    safety: string;
    safetyDesc: string;
    local: string;
    localDesc: string;
    comfort: string;
    comfortDesc: string;
  };
  contact: {
    title: string;
    text: string;
    callAction: string;
  };
  footer: {
    rights: string;
    terms: string;
    privacy: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
}