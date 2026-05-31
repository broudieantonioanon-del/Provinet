// @ts-nocheck
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const SITE_URL      = 'https://www.provinetservicios.com.ve';
const SITE_NAME     = 'Provinet Empresas Pymes Blog';
const CONTACT_EMAIL = 'contacto@provinetservicios.com.ve';
const CONTACT_PHONE = '+58 212-000-0000';
const ADDRESS       = 'Caracas, Venezuela';
const LAST_UPDATED  = '31 de mayo de 2026';

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Provinet Empresas Pymes Blog",
  "description": "Blog educativo sobre empresas: qué son, cómo funcionan, tipos de empresas, emprendimiento, gestión empresarial y registro en Venezuela",
  "url": SITE_URL,
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "email": CONTACT_EMAIL,
    "address": { "@type": "PostalAddress", "addressLocality": "Caracas", "addressCountry": "VE" }
  }
});

const C = {
  bg:     '#F1F5F9',
  panel:  '#EEF2FF',
  dark:   '#0F1E4A',
  navy:   '#1E3A8A',
  blue:   '#2563EB',
  text:   '#1E293B',
  muted:  '#64748B',
  border: '#CBD5E1',
  white:  '#FFFFFF',
  silver: '#E2E8F0',
};

const ARTICLES = [
  { id:1, icon:'⚖️', category:'Tipos de Pyme', catBg:'#DBEAFE', catColor:'#1D4ED8',
    title:'¿Qué es una Pyme? Definición, características y clasificación en Venezuela',
    excerpt:'Una Pyme es mucho más que un negocio pequeño. Te explicamos qué son las pequeñas y medianas empresas en Venezuela, cómo se clasifican y por qué son el motor real de la economía del país.',
    readTime:'7 min', date:'28 may 2026' },
  { id:2, icon:'📋', category:'Tipos de Pyme', catBg:'#F0F9FF', catColor:'#0369A1',
    title:'Figuras jurídicas para Pymes en Venezuela: C.A., SRL y firma personal',
    excerpt:'Antes de abrir tu negocio debes elegir la figura legal correcta. Te explicamos las diferencias entre Compañía Anónima, SRL y firma personal, y cuándo conviene cada una.',
    readTime:'8 min', date:'23 may 2026' },
  { id:3, icon:'💡', category:'Emprendimiento', catBg:'#F5F3FF', catColor:'#5B21B6',
    title:'Cómo crear una Pyme en Venezuela: pasos legales y trámites esenciales',
    excerpt:'Formalizar tu negocio en Venezuela requiere seguir pasos ante el Registro Mercantil, el SENIAT y otros organismos. Te guíamos paso a paso para que no te falte nada.',
    readTime:'9 min', date:'18 may 2026' },
  { id:4, icon:'💰', category:'Finanzas', catBg:'#FFF7ED', catColor:'#C2410C',
    title:'Fuentes de financiamiento para Pymes en Venezuela: guía completa',
    excerpt:'El acceso al crédito es uno de los mayores retos de las Pymes venezolanas. Conoce las principales fuentes de financiamiento bancario, estatal y privado, y cómo acceder a ellas.',
    readTime:'8 min', date:'12 may 2026' },
  { id:5, icon:'📊', category:'Administración', catBg:'#F0FDF4', catColor:'#15803D',
    title:'Administración básica para tu Pyme: lo que debes controlar cada mes',
    excerpt:'Una Pyme bien administrada sobrevive y crece; una mal administrada cierra aunque venda mucho. Aprende los conceptos básicos que todo emprendedor debe dominar.',
    readTime:'7 min', date:'6 may 2026' },
  { id:6, icon:'📈', category:'Crecimiento', catBg:'#FFF1F2', catColor:'#BE123C',
    title:'Marketing digital para Pymes venezolanas: cómo conseguir clientes en internet',
    excerpt:'Internet es el canal más accesible para que una Pyme venezolana llegue a nuevos clientes. Estrategias básicas que funcionan con presupuesto limitado: Instagram, WhatsApp Business y más.',
    readTime:'8 min', date:'30 abr 2026' },
]
const CATEGORIES = [
  { name:'Tipos de Pyme',    count:16, icon:'⚖️', bg:'#DBEAFE', color:'#1D4ED8' },
  { name:'Emprendimiento',   count:19, icon:'💡', bg:'#F0F9FF', color:'#0369A1' },
  { name:'Finanzas',         count:15, icon:'💰', bg:'#F5F3FF', color:'#5B21B6' },
  { name:'Administración',   count:14, icon:'📊', bg:'#F0FDF4', color:'#15803D' },
  { name:'Crecimiento',      count:13, icon:'📈', bg:'#FFF7ED', color:'#C2410C' },
  { name:'Digitalización',   count:11, icon:'🖥️', bg:'#FFF1F2', color:'#BE123C' },
]
const BIZ_ICONS = ['🏢','🏦','📊','💰','🤝','📈','🏗️','⚖️','💡','🌐','🏭','📋','🗂️','💼','🔑','📑'];

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function RioProvincial() {
  const isMobile = useIsMobile();
  const [cookie, setCookie] = useState(false);
  const [modal,  setModal]  = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Provinet Empresas Pymes Blog | Todo sobre Pymes y Negocios en Venezuela';
    const m = (a, n, c) => {
      let el = document.querySelector(`meta[${a}="${n}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(a, n); document.head.appendChild(el); }
      el.setAttribute('content', c);
    };
    m('name','description','Blog educativo sobre Pymes en Venezuela: cómo crear, administrar, financiar y hacer crecer tu pequeña o mediana empresa. Guías prácticas y gratuitas para emprendedores venezolanos.');
    m('name','keywords','pymes Venezuela,pequeña empresa Venezuela,mediana empresa Venezuela,cómo crear pyme Venezuela,emprendimiento Venezuela,financiamiento pymes,administración pymes,SRL,CA,Caracas');
    m('property','og:title','Provinet Empresas Pymes Blog | Todo sobre Empresas');
    m('property','og:type','website');
    m('property','og:url', SITE_URL);
    const s = document.createElement('script');
    s.id='schema-servicios'; s.type='application/ld+json'; s.textContent=SCHEMA;
    if (!document.querySelector('#schema-servicios')) document.head.appendChild(s);
    if (localStorage.getItem('provinet_sg_cookie')==='1') setCookie(true);
    return () => { document.querySelector('#schema-servicios')?.remove(); };
  }, []);

  const acceptCookie = () => { localStorage.setItem('provinet_sg_cookie','1'); setCookie(true); };

  return (
    <div style={{ fontFamily:'"Segoe UI",system-ui,sans-serif', background:C.bg, color:C.text, overflowX:'hidden' }}>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav style={{ background:C.white, borderBottom:`1px solid ${C.border}`, position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 16px rgba(15,30,74,0.10)' }}>
        <div style={{ maxWidth:1140, margin:'0 auto', padding: isMobile ? '0 16px' : '0 24px', height: isMobile ? 60 : 68, display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
            <div style={{ width:4, height:32, background:`linear-gradient(180deg,${C.blue},${C.navy})`, borderRadius:4, flexShrink:0 }} />
            <span style={{ fontSize: isMobile ? 19 : 24, flexShrink:0 }}>🏢</span>
            {isMobile ? (
              <span style={{ fontWeight:800, color:C.dark, lineHeight:1.2, fontSize:12 }}>
                Provinet <span style={{ color:C.blue }}>Empresas</span><br />Blog Educativo
              </span>
            ) : (
              <span style={{ fontWeight:800, fontSize:15, color:C.dark, whiteSpace:'nowrap', lineHeight:1.2 }}>
                Provinet <span style={{ color:C.blue }}>Empresas</span> Blog Educativo
              </span>
            )}
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display:'flex', alignItems:'center', gap:2 }}>
              {['#articulos','#categorias','#nosotros'].map((href,i) => (
                <a key={href} href={href} style={{ color:C.muted, fontSize:14, fontWeight:600, padding:'10px 16px', textDecoration:'none', borderRadius:8, letterSpacing:0.2 }}>
                  {['Artículos','Categorías','Nosotros'][i]}
                </a>
              ))}
              <a href="#contacto" style={{ background:`linear-gradient(135deg,${C.blue},${C.navy})`, color:C.white, fontSize:14, fontWeight:700, padding:'9px 22px', borderRadius:8, textDecoration:'none', marginLeft:10, boxShadow:`0 4px 14px rgba(37,99,235,0.35)` }}>
                Contacto
              </a>
            </div>
          )}

          {/* Mobile: botón contacto + hamburger */}
          {isMobile && (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <a href="#contacto" style={{ background:C.navy, color:C.white, fontSize:13, fontWeight:600, padding:'7px 14px', borderRadius:6, textDecoration:'none' }}>
                Contacto
              </a>
              <button onClick={() => setMenuOpen(!menuOpen)}
                style={{ background:'none', border:`1.5px solid ${C.border}`, borderRadius:6, padding:'6px 10px', cursor:'pointer', fontSize:18, color:C.dark, display:'flex', alignItems:'center' }}>
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={{ background:C.white, borderTop:`1px solid ${C.border}`, padding:'12px 16px 16px', display:'flex', flexDirection:'column', gap:4 }}>
            {[['#articulos','Artículos'],['#categorias','Categorías'],['#nosotros','Nosotros']].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{ color:C.text, fontSize:15, fontWeight:500, padding:'10px 12px', textDecoration:'none', borderRadius:8, display:'block', background:C.bg }}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section style={{
        background:`linear-gradient(140deg, #080f2a 0%, ${C.dark} 55%, #162B6E 100%)`,
        position:'relative',
        zIndex:1,
        paddingBottom: isMobile ? 0 : 56,
        clipPath: isMobile ? 'none' : 'polygon(0 0, 100% 0, 100% 88%, 0 100%)',
        marginBottom: isMobile ? 0 : -36,
      }}>
        <div style={{ maxWidth:1140, margin:'0 auto', padding: isMobile ? '0' : '0 24px', display:'flex', alignItems:'center', gap:0 }}>

          {/* Texto izquierdo */}
          <div style={{ flex:'1 1 0', padding: isMobile ? '44px 24px 36px' : '88px 0 80px' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(37,99,235,0.2)', border:'1px solid rgba(147,197,253,0.35)', color:'#93C5FD', fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', padding:'5px 14px', borderRadius:20, marginBottom:22 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#93C5FD', display:'inline-block' }} />
              Blog de Pymes · Venezuela
            </span>
            <h1 style={{ color:C.white, fontSize: isMobile ? 'clamp(30px,9vw,42px)' : 'clamp(32px,3.8vw,52px)', fontWeight:900, lineHeight:1.1, margin:'0 0 18px', letterSpacing:'-1.5px' }}>
              Todo sobre<br />
              <span style={{ background:'linear-gradient(90deg,#60A5FA,#93C5FD)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Pymes</span>
              <br />en Venezuela
            </h1>
            <p style={{ color:'#94A3B8', fontSize: isMobile ? 15 : 16, lineHeight:1.75, margin:'0 0 32px', maxWidth:400 }}>
              Aprende qué son las Pymes, cómo crearlas, administrarlas y hacerlas crecer — guías prácticas y gratuitas para emprendedores venezolanos.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <a href="#articulos" style={{ background:`linear-gradient(135deg,${C.blue},#1D4ED8)`, color:C.white, fontWeight:700, fontSize:15, padding:'13px 28px', borderRadius:8, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, boxShadow:'0 6px 20px rgba(37,99,235,0.45)' }}>
                📖 Leer artículos
              </a>
              <a href="#categorias" style={{ background:'rgba(255,255,255,0.07)', color:'#CBD5E1', fontWeight:600, fontSize:15, padding:'13px 24px', borderRadius:8, textDecoration:'none', border:'1.5px solid rgba(255,255,255,0.15)', display:'inline-flex', alignItems:'center', backdropFilter:'blur(4px)' }}>
                Ver categorías
              </a>
            </div>
          </div>

          {/* Visual derecho — solo desktop */}
          {!isMobile && (
            <div style={{ flex:'0 0 400px', height:480, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {/* Círculo exterior decorativo */}
              <div style={{ position:'absolute', width:320, height:320, borderRadius:'50%', border:'1px dashed rgba(147,197,253,0.18)', pointerEvents:'none' }} />
              <div style={{ position:'absolute', width:240, height:240, borderRadius:'50%', border:'1px solid rgba(37,99,235,0.25)', pointerEvents:'none' }} />
              {/* Círculo central */}
              <div style={{ width:170, height:170, borderRadius:'50%', background:'rgba(37,99,235,0.18)', border:'2px solid rgba(96,165,250,0.4)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, zIndex:2 }}>
                <span style={{ fontSize:42 }}>🏢</span>
                <p style={{ color:C.white, fontWeight:900, fontSize:30, margin:0, letterSpacing:'-1px' }}>80+</p>
                <p style={{ color:'#93C5FD', fontSize:12, margin:0, fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Artículos</p>
              </div>
              {/* Badges flotantes */}
              {[
                { top:48,  left:16,  icon:'⚖️', label:'Tipos de Pyme' },
                { top:44,  right:8,  icon:'💡', label:'Emprendimiento'   },
                { bottom:100, left:4,  icon:'💰', label:'Finanzas'          },
                { bottom:60, right:12, icon:'📈', label:'Crecimiento'       },
              ].map((b,i) => (
                <div key={i} style={{ position:'absolute', top:b.top, bottom:b.bottom, left:b.left, right:b.right, background:'rgba(255,255,255,0.08)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:12, padding:'9px 16px', display:'flex', alignItems:'center', gap:8, whiteSpace:'nowrap', zIndex:3 }}>
                  <span style={{ fontSize:20 }}>{b.icon}</span>
                  <span style={{ color:C.white, fontSize:12, fontWeight:700 }}>{b.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Strip mobile */}
          {isMobile && null}
        </div>

        {/* Strip de iconos en mobile — fuera del flex */}
        {isMobile && (
          <div style={{ padding:'18px 16px 22px', display:'flex', gap:10, overflowX:'auto', scrollbarWidth:'none' }}>
            {BIZ_ICONS.map((e,i) => (
              <div key={i} style={{ width:44, height:44, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                {e}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── ARTÍCULOS DESTACADOS ────────────────────────────────── */}
      <section id="articulos" style={{ padding: isMobile ? '56px 16px 48px' : '96px 24px 72px', background:C.bg, position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36, flexWrap:'wrap' }}>
            <div>
              <p style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:2, textTransform:'uppercase', margin:'0 0 4px' }}>Guías más leídas</p>
              <h2 style={{ fontSize: isMobile ? 22 : 'clamp(22px,3vw,32px)', fontWeight:900, color:C.dark, margin:0, letterSpacing:'-0.5px' }}>
                Artículos sobre Pymes
              </h2>
            </div>
            {!isMobile && <div style={{ flex:1, height:1, background:C.border, marginTop:18 }} />}
            <span style={{ fontSize:11, color:C.white, fontWeight:700, textTransform:'uppercase', letterSpacing:1, background:C.blue, padding:'5px 12px', borderRadius:20, marginTop: isMobile ? 0 : 18 }}>
              Actualización semanal
            </span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap:20 }}>
            <FeaturedCard article={ARTICLES[0]} isMobile={isMobile} />
            <div style={{ display:'flex', flexDirection: isMobile ? 'row' : 'column', gap:isMobile ? 14 : 20, flexWrap: isMobile ? 'nowrap' : 'unset', overflowX: isMobile ? 'auto' : 'visible' }}>
              <SmallCard article={ARTICLES[1]} isMobile={isMobile} />
              <SmallCard article={ARTICLES[2]} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ ES UNA EMPRESA — bloque informativo ─────────────── */}
      <section style={{ background:C.white, padding: isMobile ? '48px 16px' : '72px 24px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems: isMobile ? 'flex-start' : 'center', gap:20, marginBottom: isMobile ? 28 : 44, flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ flex:1 }}>
              <p style={{ color:C.blue, fontWeight:700, fontSize:11, letterSpacing:2, textTransform:'uppercase', margin:'0 0 6px' }}>Claves para tu Pyme</p>
              <h2 style={{ fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:900, color:C.dark, margin:0, letterSpacing:'-0.5px' }}>
                ¿Qué necesita saber toda Pyme venezolana?
              </h2>
            </div>
            {!isMobile && (
              <p style={{ color:C.muted, fontSize:15, maxWidth:380, margin:0, lineHeight:1.7, flex:'0 0 380px' }}>
                Conocimiento clave sobre creación, administración y crecimiento de Pymes en Venezuela.
              </p>
            )}
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:14 }}>
            {[
              { icon:'⚖️', title:'Figura jurídica', text:'Elige entre C.A., SRL o firma personal según tus socios, responsabilidad y planes de crecimiento.', accent:'#DBEAFE', accentText:'#1D4ED8' },
              { icon:'💰', title:'Financiamiento', text:'Crédito bancario, fondos del Estado (BANDES, Fondemi) y reinversión de ganancias para crecer.', accent:'#F0FDF4', accentText:'#15803D' },
              { icon:'📊', title:'Administración', text:'Control mensual del flujo de caja, ventas, costos y cuentas por cobrar para tomar decisiones.', accent:'#F5F3FF', accentText:'#5B21B6' },
              { icon:'📋', title:'Obligaciones fiscales', text:'RIF vigente, declaración de IVA e ISLR ante el SENIAT y facturación legal obligatoria.', accent:'#FFF7ED', accentText:'#C2410C' },
              { icon:'📱', title:'Digitalización', text:'WhatsApp Business, Google Business e Instagram para llegar a más clientes con bajo presupuesto.', accent:'#FFF1F2', accentText:'#BE123C' },
              { icon:'📈', title:'Crecimiento', text:'Marketing digital, alianzas estratégicas y expansión gradual para escalar tu Pyme paso a paso.', accent:'#F0F9FF', accentText:'#0369A1' },
            ].map(item => (
              <div key={item.title} style={{ background:item.accent, borderRadius:14, padding: isMobile ? '20px 18px' : '24px 22px', border:`1px solid ${item.accentText}18`, display:'flex', gap:14, alignItems:'flex-start' }}>
                <div style={{ width:44, height:44, borderRadius:10, background:'rgba(255,255,255,0.6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ color:item.accentText, fontWeight:800, fontSize:14, margin:'0 0 6px' }}>{item.title}</h3>
                  <p style={{ color:'#334155', fontSize:13, lineHeight:1.7, margin:0 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ─────────────────────────────────────────── */}
      <section id="categorias" style={{ background:C.dark, padding: isMobile ? '40px 16px' : '56px 24px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ marginBottom:28 }}>
            <p style={{ color:'#93C5FD', fontWeight:700, fontSize:12, letterSpacing:2, textTransform:'uppercase', margin:'0 0 6px' }}>Explora por tema</p>
            <h2 style={{ color:C.white, fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:800, margin:0, letterSpacing:'-0.5px' }}>Categorías del Blog de Pymes</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap:12 }}>
            {CATEGORIES.map(cat => <CategoryCard key={cat.name} cat={cat} isMobile={isMobile} />)}
          </div>
        </div>
      </section>

      {/* ── MÁS ARTÍCULOS ───────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '40px 16px' : '72px 24px', background:C.bg }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <h2 style={{ fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:800, color:C.dark, margin:'0 0 28px', letterSpacing:'-0.5px' }}>
            Más artículos sobre Pymes
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {ARTICLES.slice(3,6).map((a,i) => (
              <HorizontalCard key={a.id} article={a} last={i===2} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section style={{ background:C.dark, padding: isMobile ? '40px 16px' : '56px 24px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap:14 }}>
            {[
              { n:'80+',  label:'Artículos publicados', icon:'📝', accent:'#60A5FA' },
              { n:'6',    label:'Categorías temáticas', icon:'🗂️', accent:'#34D399' },
              { n:'15+',  label:'Años de experiencia',  icon:'💼', accent:'#FBBF24' },
              { n:'100%', label:'Contenido gratuito',   icon:'🎓', accent:'#A78BFA' },
            ].map(s => (
              <div key={s.n} style={{ background:'rgba(255,255,255,0.05)', border:`1px solid rgba(255,255,255,0.08)`, borderTop:`3px solid ${s.accent}`, borderRadius:12, textAlign:'center', padding: isMobile ? '22px 10px' : '28px 20px' }}>
                <span style={{ fontSize: isMobile ? 26 : 30, display:'block', marginBottom:10 }}>{s.icon}</span>
                <p style={{ fontSize: isMobile ? 'clamp(24px,7vw,34px)' : 'clamp(26px,4vw,38px)', fontWeight:900, color:s.accent, margin:'0 0 4px', letterSpacing:'-1px' }}>{s.n}</p>
                <p style={{ fontSize: isMobile ? 12 : 13, color:'#94A3B8', margin:0, lineHeight:1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ─────────────────────────────────────── */}
      <section id="nosotros" style={{ padding: isMobile ? '48px 16px' : '80px 24px', background:C.white }}>
        <div style={{ maxWidth:1140, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(340px,1fr))', gap: isMobile ? 28 : 64, alignItems:'center' }}>
          <div style={{ background:C.navy, borderRadius:16, padding: isMobile ? '32px 24px' : '48px 40px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-20, right:-20, fontSize:100, opacity:0.08, userSelect:'none' }}>🏢</div>
            <span style={{ background:C.blue, color:C.white, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'5px 12px', borderRadius:20, display:'inline-block', marginBottom:18 }}>
              Quiénes somos
            </span>
            <h2 style={{ color:C.white, fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:900, lineHeight:1.2, margin:'0 0 18px', letterSpacing:'-0.5px' }}>
              El blog de Pymes para Venezuela
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {['Tipos de Pyme: C.A., SRL y firma personal','Cómo crear y registrar tu Pyme','Financiamiento y crédito para Pymes','Administración y gestión financiera','Marketing digital y crecimiento'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:8, height:8, background:'#93C5FD', borderRadius:'50%', flexShrink:0, display:'inline-block' }} />
                  <span style={{ color:'#BFDBFE', fontSize:15, fontWeight:500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize:12, color:C.blue, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>Nuestra misión</p>
            <h3 style={{ fontSize: isMobile ? 18 : 'clamp(18px,2vw,24px)', fontWeight:800, color:C.dark, margin:'0 0 16px', lineHeight:1.3 }}>
              Educación sobre Pymes gratuita y accesible para Venezuela
            </h3>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:'0 0 14px' }}>
              <strong style={{ color:C.dark }}>Provinet Empresas Pymes Blog</strong> es un portal venezolano dedicado a explicar, de forma clara y práctica, todo lo que necesita saber un emprendedor: cómo crear una Pyme, cómo administrarla, financiarla y hacerla crecer en el mercado venezolano.
            </p>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:'0 0 14px' }}>
              Con amplia experiencia en el sector empresarial venezolano, compartimos guías, conceptos y estrategias adaptados a la realidad del emprendedor y la Pyme local.
            </p>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:0 }}>
              Nuestro compromiso: <strong style={{ color:C.dark }}>información gratuita, precisa y actualizada</strong> para toda la comunidad emprendedora y de Pymes venezolana.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ───────────────────────────────────────────── */}
      <section id="contacto" style={{ padding: isMobile ? '48px 16px' : '72px 24px', background:C.bg }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p style={{ color:C.blue, fontWeight:700, fontSize:12, letterSpacing:2, textTransform:'uppercase', marginBottom:8 }}>¿Tienes dudas?</p>
            <h2 style={{ fontSize: isMobile ? 22 : 'clamp(22px,3vw,34px)', fontWeight:900, color:C.dark, margin:'0 0 10px', letterSpacing:'-0.5px' }}>Contáctanos</h2>
            <p style={{ color:C.muted, fontSize: isMobile ? 15 : 17 }}>Preguntas, sugerencias o propuestas de artículos</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:16 }}>
            <ContactCard icon="📧" title="Correo Electrónico" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} desc="Respondemos en 48 horas hábiles" />
            <ContactCard icon="📞" title="Teléfono" value={CONTACT_PHONE} href={`tel:${CONTACT_PHONE.replace(/\s|-/g,'')}`} desc="Lun–Vie de 8:00 AM a 5:00 PM" />
            <ContactCard icon="📍" title="Ubicación" value={ADDRESS} desc="Operamos en todo el territorio nacional" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ background:C.dark, color:'#94A3B8' }}>
        <div style={{ borderBottom:'1px solid rgba(255,255,255,0.08)', padding: isMobile ? '36px 16px 28px' : '48px 24px 40px' }}>
          <div style={{ maxWidth:1140, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 28 : 40 }}>
            <div style={{ gridColumn: isMobile ? 'span 2' : 'span 1' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                <span style={{ fontSize:20 }}>🏢</span>
                <span style={{ color:C.white, fontWeight:800, fontSize:13 }}>Provinet Empresas Pymes Blog</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.75, margin:'0 0 10px' }}>Blog educativo sobre Pymes en Venezuela: creación, financiamiento, administración y crecimiento.</p>
              <p style={{ fontSize:12 }}><span style={{ color:'#93C5FD' }}>📍</span> {ADDRESS}</p>
              <p style={{ fontSize:12, marginTop:4 }}>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:'#94A3B8', textDecoration:'none' }}><span style={{ color:'#93C5FD' }}>📧</span> {CONTACT_EMAIL}</a>
              </p>
            </div>
            <div>
              <h4 style={{ color:C.white, fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Categorías</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
                {['Tipos de Pyme','Emprendimiento','Finanzas','Administración','Digitalización'].map(t => (
                  <a key={t} href="#categorias" style={{ color:'#94A3B8', textDecoration:'none' }}>{t}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color:C.white, fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Info</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
                <a href="#nosotros"  style={{ color:'#94A3B8', textDecoration:'none' }}>Sobre Nosotros</a>
                <a href="#articulos" style={{ color:'#94A3B8', textDecoration:'none' }}>Artículos</a>
                <a href="#contacto"  style={{ color:'#94A3B8', textDecoration:'none' }}>Contacto</a>
              </div>
            </div>
            <div>
              <h4 style={{ color:C.white, fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Legal</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
                {[['privacy','Privacidad'],['terms','Términos'],['cookies','Cookies'],['googleads','Google Ads']].map(([k,v]) => (
                  <button key={k} onClick={() => setModal(k)} style={{ color:'#94A3B8', background:'none', border:'none', cursor:'pointer', fontSize:13, padding:0, textAlign:'left' }}>{v}</button>
                ))}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:'#94A3B8', textDecoration:'none' }}>Contacto Legal</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1140, margin:'0 auto', padding: isMobile ? '16px' : '20px 24px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:10, fontSize:12 }}>
          <span>© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</span>
          <div style={{ display:'flex', gap:16 }}>
            {[['privacy','Privacidad'],['terms','Términos'],['cookies','Cookies'],['googleads','Google Ads']].map(([k,v]) => (
              <button key={k} onClick={() => setModal(k)} style={{ color:'#93C5FD', background:'none', border:'none', cursor:'pointer', fontSize:12 }}>{v}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── COOKIE BANNER ──────────────────────────────────────── */}
      {!cookie && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:999, background:C.dark, borderTop:`3px solid ${C.navy}`, padding: isMobile ? '14px 16px' : '16px 24px', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:12 }}>
          <p style={{ color:'#CBD5E1', fontSize:13, flex:'1 1 260px', margin:0 }}>
            Usamos cookies para mejorar tu experiencia y mostrar publicidad relevante.{' '}
            <button onClick={() => setModal('cookies')} style={{ color:'#93C5FD', background:'none', border:'none', cursor:'pointer', fontSize:13, padding:0, textDecoration:'underline' }}>Cookies</button>{' '}·{' '}
            <button onClick={() => setModal('privacy')} style={{ color:'#93C5FD', background:'none', border:'none', cursor:'pointer', fontSize:13, padding:0, textDecoration:'underline' }}>Privacidad</button>
          </p>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={acceptCookie} style={{ background:C.navy, color:C.white, border:'none', borderRadius:6, padding:'10px 22px', fontWeight:700, fontSize:14, cursor:'pointer', minHeight:42 }}>Aceptar</button>
            <button onClick={() => setModal('cookies')} style={{ background:'transparent', color:'#CBD5E1', border:'1px solid rgba(255,255,255,0.2)', borderRadius:6, padding:'10px 14px', fontSize:13, cursor:'pointer', minHeight:42 }}>Configurar</button>
          </div>
        </div>
      )}

      {/* ── MODALES ────────────────────────────────────────────── */}
      {modal && (
        <PolicyModal
          title={
            modal==='privacy'  ? 'Política de Privacidad' :
            modal==='terms'    ? 'Términos de Uso' :
            modal==='cookies'  ? 'Política de Cookies' :
                                 'Política de Google Ads'
          }
          onClose={() => setModal(null)}>
          {modal==='privacy'   && <PrivacyContent   onCookies={() => setModal('cookies')} />}
          {modal==='terms'     && <TermsContent />}
          {modal==='cookies'   && <CookiesContent   onAccept={() => { acceptCookie(); setModal(null); }} onPrivacy={() => setModal('privacy')} />}
          {modal==='googleads' && <GoogleAdsContent onPrivacy={() => setModal('privacy')} onCookies={() => setModal('cookies')} />}
        </PolicyModal>
      )}
    </div>
  );
}

// ── SUB-COMPONENTES ───────────────────────────────────────────────────────────

function FeaturedCard({ article: a, isMobile }) {
  return (
    <div style={{ background:C.white, borderRadius:16, overflow:'hidden', border:`1px solid ${C.border}`, display:'flex', flexDirection:'column', boxShadow:'0 8px 32px rgba(15,30,74,0.10)' }}>
      {/* Barra de color superior */}
      <div style={{ height:5, background:`linear-gradient(90deg,${a.catColor},${a.catColor}66)` }} />
      <div style={{ background:`linear-gradient(135deg,${a.catBg} 0%,${C.white} 100%)`, padding: isMobile ? '24px 20px 18px' : '36px 32px 24px', display:'flex', alignItems:'center', gap:16 }}>
        <div style={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80, background:C.white, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? 36 : 48, boxShadow:`0 4px 14px ${a.catColor}22` }}>
          {a.icon}
        </div>
        <div>
          <span style={{ background:a.catColor, color:C.white, fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20, textTransform:'uppercase', letterSpacing:1 }}>{a.category}</span>
          <p style={{ color:C.muted, fontSize:12, margin:'6px 0 0' }}>{a.date}</p>
        </div>
      </div>
      <div style={{ padding: isMobile ? '18px 20px 22px' : '24px 32px 32px', flex:1, display:'flex', flexDirection:'column', gap:12 }}>
        <h3 style={{ fontSize: isMobile ? 17 : 21, fontWeight:900, color:C.dark, lineHeight:1.3, margin:0 }}>{a.title}</h3>
        <p style={{ color:C.muted, fontSize: isMobile ? 14 : 15, lineHeight:1.8, margin:0, flex:1 }}>{a.excerpt}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, fontSize:13 }}>⏱ {a.readTime} de lectura</span>
          <span style={{ color:C.blue, fontSize:14, fontWeight:800, display:'flex', alignItems:'center', gap:4 }}>Leer <span>→</span></span>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ article: a, isMobile }) {
  return (
    <div style={{ background:C.white, borderRadius:14, overflow:'hidden', border:`1px solid ${C.border}`, display:'flex', flexShrink: isMobile ? 0 : 'unset', width: isMobile ? 250 : 'auto', boxShadow:'0 4px 16px rgba(15,30,74,0.07)', borderLeft:`4px solid ${a.catColor}` }}>
      <div style={{ background:a.catBg, width: isMobile ? 56 : 68, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? 26 : 30 }}>
        {a.icon}
      </div>
      <div style={{ padding: isMobile ? '13px 14px' : '16px 18px', flex:1, minWidth:0 }}>
        <span style={{ background:a.catBg, color:a.catColor, fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:1, padding:'2px 8px', borderRadius:20 }}>{a.category}</span>
        <h3 style={{ fontSize: isMobile ? 12 : 13, fontWeight:800, color:C.dark, lineHeight:1.4, margin:'6px 0 8px' }}>{a.title}</h3>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:C.muted, fontSize:11 }}>⏱ {a.readTime}</span>
          <span style={{ color:C.blue, fontSize:11, fontWeight:800, flexShrink:0 }}>Leer →</span>
        </div>
      </div>
    </div>
  );
}

function HorizontalCard({ article: a, last, isMobile }) {
  return (
    <div style={{ display:'flex', gap: isMobile ? 14 : 24, padding: isMobile ? '20px 0' : '28px 0', borderBottom: last ? 'none' : `1px solid ${C.border}`, alignItems:'flex-start' }}>
      <div style={{ width: isMobile ? 52 : 72, height: isMobile ? 52 : 72, background:a.catBg, borderRadius: isMobile ? 10 : 14, display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? 26 : 34, flexShrink:0 }}>
        {a.icon}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
          <span style={{ background:a.catBg, color:a.catColor, fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20, textTransform:'uppercase', letterSpacing:0.5 }}>{a.category}</span>
          <span style={{ color:C.muted, fontSize:12 }}>{a.date} · {a.readTime}</span>
        </div>
        <h3 style={{ fontSize: isMobile ? 15 : 17, fontWeight:800, color:C.dark, lineHeight:1.35, margin:'0 0 6px' }}>{a.title}</h3>
        {!isMobile && <p style={{ color:C.muted, fontSize:14, lineHeight:1.7, margin:0 }}>{a.excerpt}</p>}
      </div>
      {!isMobile && <span style={{ color:C.blue, fontSize:14, fontWeight:700, flexShrink:0, alignSelf:'center' }}>Leer →</span>}
    </div>
  );
}

function CategoryCard({ cat, isMobile }) {
  return (
    <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:12, padding: isMobile ? '16px 14px' : '20px 22px', display:'flex', alignItems:'center', gap:14, cursor:'default' }}>
      <div style={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius:10, background:cat.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? 20 : 24, flexShrink:0 }}>{cat.icon}</div>
      <div style={{ minWidth:0 }}>
        <p style={{ color:C.white, fontWeight:800, fontSize: isMobile ? 13 : 14, margin:'0 0 3px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cat.name}</p>
        <p style={{ color:'#64748B', fontSize:12, margin:0 }}>{cat.count} artículos</p>
      </div>
      {!isMobile && <span style={{ color:'#334155', marginLeft:'auto', fontSize:14 }}>→</span>}
    </div>
  );
}

function ContactCard({ icon, title, value, href = '', desc }) {
  return (
    <div style={{ background:C.white, borderRadius:12, padding:'24px 20px', border:`1px solid ${C.border}`, borderTop:`4px solid ${C.navy}` }}>
      <span style={{ fontSize:28, display:'block', marginBottom:12 }}>{icon}</span>
      <h3 style={{ color:C.dark, fontWeight:800, fontSize:15, marginBottom:8 }}>{title}</h3>
      {href
        ? <a href={href} style={{ color:C.navy, fontWeight:600, fontSize:13, display:'block', marginBottom:6, textDecoration:'none', wordBreak:'break-all' }}>{value}</a>
        : <p style={{ color:C.navy, fontWeight:600, fontSize:13, marginBottom:6 }}>{value}</p>
      }
      <p style={{ color:C.muted, fontSize:13, margin:0, lineHeight:1.6 }}>{desc}</p>
    </div>
  );
}

function PolicyModal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:C.white, width:'100%', maxWidth:700, maxHeight:'92vh', borderRadius:'20px 20px 0 0', display:'flex', flexDirection:'column', boxShadow:'0 -8px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 20px', borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <h2 style={{ margin:0, fontSize:17, fontWeight:800, color:C.dark }}>{title}</h2>
          <button onClick={onClose} style={{ background:C.silver, border:'none', borderRadius:'50%', width:34, height:34, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>×</button>
        </div>
        <div style={{ overflowY:'auto', padding:'20px', fontSize:14, color:'#475569', lineHeight:1.85 }}>{children}</div>
        <div style={{ padding:'14px 20px', borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
          <button onClick={onClose} style={{ width:'100%', background:C.dark, color:C.white, border:'none', borderRadius:8, padding:'14px', fontSize:15, fontWeight:700, cursor:'pointer', minHeight:50 }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

// ── POLÍTICAS ─────────────────────────────────────────────────────────────────

function PrivacyContent({ onCookies }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <p style={{ margin:0, fontSize:12, color:'#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>
      <p>En <strong>{SITE_NAME}</strong> nos comprometemos a proteger tu privacidad. Esta Política describe qué información recopilamos, cómo la usamos y tus derechos, en cumplimiento de las Políticas de Google, el RGPD y la legislación venezolana vigente.</p>
      <PolicySection title="1. Responsable del tratamiento">
        <p><strong>{SITE_NAME}</strong>, con domicilio en {ADDRESS}. Consultas: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.navy }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>
      <PolicySection title="2. Datos que recopilamos">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li><strong>Datos de navegación:</strong> IP, navegador, SO, páginas visitadas, duración de sesión y dispositivo.</li>
          <li><strong>Cookies:</strong> datos de sesión, preferencias y métricas de uso.</li>
          <li><strong>Datos de conversión publicitaria:</strong> interacción con anuncios de Google Ads.</li>
          <li><strong>Datos de contacto voluntarios:</strong> nombre, correo y mensaje si nos escribes.</li>
        </ul>
        <p style={{ marginTop:12 }}>No recopilamos datos financieros, médicos ni de menores sin consentimiento del tutor.</p>
      </PolicySection>
      <PolicySection title="3. Finalidad del tratamiento">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li>Brindar y mejorar el contenido educativo del blog.</li>
          <li>Analizar el comportamiento de navegación para optimizar la experiencia.</li>
          <li>Medir el rendimiento de campañas en Google Ads.</li>
          <li>Responder consultas enviadas por correo.</li>
          <li>Mostrar publicidad relevante a través de Google AdSense.</li>
          <li>Cumplir con obligaciones legales aplicables.</li>
        </ul>
      </PolicySection>
      <PolicySection title="4. Base legal del tratamiento">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li><strong>Consentimiento:</strong> para cookies no esenciales y publicidad personalizada.</li>
          <li><strong>Interés legítimo:</strong> para análisis de tráfico y seguridad del sitio.</li>
          <li><strong>Cumplimiento legal:</strong> cuando la normativa vigente lo exija.</li>
        </ul>
      </PolicySection>
      <PolicySection title="5. Google Ads, Google Analytics y publicidad">
        <p>Este sitio utiliza <strong>Google Ads</strong> y <strong>Google Analytics</strong> para medir campañas y analizar el tráfico. Google puede usar cookies para personalizar anuncios.</p>
        <p style={{ marginTop:8 }}>Controla publicidad personalizada: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>google.com/settings/ads</a></p>
        <p style={{ marginTop:8 }}>Privacidad de Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>policies.google.com/privacy</a></p>
        <p style={{ marginTop:8 }}>Este sitio puede participar en <strong>Google AdSense</strong>. Los anuncios son gestionados por Google conforme a sus Políticas para Editores.</p>
      </PolicySection>
      <PolicySection title="6. Compartición de datos con terceros">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li><strong>Google LLC</strong> (Ads, Analytics, AdSense): conforme a sus Términos de Servicio.</li>
          <li><strong>Proveedores de alojamiento web</strong>: para el funcionamiento técnico.</li>
          <li><strong>Autoridades competentes</strong>: cuando sea requerido por ley.</li>
        </ul>
      </PolicySection>
      <PolicySection title="7. Transferencias internacionales">
        <p>Google LLC procesa datos fuera de Venezuela bajo marcos legales internacionales (Cláusulas Contractuales Tipo de la UE) para garantizar protección adecuada.</p>
      </PolicySection>
      <PolicySection title="8. Conservación de datos">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li>Navegación y analítica: hasta 26 meses.</li>
          <li>Conversiones Google Ads: máx. 14 meses.</li>
          <li>Datos de contacto: hasta 24 meses desde el último contacto.</li>
          <li>Obligación legal: el período que establezca la normativa.</li>
        </ul>
      </PolicySection>
      <PolicySection title="9. Tus derechos">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:6 }}>
          <li><strong>Acceder</strong> a tus datos personales.</li>
          <li><strong>Rectificar</strong> datos inexactos.</li>
          <li><strong>Suprimir</strong> tus datos («derecho al olvido»).</li>
          <li><strong>Limitar</strong> el tratamiento.</li>
          <li><strong>Oponerte</strong> al tratamiento por interés legítimo.</li>
          <li><strong>Portabilidad</strong> de datos en formato legible.</li>
          <li><strong>Retirar consentimiento</strong> en cualquier momento.</li>
        </ul>
        <p style={{ marginTop:12 }}>Ejerce tus derechos en: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.navy }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>
      <PolicySection title="10. Cookies">
        <p>Para más detalle, consulta nuestra{' '}
          <button onClick={onCookies} style={{ color:C.navy, background:'none', border:'none', cursor:'pointer', fontSize:14, padding:0, textDecoration:'underline' }}>Política de Cookies</button>.
        </p>
      </PolicySection>
      <PolicySection title="11. Seguridad">
        <p>Implementamos cifrado HTTPS/TLS, controles de acceso y monitoreo continuo para proteger tus datos.</p>
      </PolicySection>
      <PolicySection title="12. Menores de edad">
        <p>Este sitio no está dirigido a menores de 13 años. Si detectas que un menor proporcionó datos sin consentimiento, contáctanos para eliminarlos.</p>
      </PolicySection>
      <PolicySection title="13. Cambios a esta política">
        <p>Actualizamos esta Política periódicamente. Los cambios se publican aquí con nueva fecha. El uso continuado implica aceptación.</p>
      </PolicySection>
    </div>
  );
}

function TermsContent() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <p style={{ margin:0, fontSize:12, color:'#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>
      <p>Al usar el sitio de <strong>{SITE_NAME}</strong>, aceptas estos Términos en su totalidad.</p>
      <PolicySection title="1. Objeto y titularidad">
        <p>Operado por <strong>{SITE_NAME}</strong>, blog educativo sobre empresas, negocios y emprendimiento, con domicilio en {ADDRESS}. Finalidad: contenido informativo y educativo gratuito para la comunidad empresarial venezolana.</p>
      </PolicySection>
      <PolicySection title="2. Naturaleza del contenido">
        <p>Todo el contenido tiene carácter <strong>exclusivamente informativo y educativo</strong>. No constituye asesoramiento legal, financiero o empresarial vinculante. Los datos sobre trámites, costos y normativas pueden variar según la legislación vigente.</p>
      </PolicySection>
      <PolicySection title="3. Uso aceptable">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li>No reproducir contenidos sin autorización escrita previa.</li>
          <li>No intentar acceder a sistemas o áreas no autorizadas.</li>
          <li>No realizar scraping masivo o crawling no autorizado.</li>
          <li>No usar el sitio para actividades ilegales o fraudulentas.</li>
          <li>No interferir con el funcionamiento del sitio.</li>
          <li>No enviar spam a través de los canales de contacto.</li>
        </ul>
      </PolicySection>
      <PolicySection title="4. Propiedad intelectual">
        <p>Todos los contenidos son propiedad de {SITE_NAME} o sus titulares, protegidos por ley. Se permite citar fragmentos con atribución y enlace. Queda prohibida la reproducción total sin autorización.</p>
      </PolicySection>
      <PolicySection title="5. Limitación de responsabilidad">
        <p>{SITE_NAME} no se responsabiliza de decisiones empresariales tomadas únicamente con base en el contenido del blog, daños derivados del uso del sitio ni contenidos de sitios de terceros enlazados.</p>
      </PolicySection>
      <PolicySection title="6. Publicidad de Google">
        <p>Este sitio puede mostrar publicidad vía <strong>Google Ads / Google AdSense</strong>. Los anunciantes son responsables de sus contenidos. La aparición de anuncios no implica respaldo por parte de {SITE_NAME}.</p>
        <p style={{ marginTop:8 }}>Gestiona preferencias en: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>google.com/settings/ads</a></p>
      </PolicySection>
      <PolicySection title="7. Enlaces externos">
        <p>Los enlaces a sitios externos son informativos. {SITE_NAME} no controla su contenido ni asume responsabilidad por ellos.</p>
      </PolicySection>
      <PolicySection title="8. Privacidad y cookies">
        <p>El tratamiento de datos y uso de cookies se rige por nuestra Política de Privacidad y Política de Cookies, accesibles desde cualquier página del sitio.</p>
      </PolicySection>
      <PolicySection title="9. Modificaciones">
        <p>{SITE_NAME} puede modificar estos Términos en cualquier momento. Los cambios entran en vigor al publicarse. El uso continuado implica aceptación.</p>
      </PolicySection>
      <PolicySection title="10. Legislación y jurisdicción">
        <p>Estos Términos se rigen por la legislación de la República Bolivariana de Venezuela. Las controversias se someten a los tribunales de {ADDRESS}.</p>
      </PolicySection>
      <PolicySection title="11. Contacto">
        <p><a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.navy }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>
    </div>
  );
}

function CookiesContent({ onAccept, onPrivacy }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <p style={{ margin:0, fontSize:12, color:'#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>
      <p>Esta política explica cómo <strong>{SITE_NAME}</strong> usa cookies en cumplimiento con Google Ads, Google AdSense y la normativa de privacidad aplicable.</p>
      <PolicySection title="¿Qué son las cookies?">
        <p>Pequeños archivos de texto almacenados en tu dispositivo al visitar un sitio web. Permiten recordar preferencias, analizar el uso y mostrar publicidad relevante.</p>
      </PolicySection>
      <PolicySection title="Tipos de cookies que utilizamos">
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <CookieCategory color="#F0F9FF" labelColor="#0369A1" label="Esenciales / Necesarias" text="Imprescindibles para el funcionamiento básico.">
            <CookieItem name="provinet_sg_cookie" desc="Almacena tu preferencia de consentimiento de cookies." duration="12 meses" />
          </CookieCategory>
          <CookieCategory color="#EFF6FF" labelColor="#1E40AF" label="Analíticas (Google Analytics)" text="Nos ayudan a entender cómo interactúas con el blog.">
            <CookieItem name="_ga"   desc="Identifica usuarios únicos de forma anónima." duration="2 años" />
            <CookieItem name="_gid"  desc="Distingue sesiones en Google Analytics." duration="24 horas" />
            <CookieItem name="_ga_*" desc="Cookie de sesión de Google Analytics 4." duration="2 años" />
            <CookieItem name="_gat"  desc="Controla la velocidad de solicitudes." duration="1 minuto" />
          </CookieCategory>
          <CookieCategory color="#FFF7ED" labelColor="#C2410C" label="Publicitarias (Google Ads / AdSense)" text="Miden conversiones y muestran anuncios relevantes.">
            <CookieItem name="_gcl_au"     desc="Seguimiento de conversiones de Google Ads." duration="3 meses" />
            <CookieItem name="IDE"         desc="Personalización de anuncios (DoubleClick)." duration="13 meses" />
            <CookieItem name="DSID"        desc="Identificación para publicidad de Google." duration="2 semanas" />
            <CookieItem name="test_cookie" desc="Verifica que el navegador acepta cookies." duration="Sesión" />
            <CookieItem name="NID"         desc="Preferencias de usuario para anuncios de Google." duration="6 meses" />
          </CookieCategory>
          <CookieCategory color="#F5F3FF" labelColor="#5B21B6" label="Funcionales (Preferencias)" text="Recuerdan tus preferencias para mejorar la experiencia.">
            <CookieItem name="lang" desc="Almacena el idioma preferido." duration="Sesión" />
          </CookieCategory>
        </div>
      </PolicySection>
      <PolicySection title="Cookies de terceros">
        <p><strong>Google LLC</strong> puede instalar cookies propias. Política: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>policies.google.com/privacy</a></p>
        <p style={{ marginTop:8 }}>Excluirte de publicidad personalizada: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>google.com/settings/ads</a></p>
        <p style={{ marginTop:8 }}>Exclusión de Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>tools.google.com/dlpage/gaoptout</a></p>
        <p style={{ marginTop:8 }}>Preferencias publicitarias (DAA): <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>aboutads.info/choices</a></p>
      </PolicySection>
      <PolicySection title="Cómo gestionar las cookies desde tu navegador">
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:6 }}>
          <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
          <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio</li>
          <li><strong>Microsoft Edge:</strong> Configuración → Privacidad → Cookies</li>
          <li><strong>Opera:</strong> Configuración → Avanzado → Privacidad → Cookies</li>
        </ul>
        <p style={{ marginTop:10 }}>Más info en nuestra{' '}
          <button onClick={onPrivacy} style={{ color:C.navy, background:'none', border:'none', cursor:'pointer', fontSize:14, padding:0, textDecoration:'underline' }}>Política de Privacidad</button>.
        </p>
      </PolicySection>
      <PolicySection title="Tu consentimiento">
        <p>Al hacer clic en «Aceptar» consientes todas las cookies descritas. Puedes retirar tu consentimiento borrando las cookies desde tu navegador. La preferencia se almacena 12 meses.</p>
      </PolicySection>
      <button onClick={onAccept} style={{ background:C.navy, color:C.white, border:'none', borderRadius:8, padding:'14px', fontSize:15, fontWeight:700, cursor:'pointer', minHeight:50, marginTop:4 }}>
        Aceptar todas las cookies
      </button>
    </div>
  );
}

function GoogleAdsContent({ onPrivacy, onCookies }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <p style={{ margin:0, fontSize:12, color:'#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>
      <p>Esta política describe cómo <strong>{SITE_NAME}</strong> utiliza <strong>Google Ads</strong> y <strong>Google AdSense</strong>, en cumplimiento con las Políticas del Programa de Google para Editores y Anunciantes.</p>

      <PolicySection title="1. Uso de Google Ads y AdSense">
        <p>Este sitio web participa en el programa <strong>Google AdSense</strong> y puede publicar anuncios de <strong>Google Ads</strong>. Google actúa como proveedor externo de publicidad y utiliza cookies para mostrar anuncios personalizados basados en visitas anteriores a este u otros sitios web.</p>
        <p style={{ marginTop:8 }}>Los anuncios que aparecen en este blog son proporcionados por Google LLC y están sujetos a sus propias políticas y términos de servicio.</p>
      </PolicySection>

      <PolicySection title="2. Cumplimiento de las Políticas de Google para Editores">
        <p>Como editor asociado a Google AdSense, este sitio cumple con:</p>
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li><strong>Política de contenido:</strong> El contenido publicado cumple con las directrices de contenido de Google (sin contenido engañoso, violento, ilegal ni para adultos).</li>
          <li><strong>Política de clics no válidos:</strong> No se incentiva a los usuarios a hacer clic en anuncios ni se genera tráfico artificial.</li>
          <li><strong>Política de ubicación de anuncios:</strong> Los anuncios no se ubican de forma que induzca a clics accidentales.</li>
          <li><strong>Política de transparencia:</strong> Los anuncios se identifican claramente como publicidad.</li>
          <li><strong>Política de datos del usuario:</strong> Se obtiene el consentimiento del usuario para el uso de cookies publicitarias según lo exige Google.</li>
        </ul>
      </PolicySection>

      <PolicySection title="3. Seguimiento de conversiones de Google Ads">
        <p>Este sitio puede utilizar el seguimiento de conversiones de Google Ads. Cuando un usuario hace clic en un anuncio de Google y llega a este sitio, se puede instalar una cookie temporal en su dispositivo para medir la efectividad de la campaña.</p>
        <p style={{ marginTop:8 }}>Esta cookie no contiene información personal identificable y expira en un plazo determinado (generalmente 30 días).</p>
      </PolicySection>

      <PolicySection title="4. Remarketing y Audiencias Personalizadas">
        <p>Podemos utilizar las funciones de <strong>Remarketing de Google Ads</strong> para mostrar anuncios relevantes a usuarios que han visitado previamente nuestro sitio. Google usa cookies para hacer coincidir los anuncios con los usuarios en otros sitios de la Red de Display de Google.</p>
        <p style={{ marginTop:8 }}>Para excluirte del remarketing personalizado, visita: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>google.com/settings/ads</a></p>
      </PolicySection>

      <PolicySection title="5. Señales de consentimiento (Consent Mode)">
        <p>Este sitio implementa el <strong>Modo de Consentimiento de Google (Google Consent Mode)</strong>. Cuando el usuario rechaza cookies no esenciales, Google adapta el comportamiento de sus herramientas de medición para respetar esa preferencia, sin dejar de proporcionar métricas agregadas.</p>
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li><strong>ad_storage:</strong> Controla el almacenamiento relacionado con publicidad (anuncios y seguimiento).</li>
          <li><strong>analytics_storage:</strong> Controla el almacenamiento relacionado con análisis (duración de sesión, etc.).</li>
          <li><strong>ad_personalization:</strong> Controla si los datos se pueden usar para personalización de anuncios.</li>
          <li><strong>ad_user_data:</strong> Controla el envío de datos de usuario a Google con fines publicitarios.</li>
        </ul>
      </PolicySection>

      <PolicySection title="6. Política de Divulgación de Datos Requerida por Google">
        <p>De conformidad con los requisitos de Google para editores de AdSense, informamos explícitamente que:</p>
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li>Proveedores externos, incluido Google, utilizan cookies para publicar anuncios.</li>
          <li>Google usa la cookie DART para publicar anuncios basados en visitas previas a este sitio y a otros en Internet.</li>
          <li>Los usuarios pueden inhabilitar la cookie DART visitando la Política de privacidad de la red de contenido y anuncios de Google.</li>
          <li>Utilizamos publicidad de comportamiento de interés de terceros en nuestro sitio.</li>
        </ul>
      </PolicySection>

      <PolicySection title="7. Restricciones de contenido y uso del sitio">
        <p>En cumplimiento con las políticas de Google Ads y AdSense, este sitio:</p>
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li>No publica contenido que promueva actividades ilegales.</li>
          <li>No contiene contenido que infrinja derechos de propiedad intelectual.</li>
          <li>No muestra contenido engañoso o falso sobre empresas o negocios.</li>
          <li>No está dirigido a menores de 13 años con fines publicitarios.</li>
          <li>Proporciona una experiencia de usuario clara y sin prácticas abusivas.</li>
        </ul>
      </PolicySection>

      <PolicySection title="8. Responsabilidad del anunciante">
        <p>Los anuncios mostrados son responsabilidad de Google LLC y de los anunciantes que los contratan. {SITE_NAME} no avala ni garantiza los productos, servicios o afirmaciones contenidas en dichos anuncios.</p>
      </PolicySection>

      <PolicySection title="9. Gestión de preferencias publicitarias">
        <p>Puedes gestionar o deshabilitar los anuncios personalizados mediante las siguientes opciones:</p>
        <ul style={{ paddingLeft:20, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:8 }}>
          <li>Mi Centro de Anuncios de Google: <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>myadcenter.google.com</a></li>
          <li>Configuración de anuncios de Google: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>google.com/settings/ads</a></li>
          <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>networkadvertising.org/choices</a></li>
          <li>Digital Advertising Alliance: <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>aboutads.info/choices</a></li>
          <li>Your Online Choices (UE): <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" style={{ color:C.navy }}>youronlinechoices.com</a></li>
        </ul>
      </PolicySection>

      <PolicySection title="10. Contacto para asuntos de publicidad">
        <p>Para preguntas sobre la publicidad mostrada en este sitio o para ejercer tus derechos relacionados con datos publicitarios, contacta: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.navy }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>

      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:4 }}>
        <button onClick={onPrivacy} style={{ background:C.navy, color:C.white, border:'none', borderRadius:8, padding:'12px 20px', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Ver Política de Privacidad
        </button>
        <button onClick={onCookies} style={{ background:'transparent', color:C.navy, border:`2px solid ${C.navy}`, borderRadius:8, padding:'12px 20px', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Ver Política de Cookies
        </button>
      </div>
    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <div>
      <h3 style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:8, marginTop:0 }}>{title}</h3>
      <div style={{ color:'#475569' }}>{children}</div>
    </div>
  );
}

function CookieCategory({ color, labelColor, label, text, children }) {
  return (
    <div style={{ background:color, borderRadius:8, padding:'12px 14px', border:'1px solid rgba(0,0,0,0.05)' }}>
      <p style={{ color:labelColor, fontWeight:800, fontSize:11, textTransform:'uppercase', letterSpacing:0.5, margin:'0 0 4px' }}>{label}</p>
      <p style={{ margin:'0 0 8px', fontSize:13, color:'#475569' }}>{text}</p>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{children}</div>
    </div>
  );
}

function CookieItem({ name, desc, duration }) {
  return (
    <div style={{ fontSize:12, color:'#475569', display:'flex', gap:8, flexWrap:'wrap', alignItems:'flex-start' }}>
      <code style={{ background:'rgba(0,0,0,0.07)', padding:'2px 7px', borderRadius:4, fontFamily:'monospace', flexShrink:0 }}>{name}</code>
      <span style={{ flex:1 }}>{desc}</span>
      <span style={{ color:'#94A3B8', flexShrink:0, fontStyle:'italic' }}>{duration}</span>
    </div>
  );
}
