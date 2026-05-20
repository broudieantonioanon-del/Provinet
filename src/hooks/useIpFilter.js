import { useState, useEffect } from 'react';

const CACHE_KEY = 'ip_filter_result';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function getCached() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { result, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return result;
  } catch {
    return null;
  }
}

function setCache(result) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ result, ts: Date.now() }));
  } catch {}
}

function isGoogleOrg(org = '') {
  const lower = org.toLowerCase();
  return lower.includes('as15169') || lower.includes('google');
}

export function useIpFilter() {
  // Start from cache if available (instant, no flicker).
  // Without cache, start as 'loading' so IpFilterGuard shows nothing
  // until the fetch resolves — prevents briefly showing the wrong page.
  const [status, setStatus] = useState(() => getCached() ?? 'loading');

  useEffect(() => {
    const cached = getCached();
    if (cached) return;

    fetch('https://ipinfo.io/json')
      .then(r => r.json())
      .then(data => {
        const country = data.country || '';
        const org = data.org || '';
        const isGoogle = isGoogleOrg(org);
        const isVenezuela = country === 'VE';
        const result = (country && !isGoogle && isVenezuela) ? 'allowed' : (!country ? 'allowed' : 'blocked');
        setCache(result);
        setStatus(result);
      })
      .catch(() => {
        setCache('allowed');
        setStatus('allowed');
      });
  }, []);

  return status;
}
