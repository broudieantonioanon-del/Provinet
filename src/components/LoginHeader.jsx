import { X } from "lucide-react";

export default function LoginHeader() {
  return (
    <header className="bg-[hsl(var(--primary))] px-4 w-full h-[67px] flex items-center justify-between">
      <div className="flex items-center h-full">
        <img
          src="https://ve1.provinet.net/nhvp_ve_web/atpn_es_web_jsp/imgEmp/logo-bbva.png"
          alt="BBVA Provincial"
          className="h-[32px] object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }} />
        
        <span className="text-white font-bold text-lg tracking-tight hidden">
          <span className="font-extrabold">BBVA</span>{" "}
          <span className="font-light">Provincial</span>
        </span>
      </div>
      <div className="flex items-center gap-3 text-white">
        <button className="hover:opacity-80 transition-opacity">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <button className="text-sm font-normal hover:opacity-80 transition-opacity">
          Salir
        </button>
      </div>
    </header>);

}