import React, { useEffect } from 'react';
import { SeoProps } from '../types';

const SeoHead: React.FC<SeoProps> = ({ title, description, path = '' }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Open Graph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:type', 'website');
    setMetaTag('og:url', `https://taxiselect-orhei.md/${path}`);
    setMetaTag('og:image', 'https://images.unsplash.com/photo-1618668129934-3e5a9e8bb9d0?auto=format&fit=crop&w=1200&q=80');

    // JSON-LD for LocalBusiness (Super Optimized for Orhei & Surrounding Villages - ~45km Radius)
    const jsonLdScript = document.getElementById('json-ld-struct');
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "name": "Taxi Select Orhei",
      "alternateName": ["Taxi Orhei 66666", "Такси Оргеев", "Taxi Orhei", "Cab Orhei", "Taxi Select"],
      "image": "https://images.unsplash.com/photo-1618668129934-3e5a9e8bb9d0?auto=format&fit=crop&w=1200&q=80",
      "telephone": "+37323566666",
      "url": "https://taxiselect-orhei.md",
      "priceRange": "$$",
      "paymentAccepted": "Cash, Card",
      "currenciesAccepted": "MDL",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Vasile Lupu",
        "addressLocality": "Orhei",
        "addressRegion": "Orhei District",
        "postalCode": "3500",
        "addressCountry": "MD"
      },
      "areaServed": [
        { "@type": "City", "name": "Orhei" },
        { "@type": "City", "name": "Peresecina" },
        { "@type": "City", "name": "Ivancea" },
        { "@type": "City", "name": "Pelivan" },
        { "@type": "City", "name": "Mitoc" },
        { "@type": "City", "name": "Step-Soci" },
        { "@type": "City", "name": "Brănești" },
        { "@type": "City", "name": "Susleni" },
        { "@type": "City", "name": "Isacova" },
        { "@type": "Place", "name": "Orheiul Vechi" },
        { "@type": "City", "name": "Trebujeni" },
        { "@type": "City", "name": "Butuceni" },
        { "@type": "City", "name": "Chiperceni" },
        { "@type": "City", "name": "Vatici" },
        { "@type": "City", "name": "Seliște" },
        { "@type": "City", "name": "Lucășeuca" },
        { "@type": "City", "name": "Crihana" },
        { "@type": "City", "name": "Cucuruzeni" },
        { "@type": "City", "name": "Donici" },
        { "@type": "City", "name": "Camencea" },
        { "@type": "City", "name": "Pocșești" },
        { "@type": "City", "name": "Teleșeu" },
        { "@type": "City", "name": "Sămănanca" },
        { "@type": "City", "name": "Puțintei" },
        { "@type": "City", "name": "Ghetlova" },
        { "@type": "City", "name": "Morozeni" },
        { "@type": "City", "name": "Neculăieuca" },
        { "@type": "City", "name": "Biești" },
        { "@type": "City", "name": "Cihoreni" },
        { "@type": "City", "name": "Sirota" },
        { "@type": "City", "name": "Zorile" },
        { "@type": "City", "name": "Jora de Mijloc" },
        { "@type": "City", "name": "Lopatna" },
        { "@type": "City", "name": "Vîșcăuți" },
        { "@type": "City", "name": "Bulăiești" },
        { "@type": "City", "name": "Mîrzaci" },
        { "@type": "AdministrativeArea", "name": "Raionul Orhei" }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 47.3831,
        "longitude": 28.8231
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61558158336366"
      ],
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "tel:+37323566666",
          "inLanguage": "ro-MD",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Comandă Taxi Orhei"
        }
      }
    };

    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(structuredData);
    } else {
      const script = document.createElement('script');
      script.id = 'json-ld-struct';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

  }, [title, description, path]);

  return null;
};

export default SeoHead;