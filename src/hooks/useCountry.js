// Lightweight hook to detect user's country using ipinfo
// Returns: { countryCode, countryName, isOman, loading, error }

import { useEffect, useState } from 'react';

const IPINFO_URL = 'https://ipinfo.io/json?token=5ba052a22a1985';

export default function useCountry() {
  const [countryCode, setCountryCode] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const cached = typeof window !== 'undefined' ? window.localStorage.getItem('geo.country') : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.countryCode) {
          if (!isMounted) return;
          setCountryCode(parsed.countryCode);
          setCountryName(parsed.countryName || null);
          setLoading(false);
          return;
        }
      } catch (_) { }
    }

    fetch(IPINFO_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch location');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const code = data?.country || null; // ISO country code, e.g., 'OM'
        const name = data?.country ? countryCodeToName(data.country) : null;
        setCountryCode(code);
        setCountryName(name);
        try {
          window.localStorage.setItem('geo.country', JSON.stringify({ countryCode: code, countryName: name }));
        } catch (_) { }
      })
      .catch((e) => {
        if (!isMounted) return;
        setError(e);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    countryCode,
    countryName,
    isOman: (countryCode || '').toUpperCase() === 'OM',
    loading,
    error,
  };
}

function countryCodeToName(code) {
  const upper = (code || '').toUpperCase();
  switch (upper) {
    case 'OM':
      return 'Oman';
    case 'IN':
      return 'India';
    case 'US':
      return 'United States';
    default:
      return null;
  }
}


