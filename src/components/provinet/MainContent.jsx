import React from 'react';

export default function MainContent() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const dateStr = `${dd}/${mm}/${yyyy}`;
  const timeStr = `${hh}:${min}:${ss}`;

  return (
    <div style={{
      flex: 1,
      background: '#fff',
      fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
      fontSize: '11px',
      overflowY: 'auto',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #a0bfc8',
        background: '#C2DEE4',
        padding: '0'
      }}>
        <div style={{
          background: '#C2DEE4',
          border: '1px solid #a0bfc8',
          borderBottom: '1px solid #C2DEE4',
          padding: '6px 10px',
          fontSize: '11px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: '#551A8B',
          margin: '1px 7px 0px 0px',
          cursor: 'default'
        }}>
          Consultar
        </div>
      </div>

      {/* Access info bar */}
      <div style={{
        background: '#C2DEE4',
        borderBottom: '1px solid #a0bfc8',
        padding: '10px 10px 8px 10px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '11px',
        color: '#376CA2'
      }}>
        <div style={{ marginBottom: '6px', color: '#376CA2' }}>
          Su último acceso a Provinet fue el día {dateStr} a las {timeStr} a.m
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#" style={{ color: '#551A8B', textDecoration: 'underline', fontSize: '10px' }}>•Integrada</a>
          <a href="#" style={{ color: '#551A8B', textDecoration: 'underline', fontSize: '10px' }}>• Detallada</a>
          <a href="#" style={{ color: '#551A8B', textDecoration: 'underline', fontSize: '10px' }}>•Actualizar Provinet</a>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '897px', border: '1px solid #b8d4e8' }}>
          <div style={{
            background: '#009EE5',
            color: '#FDFDFD',
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '33px'
          }}>
            <img src="https://ve1.provinet.net/DFAUTH/buzon/Bienvenido.png" alt="Bienvenido" style={{ height: '22px', paddingTop: '6px' }} />
          </div>

          <img
            src="https://ve1.provinet.net/DFAUTH/buzon/buzon_default53000.jpg"
            alt="Buzón"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '897px', marginTop: '8px', border: '1px solid #b8d4e8', display: 'flex' }}>
          {[
            { src: 'https://ve1.provinet.net/DFAUTH/buzon/Contrata%20servicio%20de%20nomina.jpg', alt: 'Contrata servicio de nómina' },
            { src: 'https://ve1.provinet.net/DFAUTH/buzon/Disfruta%20servicios.jpg', alt: 'Disfruta servicios' },
            { src: 'https://ve1.provinet.net/DFAUTH/buzon/Solicita%20tarjeta%20de%20credito%20negocio.jpg', alt: 'Solicita tarjeta de crédito negocio' },
            { src: 'https://ve1.provinet.net/DFAUTH/buzon/Financiate%20prestamo%20pymes.jpg', alt: 'Finánciate préstamo pymes' }
          ].map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt={item.alt}
              style={{ width: '25%', height: 'auto', display: 'block', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #c0c0c0',
        padding: '6px 10px',
        textAlign: 'center',
        fontSize: '10px',
        color: '#0044aa',
        background: '#f8f8f8'
      }}>
        <a href="#" style={{ color: '#0044aa', textDecoration: 'underline', marginRight: '8px' }}>Tarifas</a>
        |
        <a href="#" style={{ color: '#0044aa', textDecoration: 'underline', margin: '0 8px' }}>Aviso Legal</a>
        |
        <a href="#" style={{ color: '#0044aa', textDecoration: 'underline', marginLeft: '8px' }}>Info seguridad</a>
      </div>
    </div>
  );
}
