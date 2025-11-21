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
    setMetaTag('og:image', 'https://picsum.photos/1200/630?grayscale'); // Placeholder for social share

    // JSON-LD for LocalBusiness
    const jsonLdScript = document.getElementById('json-ld-struct');
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "name": "Taxi Select Orhei",
      "image": "https://picsum.photos/id/111/800/600",
      "telephone": "+37323566666",
      "url": "https://taxiselect-orhei.md",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Orhei",
        "addressCountry": "MD"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$"
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
