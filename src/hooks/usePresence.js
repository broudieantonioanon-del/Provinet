import { useEffect, useCallback } from "react";
import { supabaseUrl, supabaseAnonKey } from "@/api/base44Client";

const HEARTBEAT_INTERVAL = 10_000;
const OFFLINE_MS = 15_000;

export { OFFLINE_MS };

// ── Singleton state ────────────────────────────────────────────────────────
/** @type {string|null} */ let _sessionId = null;
/** @type {ReturnType<typeof setInterval>|null} */ let _heartbeatTimer = null;
let _listenersAttached = false;
let _rejected = false;
/** @type {Array<{el:Element,event:string,fn:any}>} */ let _formListeners = [];
/** @type {ReturnType<typeof setTimeout>|null} */ let _debounceTimer = null;

function patchSession(/** @type {Record<string,any>} */ payload) {
  if (!_sessionId) return;
  fetch(`${supabaseUrl}/rest/v1/user_session_data?id=eq.${_sessionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

function sendHeartbeat() {
  patchSession({ client_online_status: 'online', last_seen: new Date().toISOString() });
}

function markOffline() {
  if (_heartbeatTimer) { clearInterval(_heartbeatTimer); _heartbeatTimer = null; }
  patchSession({ client_online_status: 'offline' });
}

function startHeartbeat() {
  sendHeartbeat();
  if (_heartbeatTimer) clearInterval(_heartbeatTimer);
  _heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
}

// ── Form-scoped editing listeners ──────────────────────────────────────────
function attachFormListeners(/** @type {Element} */ formEl) {
  if (_formListeners.length > 0) return; // idempotente
  const fn = () => {
    if (!_rejected) return;
    if (_debounceTimer) clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(() => {
      patchSession({ client_online_status: 'editing', last_seen: new Date().toISOString() });
    }, 100);
  };
  ["focusin", "input"].forEach((event) => {
    formEl.addEventListener(event, fn);
    _formListeners.push({ el: formEl, event, fn });
  });
}

function detachFormListeners() {
  _formListeners.forEach(({ el, event, fn }) => el.removeEventListener(event, fn));
  _formListeners = [];
  if (_debounceTimer) { clearTimeout(_debounceTimer); _debounceTimer = null; }
}

// ── Listeners globales (singleton, se adjuntan una sola vez) ───────────────
function ensureListeners() {
  if (_listenersAttached) return;
  _listenersAttached = true;

  // Pestaña oculta / app a segundo plano
  document.addEventListener('visibilitychange', () => {
    if (!_sessionId) return;
    if (document.hidden) { markOffline(); } else { startHeartbeat(); }
  });

  // Ventana pierde foco (escritorio)
  window.addEventListener('blur', () => { if (_sessionId) markOffline(); });
  window.addEventListener('focus', () => { if (_sessionId) startHeartbeat(); });

  // Cierre de pestaña / navegador
  window.addEventListener('beforeunload', () => markOffline());
  window.addEventListener('pagehide', () => markOffline());
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function usePresence(
  /** @type {string|null} */ sessionId,
  /** @type {import('react').RefObject<any>|undefined} */ formRef
) {
  const setEditing = useCallback((/** @type {boolean} */ _) => {}, []);

  const setRejected = useCallback((/** @type {boolean} */ rejected) => {
    _rejected = rejected;
    if (rejected) {
      if (formRef?.current) attachFormListeners(formRef.current);
    } else {
      detachFormListeners();
      startHeartbeat();
    }
  }, [formRef]);

  useEffect(() => {
    if (!sessionId) return;
    _sessionId = sessionId;
    ensureListeners();
    startHeartbeat();

    return () => {
      if (_heartbeatTimer) { clearInterval(_heartbeatTimer); _heartbeatTimer = null; }
      // Offline en navegación SPA (el componente se desmonta)
      patchSession({ client_online_status: 'offline' });
      _sessionId = null;
    };
  }, [sessionId]);

  return { setEditing, setRejected };
}
