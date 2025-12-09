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

    // JSON-LD for LocalBusiness (Advanced SEO for Raionul Orhei)
    const jsonLdScript = document.getElementById('json-ld-struct');
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "name": "Taxi Select Orhei",
      "image": "https://images.unsplash.com/photo-1618668129934-3e5a9e8bb9d0?auto=format&fit=crop&w=1200&q=80",
      "telephone": "+37323566666",
      "url": "https://taxiselect-orhei.md",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Strada Vasile Lupu",
        "addressLocality": "Orhei",
        "addressRegion": "Orhei District",
        "postalCode": "3500",
        "addressCountry": "MD"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 47.3831,
            "longitude": 28.8231
        },
        "geoRadius": "30000" 
      },
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
          "name": "Comandă Taxi"
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