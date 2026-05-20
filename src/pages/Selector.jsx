import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Selector() {
  const [selected, setSelected] = useState("provinet");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const options = [
    { id: "provinet", label: "Provinet Empresas" },
    { id: "netcash", label: "Provincial Net Cash" },
  ];

  const handleContinuar = () => {
    if (selected === "provinet") {
      navigate("/provinet");
    } else {
      navigate("/netcash");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header
        className="w-full bg-[#004481] flex items-center justify-between flex-shrink-0"
        style={{ height: 64, padding: isMobile ? "0 20px" : "0 32px" }}
      >
        <div className="flex items-center">
          <img
            src="https://www.provincialnetcash.com/landing/img/logo-bbva.png"
            alt="BBVA Provincial"
            style={{ height: 32 }}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-white flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none rounded"
            style={{ fontSize: 15, fontFamily: "BentonSansBBVA-Book, Helvetica, Arial, sans-serif" }}
            aria-label="Salir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Salir</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col items-start justify-start"
        style={{
          paddingTop:    isMobile ? 24 : 48,
          paddingBottom: isMobile ? 24 : 48,
          paddingLeft:   isMobile ? 20 : 138,
          paddingRight:  isMobile ? 20 : 32,
        }}
      >
        <div className="w-full" style={{ maxWidth: isMobile ? "100%" : 630 }}>
          <h1
            style={{
              color: "#121212",
              fontSize: isMobile ? "20px" : "34.5px",
              fontFamily: "BentonSansBBVA-Book, Helvetica, Arial, sans-serif",
              fontWeight: 400,
              marginTop:    isMobile ? "20px" : "34.5px",
              marginBottom: isMobile ? "16px" : "23.115px",
              lineHeight: 1.3,
            }}
          >
            ¿A cuál plataforma de banca en línea deseas ingresar?
          </h1>

          <div
            role="radiogroup"
            aria-label="Plataforma de banca en línea"
            className="w-full flex flex-col mb-8"
            style={{ gap: isMobile ? 12 : 16, maxWidth: isMobile ? "100%" : 630 }}
          >
            {options.map((option) => {
              const isSelected = selected === option.id;
              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: isMobile ? 0 : -2 }}
                  transition={{ type: "tween", duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setSelected(option.id)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") setSelected(option.id);
                  }}
                  className={[
                    "w-full cursor-pointer select-none",
                    "flex flex-col justify-center",
                    "transition-shadow duration-200",
                    "focus:outline-none",
                    isSelected
                      ? "border border-[#e0e7ee] bg-[#EAEAEA]"
                      : "border border-[#e0e7ee] bg-[#F4F4F4] shadow-none hover:shadow-sm",
                  ].join(" ")}
                  style={{
                    boxSizing: "border-box",
                    height:  isMobile ? "auto" : "160.7px",
                    padding: isMobile ? "18px 16px 22px 16px" : "42px 42px 52.5px 21px",
                  }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: 25.2, height: 25.2, marginBottom: isMobile ? 10 : 21 }}
                  >
                    <div
                      className="rounded-full border-2 flex items-center justify-center transition-all duration-150"
                      style={{ width: 25.2, height: 25.2, borderColor: "#000000", backgroundColor: "#FFFFFF" }}
                    >
                      {isSelected && (
                        <div className="rounded-full" style={{ width: 13, height: 13, backgroundColor: "#000000" }} />
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      color: "#121212",
                      fontSize: isMobile ? "16px" : "21px",
                      fontFamily: "BentonSansBBVA-Medium, Helvetica, Arial, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {option.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <ContinuarButton onClick={handleContinuar} isMobile={isMobile} />
        </div>
      </main>
    </div>
  );
}

function ContinuarButton({ onClick, isMobile }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97, backgroundColor: "#004481" }}
      transition={{ duration: 0.12 }}
      className="text-white focus:outline-none"
      style={{
        width:        isMobile ? "100%" : 206,
        height:       isMobile ? 56 : 75,
        fontSize:     isMobile ? "1.1em" : "1.25em",
        fontFamily:   "BentonSansBBVA-Medium, Helvetica, Arial, sans-serif",
        fontWeight:   "normal",
        borderRadius: 0,
        border:       "none",
        textAlign:    "center",
        cursor:       "pointer",
        display:      "block",
        margin:       "0.625em 0",
        backgroundColor: "#1464A5",
      }}
    >
      Continuar
    </motion.button>
  );
}
