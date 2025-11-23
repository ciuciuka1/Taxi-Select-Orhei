import { TranslationStructure, Language } from '../types';

export const translations: Record<Language, TranslationStructure> = {
  ro: {
    nav: {
      home: "Acasă",
      services: "Servicii",
      about: "Despre Noi",
      contact: "Contact",
      dispatcher: "Dispecerat 24/7",
    },
    hero: {
      title: "Rapiditate. Siguranță. Confort.",
      subtitle: "Serviciul tău de încredere în Orhei și împrejurimi.",
      cta: "Comandă Taxi",
    },
    home: {
      experience: "Experiență Premium",
      experienceDesc: "Confort și siguranță la standarde ridicate pentru fiecare călătorie.",
      safetyBadge: "SIGURANȚĂ",
    },
    services: {
      title: "Serviciile Noastre",
      city: "Curse Urbane",
      cityDesc: "Transport rapid în raza orașului Orhei. Timp minim de așteptare.",
      cityList: {
        time: "Timp de sosire 3-7 minute",
        rates: "Tarife transparente",
        cars: "Mașini curate și confortabile",
      },
      airport: "Transfer Aeroport",
      airportDesc: "Curse planificate către Aeroportul Internațional Chișinău.",
      airportWarning: "Recomandăm rezervarea cu 24 de ore înainte pentru a garanta disponibilitatea exactă.",
      inter: "Transport Interurban",
      interDesc: "Călătorii confortabile către orice localitate din Moldova.",
      interExtra: "Oferim scaune pentru copii și spațiu generos pentru bagaje, asigurând o călătorie plăcută în orice colț al Moldovei.",
      interBadge: "Orice Direcție",
    },
    about: {
      title: "Despre Taxi Select",
      desc: "Suntem o companie locală dedicată excelenței în transportul de persoane.",
      safety: "Siguranță Maximă",
      safetyDesc: "Toate mașinile sunt verificate tehnic zilnic, iar șoferii sunt profesioniști atestați.",
      local: "100% Local",
      localDesc: "Cunoaștem fiecare stradă din Orhei pentru a te duce la destinație pe cel mai scurt drum.",
      comfort: "Confort Premium",
      comfortDesc: "Flotă modernă, curățenie impecabilă și o atmosferă relaxantă pentru fiecare pasager."
    },
    contact: {
      title: "Comandă Acum",
      text: "Suntem disponibili 24/7 pentru tine.",
      callAction: "Sună Acum!",
      location: "Orhei • Moldova",
      social: "Urmărește-ne pe rețelele sociale",
    },
    footer: {
      rights: "Toate drepturile rezervate.",
      terms: "Termeni și Condiții",
      privacy: "Confidențialitate",
    },
    meta: {
      title: "Taxi Select Orhei - Transport Pasageri 24/7",
      description: "Comandă taxi în Orhei. Servicii non-stop, transfer aeroport și curse interurbane. Tel: 0 235 66 6 66."
    },
    terms: {
      title: "Termeni și Condiții de Transport",
      intro: "Acest regulament este elaborat în strictă conformitate cu Codul Transporturilor Rutiere al Republicii Moldova și Legea Nr. 105 privind Protecția Consumatorilor.",
      p1Title: "1. Drepturile și Obligațiile Transportatorului",
      p1Text: "Compania asigură transportul pasagerilor cu autovehicule autorizate, dotate cu aparat de taxat (taximetru) verificat metrologic. Șoferul are dreptul legal de a refuza cursa în următoarele situații: clientul se află în stare avansată de ebrietate sau sub influența substanțelor interzise, este agresiv, sau poartă haine murdare/urât mirositoare care pot păta salonul autovehiculului.",
      p2Title: "2. Tarife, Plată și Bon Fiscal",
      p2Text: "Tariful aplicat este cel afișat pe portiera autovehiculului și înregistrat de aparatul de taxat. Conform legislației în vigoare, la finalul cursei, șoferul este OBLIGAT să emită și să înmâneze pasagerului bonul fiscal. Pasagerul are dreptul să refuze plata cursei dacă șoferul refuză eliberarea bonului fiscal pe suport de hârtie.",
      p3Title: "3. Bagaje, Animale și Siguranță",
      p3Text: "Pasagerii sunt obligați să poarte centura de siguranță (inclusiv pe bancheta din spate). Transportul animalelor de companie este permis doar în cuști speciale sau cu dispozitive de protecție pentru a nu murdări tapițeria. Compania nu răspunde pentru obiectele uitate în mașină, însă încurajăm șoferii să le returneze la dispecerat.",
    },
    privacy: {
      title: "Politica de Confidențialitate",
      intro: "Respectăm confidențialitatea datelor dumneavoastră.",
      s1Title: "Colectarea Datelor",
      s1Text: "Nu colectăm date personale prin intermediul acestui site web. Numărul de telefon este utilizat strict pentru efectuarea apelului din dispozitivul dumneavoastră.",
      s2Title: "Cookie-uri",
      s2Text: "Acest site folosește cookie-uri tehnice pentru a reține preferința de limbă.",
    }
  },
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      about: "О нас",
      contact: "Контакты",
      dispatcher: "Диспетчер 24/7",
    },
    hero: {
      title: "Скорость. Безопасность. Комфорт.",
      subtitle: "Ваша надежная служба такси в Оргееве.",
      cta: "Заказать такси",
    },
    home: {
      experience: "Премиум Опыт",
      experienceDesc: "Комфорт и безопасность высоких стандартов для каждой поездки.",
      safetyBadge: "БЕЗОПАСНОСТЬ",
    },
    services: {
      title: "Наши Услуги",
      city: "Городские поездки",
      cityDesc: "Быстрая подача машины в пределах Оргеева.",
      cityList: {
        time: "Время подачи 3-7 минут",
        rates: "Прозрачные тарифы",
        cars: "Чистые и комфортные авто",
      },
      airport: "Трансфер в аэропорт",
      airportDesc: "Плановые поездки в Международный Аэропорт Кишинева.",
      airportWarning: "Рекомендуем бронировать за 24 часа для гарантии доступности.",
      inter: "Междугородние рейсы",
      interDesc: "Комфортные поездки в любой населенный пункт Молдовы.",
      interExtra: "Предоставляем детские кресла и достаточно места для багажа, обеспечивая приятную поездку в любой уголок Молдовы.",
      interBadge: "Любое направление",
    },
    about: {
      title: "О Taxi Select",
      desc: "Местная компания, стремящаяся к совершенству в пассажирских перевозках.",
      safety: "Безопасность",
      safetyDesc: "Ежедневный техосмотр автомобилей и опытные водители.",
      local: "100% Местные",
      localDesc: "Мы знаем каждую улицу в Оргееве, чтобы доставить вас кратчайшим путем.",
      comfort: "Премиум Комфорт",
      comfortDesc: "Современный автопарк, безупречная чистота и расслабляющая атмосфера."
    },
    contact: {
      title: "Заказать сейчас",
      text: "Мы доступны для вас 24/7.",
      callAction: "Позвонить Сейчас!",
      location: "Оргеев • Молдова",
      social: "Следите за нами в соцсетях",
    },
    footer: {
      rights: "Все права защищены.",
      terms: "Условия использования",
      privacy: "Конфиденциальность",
    },
    meta: {
      title: "Taxi Select Оргеев - Пассажирские перевозки 24/7",
      description: "Заказ такси в Оргееве. Круглосуточно, трансфер в аэропорт и междугородние поездки. Тел: 0 235 66 6 66."
    },
    terms: {
      title: "Условия и Правила Перевозок",
      intro: "Настоящий регламент составлен в строгом соответствии с Кодексом автомобильного транспорта Республики Молдова и Законом № 105 о защите прав потребителей.",
      p1Title: "1. Права и Обязанности Перевозчика",
      p1Text: "Компания обеспечивает перевозку на авторизованных автомобилях с проверенным таксометром. Водитель имеет законное право отказать в поездке, если: клиент находится в состоянии сильного алкогольного опьянения, ведет себя агрессивно или имеет грязную одежду, которая может испачкать салон.",
      p2Title: "2. Тарифы, Оплата и Чек",
      p2Text: "Стоимость поездки рассчитывается по таксометру. Согласно закону, по окончании поездки водитель ОБЯЗАН выдать фискальный чек. Пассажир имеет право не оплачивать поездку, если водитель отказывается выдать бумажный чек.",
      p3Title: "3. Багаж и Безопасность",
      p3Text: "Пассажиры обязаны пристегиваться ремнями безопасности. Перевозка животных разрешена только в переносках или на подстилках. Компания не несет ответственности за забытые вещи, но прилагает усилия для их возврата.",
    },
    privacy: {
      title: "Политика конфиденциальности",
      intro: "Мы уважаем конфиденциальность ваших данных.",
      s1Title: "Сбор данных",
      s1Text: "Мы не собираем личные данные через этот веб-сайт. Номер телефона используется исключительно для совершения звонка с вашего устройства.",
      s2Title: "Файлы Cookie",
      s2Text: "Этот сайт использует технические cookie-файлы для сохранения предпочтений по языку.",
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      contact: "Contact",
      dispatcher: "Dispatch 24/7",
    },
    hero: {
      title: "Speed. Safety. Comfort.",
      subtitle: "Your trusted taxi service in Orhei city.",
      cta: "Order Taxi",
    },
    home: {
      experience: "Premium Experience",
      experienceDesc: "High standards of comfort and safety for every journey.",
      safetyBadge: "SAFETY",
    },
    services: {
      title: "Our Services",
      city: "City Rides",
      cityDesc: "Fast transport within Orhei city limits. Minimal waiting time.",
      cityList: {
        time: "Arrival time 3-7 minutes",
        rates: "Transparent rates",
        cars: "Clean and comfortable cars",
      },
      airport: "Airport Transfer",
      airportDesc: "Scheduled rides to Chisinau International Airport.",
      airportWarning: "We recommend booking 24 hours in advance to guarantee exact availability.",
      inter: "Intercity Transport",
      interDesc: "Comfortable trips to any destination in Moldova.",
      interExtra: "We provide child seats and ample luggage space for a pleasant journey to any corner of Moldova.",
      interBadge: "Any Direction",
    },
    about: {
      title: "About Taxi Select",
      desc: "We are a local company dedicated to excellence in passenger transport.",
      safety: "Safety First",
      safetyDesc: "All cars undergo daily technical checks, driven by certified professionals.",
      local: "Locally Owned",
      localDesc: "We know every street in Orhei to get you to your destination via the shortest route.",
      comfort: "Premium Comfort",
      comfortDesc: "Modern fleet, impeccable cleanliness, and a relaxing atmosphere for every passenger."
    },
    contact: {
      title: "Order Now",
      text: "We are available 24/7 for you.",
      callAction: "Call Now!",
      location: "Orhei • Moldova",
      social: "Follow us on social media",
    },
    footer: {
      rights: "All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
    },
    meta: {
      title: "Taxi Select Orhei - Passenger Transport 24/7",
      description: "Order a taxi in Orhei. 24/7 service, airport transfers and intercity rides. Phone: 0 235 66 6 66."
    },
    terms: {
      title: "Transport Terms & Conditions",
      intro: "These regulations are in strict compliance with the Road Transport Code of the Republic of Moldova and Law No. 105 on Consumer Protection.",
      p1Title: "1. Rights and Obligations",
      p1Text: "The company provides transport with authorized vehicles equipped with taximeters. The driver has the legal right to refuse the ride if the client is heavily intoxicated, aggressive, or has dirty clothing that could stain the vehicle interior.",
      p2Title: "2. Fares and Fiscal Receipt",
      p2Text: "The fare is calculated by the taximeter. By law, the driver is OBLIGED to issue a fiscal receipt at the end of the trip. The passenger has the right to refuse payment if the driver refuses to issue a paper receipt.",
      p3Title: "3. Safety and Luggage",
      p3Text: "Passengers must wear seatbelts. Pets are allowed only in carriers or on protective covers. The company is not liable for forgotten items but will try to return them if found.",
    },
    privacy: {
      title: "Privacy Policy",
      intro: "We respect the privacy of your data.",
      s1Title: "Data Collection",
      s1Text: "We do not collect personal data through this website. The phone number is used strictly for making the call from your device.",
      s2Title: "Cookies",
      s2Text: "This site uses technical cookies to remember your language preference.",
    }
  }
};