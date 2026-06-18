import React from 'react';
import { auth } from '@/api/authClient';

export default function HeaderBar({ userName }) {
  const now = new Date();
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dateStr = `${days[now.getDay()]} ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;

  const handleLogout = () => {
    auth.logout('/login');
  };

  return (
    <div style={{ width: '100%', height: '99px', display: 'flex', flexDirection: 'column', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
      {/* Top date bar */}
      <div style={{
        background: 'linear-gradient(to bottom, #4a7ab5, #3a6aa0)',
        color: '#fff',
        fontSize: '10px',
        padding: '0 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '24px',
        borderBottom: '1px solid #2d5a8a'
      }}>
        <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', color: '#FFFFFF' }}>&nbsp;&nbsp;{dateStr}</span>
        <img
          src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/desconexion4.gif"
          alt="Desconexión"
          onClick={handleLogout}
          style={{ width: '110px', height: '18.91px', cursor: 'pointer' }}
        />
      </div>

      {/* Main header */}
      <div style={{
        background: '#FFFFFF',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        borderBottom: '3px solid #c8a050'
      }}>
        {/* Left: Logo + client name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <img
            src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_pub/imagenes/ttl_provinet_empresas.gif"
            alt="Provinet Empresas"
            style={{ height: '40px', display: 'block' }}
          />
          <span style={{
            fontSize: '11px',
            color: '#000',
            marginLeft: '16px',
            background: '#FFFFFF',
            padding: '2px 8px',
            display: 'inline-block',
            minWidth: '220px'
          }}>
            Cliente: {userName || 'EMPRENDIMIENTO YERIK A FRANCO'}
          </span>
        </div>

        {/* Right: Social icons + Ayuda button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/logo_instagram.png" alt="Instagram" style={{ width: '31px', height: '31px', margin: '2px 1mm 0px 1mm', cursor: 'pointer' }} />
          <img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/logo_facebook.png" alt="Facebook" style={{ width: '31px', height: '31px', margin: '2px 1mm 0px 1mm', cursor: 'pointer' }} />
          <img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/logo_twitter.png" alt="Twitter" style={{ width: '31px', height: '31px', margin: '2px 1mm 0px 1mm', cursor: 'pointer' }} />
          <img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/youtube.png" alt="YouTube" style={{ width: '31px', height: '31px', margin: '2px 1mm 0px 1mm', cursor: 'pointer' }} />
          <img src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/boto3-es.gif" alt="Boton Ayuda" style={{ width: '110px', height: '36px', margin: '2px 1mm 0px 1mm', cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
}
