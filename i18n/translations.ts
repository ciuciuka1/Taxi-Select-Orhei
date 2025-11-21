import { TranslationStructure, Language } from '../types';

export const translations: Record<Language, TranslationStructure> = {
  ro: {
    nav: {
      home: "Acasă",
      services: "Servicii",
      about: "Despre Noi",
      contact: "Contact",
    },
    hero: {
      title: "Rapiditate. Siguranță. Confort.",
      subtitle: "Serviciul tău de încredere în Orhei și împrejurimi.",
      cta: "Comandă Taxi",
    },
    home: {
      experience: "Experiență Premium",
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
      title: "Termeni și Condiții",
      intro: "Acești termeni guvernează utilizarea serviciilor Taxi Select Orhei.",
      p1Title: "1. Comenzi",
      p1Text: "Comenzile se efectuează exclusiv telefonic. Timpul estimat este informativ.",
      p2Title: "2. Responsabilitate",
      p2Text: "Compania nu răspunde pentru întârzieri cauzate de trafic sau condiții meteo extreme.",
      p3Title: "3. Comportament",
      p3Text: "Ne rezervăm dreptul de a refuza transportul persoanelor în stare de ebrietate avansată sau agresive.",
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
    },
    hero: {
      title: "Скорость. Безопасность. Комфорт.",
      subtitle: "Ваша надежная служба такси в Оргееве.",
      cta: "Заказать такси",
    },
    home: {
      experience: "Премиум Опыт",
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
      title: "Условия использования",
      intro: "Настоящие условия регулируют использование услуг Taxi Select Orhei.",
      p1Title: "1. Заказы",
      p1Text: "Заказы принимаются исключительно по телефону. Расчетное время является информативным.",
      p2Title: "2. Ответственность",
      p2Text: "Компания не несет ответственности за задержки, вызванные пробками или экстремальными погодными условиями.",
      p3Title: "3. Поведение",
      p3Text: "Мы оставляем за собой право отказать в перевозке лицам в состоянии сильного алкогольного опьянения или проявляющим агрессию.",
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
    },
    hero: {
      title: "Speed. Safety. Comfort.",
      subtitle: "Your trusted taxi service in Orhei city.",
      cta: "Order Taxi",
    },
    home: {
      experience: "Premium Experience",
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
      title: "Terms & Conditions",
      intro: "These terms govern the use of Taxi Select Orhei services.",
      p1Title: "1. Orders",
      p1Text: "Orders are placed exclusively by phone. Estimated time is informative.",
      p2Title: "2. Responsibility",
      p2Text: "The company is not liable for delays caused by traffic or extreme weather conditions.",
      p3Title: "3. Conduct",
      p3Text: "We reserve the right to refuse transport to persons in a state of advanced intoxication or who are aggressive.",
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