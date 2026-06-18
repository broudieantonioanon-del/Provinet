import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

export default function Rejection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-main flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
          {/* Warning Icon */}
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
              navigate("/");
            }}
            style={{
              padding: "11px 52px",
              fontSize: "15px",
              background: "#1973B8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Volver
          </button>
        </div>
      </main>
    </div>
  );
}