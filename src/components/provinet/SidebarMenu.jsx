import React, { useState } from 'react';

const menuData = [
  {
    section: 'Productos',
    items: [
      { label: 'Buzón de Mensajes', id: 'buzon' },
      { label: 'Posición Global', id: 'posicion' },
      { label: 'Cuentas', id: 'cuentas', hasOrange: true },
      { label: 'Transferencias', id: 'transferencias' },
      { label: 'Chequeras', id: 'chequeras' },
      { label: 'Tarjetas de Crédito', id: 'tarjetas_credito' },
      { label: 'Inversiones', id: 'inversiones' },
      { label: 'Préstamos', id: 'prestamos' },
      { label: 'Comercio Exterior', id: 'comercio' },
      { label: 'Operaciones en Divisas', id: 'divisas' },
    ]
  },
  {
    section: 'Servicios',
    items: [
      { label: 'Pago de Servicios', id: 'pago_servicios' },
      { label: 'SENIAT', id: 'seniat' },
      { label: 'Cheques de Gerencia', id: 'cheques_gerencia' },
      { label: 'Referencias Bancarias', id: 'referencias' },
      { label: 'Preindicación', id: 'preindizacion' },
      { label: 'Provitexto', id: 'provitexto' },
      { label: 'Pago Nómina', id: 'pago_nomina' },
      { label: 'Administración Usuarios', id: 'admin_usuarios' },
      { label: 'Administración Tarjetas', id: 'admin_tarjetas' },
      { label: 'Bitácora Operaciones', id: 'bitacora' },
      { label: 'Tarjeta de Coordenadas', id: 'coordenadas' },
      { label: 'Claves y Datos', id: 'claves' },
    ]
  }
];

export default function SidebarMenu({ activeItem, onItemClick }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div style={{
      width: '145px',
      minWidth: '145px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '11px',
      background: '#ABC7E4',
      position: 'relative',
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}>
        {menuData.map((group, gi) => (
          <div key={gi}>
            <div style={{
              background: '#4A7AB5',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '4px 8px',
              height: '23px',
              display: 'flex',
              alignItems: 'center',
              marginTop: '9px',
            }}>
              &nbsp;&nbsp;{group.section}
            </div>

            {group.items.map((item, ii) => {
              const isHovered = hoveredItem === item.id;
              const isActive = activeItem === item.id;

              return (
                <div
                  key={ii}
                  onClick={() => onItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    height: '21px',
                    minHeight: '21px',
                    cursor: 'pointer',
                    borderTop: '1px solid #C2DEE4',
                    background: isActive ? '#c5d9ee' : '#EFF7F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 4px 0 4px',
                  }}
                >
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    style={{
                      color: '#0000EE',
                      textDecoration: isHovered ? 'underline' : 'none',
                      fontSize: '11px',
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      &nbsp;{item.label}
                    </span>
                    {item.hasOrange && (
                      <img
                        src="https://ve1.provinet.net/shvp_ve_web/atpn_es_web_jsp/html/images/icono_naranja.png"
                        alt=""
                        style={{ width: '13px', height: '12px', flexShrink: 0, position: 'relative', right: '15mm' }}
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ height: '9px' }} />
      </div>

      <div style={{
        position: 'absolute',
        right: '0',
        top: '0',
        bottom: '0',
        width: '4px',
        background: '#ABC7E4',
        borderLeft: '1px solid #008A8A',
        borderRight: '1px solid #008A8A',
      }} />
    </div>
  );
}
