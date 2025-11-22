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
  home: {
    experience: string;
    experienceDesc: string;
    safetyBadge: string;
  };
  services: {
    title: string;
    city: string;
    cityDesc: string;
    cityList: {
      time: string;
      rates: string;
      cars: string;
    };
    airport: string;
    airportDesc: string;
    airportWarning: string;
    inter: string;
    interDesc: string;
    interExtra: string;
    interBadge: string;
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
    location: string;
    social: string;
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
  terms: {
    title: string;
    intro: string;
    p1Title: string;
    p1Text: string;
    p2Title: string;
    p2Text: string;
    p3Title: string;
    p3Text: string;
  };
  privacy: {
    title: string;
    intro: string;
    s1Title: string;
    s1Text: string;
    s2Title: string;
    s2Text: string;
  };
}

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
}