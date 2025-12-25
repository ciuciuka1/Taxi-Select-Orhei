
export type Language = 'ro' | 'ru' | 'en';

export interface TranslationStructure {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    dispatcher: string;
    languageLabel: string;
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
  cookies: {
    text: string;
    link: string;
    button: string;
  };
  weather: {
    heat: string;
    cold: string;
    redCode: string;
    strongWind: string;
    clear: string;
    mainlyClear: string;
    partlyCloudy: string;
    overcast: string;
    fog: string;
    drizzleLight: string;
    drizzleMod: string;
    drizzleDense: string;
    freezingRain: string;
    rainLight: string;
    rainMod: string;
    rainHeavy: string;
    snowLight: string;
    snowMod: string;
    snowHeavy: string;
    hail: string;
    showersLight: string;
    showersMod: string;
    showersHeavy: string;
    sleet: string;
    blizzard: string;
    thunder: string;
    thunderHail: string;
    variable: string;
    label: string;
    wind: string;
    humidity: string;
    apparent: string;
    city: string;
    forecast: string;
    days: string[];
  };
  seo: {
    areaTitle: string;
    areaText: string;
    villages: string;
    routes: string;
    keywords: string;
  };
}

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
}