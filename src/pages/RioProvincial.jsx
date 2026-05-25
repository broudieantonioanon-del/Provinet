// @ts-nocheck
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const SITE_URL      = 'https://www.provonetjardineria.com.ve';
const SITE_NAME     = 'Provinet Empresas Jardinería';
const CONTACT_EMAIL = 'contacto@provonetjardineria.com.ve';
const CONTACT_PHONE = '+58 212-000-0000';
const ADDRESS       = 'Caracas, Venezuela';
const LAST_UPDATED  = '23 de mayo de 2025';

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Provinet Empresas Jardinería — Blog Educativo",
  "description": "Blog educativo sobre jardinería, plantas tropicales, horticultura y diseño de jardines en Venezuela",
  "url": SITE_URL,
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "email": CONTACT_EMAIL,
    "address": { "@type": "PostalAddress", "addressLocality": "Caracas", "addressCountry": "VE" }
  }
});

const C = {
  cream:  '#FDFAF5',
  sand:   '#EDE8DE',
  dark:   '#162318',
  forest: '#2A5C3A',
  sage:   '#6BAF82',
  terra:  '#D96941',
  text:   '#2C3328',
  muted:  '#6B7280',
  border: '#C8DDD0',
  white:  '#FFFFFF',
};

const ARTICLES = [
  { id:1, icon:'🌴', category:'Plantas Tropicales', catBg:'#D1FAE5', catColor:'#065F46',
    title:'Guía de plantas tropicales para jardines venezolanos',
    excerpt:'Heliconias, bromelias, palmeras y ficus — aprende qué especies prosperan en cada región del país y cómo cuidarlas desde el primer día.',
    readTime:'6 min', date:'18 may 2025' },
  { id:2, icon:'🌱', category:'Suelos y Nutrición', catBg:'#FEF9C3', catColor:'#854D0E',
    title:'Preparar el suelo perfecto: compost, pH y nutrientes',
    excerpt:'La base de un jardín sano está en la tierra. Descubre cómo enriquecerla con compost casero y ajustar el pH para que tus plantas absorban todo.',
    readTime:'7 min', date:'14 may 2025' },
  { id:3, icon:'💧', category:'Riego', catBg:'#DBEAFE', catColor:'#1D4ED8',
    title:'Riego eficiente: técnicas para no matar tus plantas',
    excerpt:'El exceso de agua es la primera causa de muerte en plantas de interior. Aprende sistemas de riego por goteo y cómo leer las señales de cada especie.',
    readTime:'5 min', date:'10 may 2025' },
  { id:4, icon:'🪴', category:'Plantas de Interior', catBg:'#F0FDF4', catColor:'#166534',
    title:'Las mejores plantas para espacios con poca luz',
    excerpt:'Pothos, sansevieria, zamioculca y filodendro: las variedades más resistentes para apartamentos venezolanos sin luz solar directa.',
    readTime:'5 min', date:'5 may 2025' },
  { id:5, icon:'🌿', category:'Control de Plagas', catBg:'#FFF1F2', catColor:'#BE123C',
    title:'Control ecológico de plagas con ajo, neem y jabón potásico',
    excerpt:'Elimina ácaros, pulgones y mosca blanca sin químicos. Preparamos contigo soluciones naturales paso a paso para proteger tu jardín.',
    readTime:'8 min', date:'29 abr 2025' },
  { id:6, icon:'🏡', category:'Jardinería Urbana', catBg:'#F5F3FF', catColor:'#6D28D9',
    title:'Jardines verticales y en contenedores para apartamentos',
    excerpt:'Crea un jardín en tu balcón o terraza con paletas de madera, macetas colgantes y hierbas aromáticas. Verde urbano accesible para todos.',
    readTime:'6 min', date:'22 abr 2025' },
];

const CATEGORIES = [
  { name:'Plantas Tropicales', count:14, icon:'🌴', bg:'#D1FAE5', color:'#065F46' },
  { name:'Horticultura',       count:9,  icon:'🥬', bg:'#FEF9C3', color:'#854D0E' },
  { name:'Diseño de Jardines', count:7,  icon:'🌿', bg:'#DCFCE7', color:'#166534' },
  { name:'Cuidado y Riego',    count:11, icon:'💧', bg:'#DBEAFE', color:'#1D4ED8' },
  { name:'Control de Plagas',  count:6,  icon:'🌱', bg:'#FFF1F2', color:'#BE123C' },
  { name:'Jardinería Urbana',  count:10, icon:'🏡', bg:'#F5F3FF', color:'#6D28D9' },
];

const EMOJIS = ['🌴','🌿','🌱','🪴','💧','🌺','🍃','🌻','🌾','🌸','🥬','🌵','🌳','🍀','🌹','🌷'];

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function RioProvincial() {
  const isMobile = useIsMobile();
  const [cookie, setCookie] = useState(false);
  const [modal,  setModal]  = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Provinet Empresas Jardinería | Blog Educativo sobre Jardinería en Venezuela';
    const m = (a, n, c) => {
      let el = document.querySelector(`meta[${a}="${n}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(a, n); document.head.appendChild(el); }
      el.setAttribute('content', c);
    };
    m('name','description','Blog educativo sobre jardinería, plantas tropicales, horticultura y diseño de jardines en Venezuela. Información gratuita.');
    m('name','keywords','jardinería Venezuela,plantas tropicales,horticultura,riego,control plagas,jardín urbano,Caracas');
    m('property','og:title','Provinet Empresas Jardinería | Blog Educativo');
    m('property','og:type','website');
    m('property','og:url', SITE_URL);
    const s = document.createElement('script');
    s.id='schema-jardineria'; s.type='application/ld+json'; s.textContent=SCHEMA;
    if (!document.querySelector('#schema-jardineria')) document.head.appendChild(s);
    if (localStorage.getItem('provonet_cookie')==='1') setCookie(true);
    return () => { document.querySelector('#schema-jardineria')?.remove(); };
  }, []);

  const acceptCookie = () => { localStorage.setItem('provonet_cookie','1'); setCookie(true); };

  return (
    <div style={{ fontFamily:'"Segoe UI",system-ui,sans-serif', background:C.cream, color:C.text, overflowX:'hidden' }}>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav style={{ background:C.white, borderBottom:`3px solid ${C.forest}`, position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth:1140, margin:'0 auto', padding: isMobile ? '0 16px' : '0 24px', height: isMobile ? 60 : 68, display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize: isMobile ? 22 : 26 }}>🌿</span>
            <span style={{ fontWeight:800, fontSize: isMobile ? 15 : 17, color:C.dark, whiteSpace:'nowrap' }}>
              Provinet <span style={{ color:C.forest }}>Jardinería</span>
            </span>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              {['#articulos','#categorias','#nosotros'].map((href,i) => (
                <a key={href} href={href} style={{ color:C.text, fontSize:14, fontWeight:500, padding:'10px 14px', textDecoration:'none', borderRadius:6 }}>
                  {['Artículos','Temas','Nosotros'][i]}
                </a>
              ))}
              <a href="#contacto" style={{ background:C.forest, color:C.white, fontSize:14, fontWeight:600, padding:'9px 20px', borderRadius:6, textDecoration:'none', marginLeft:8 }}>
                Contacto
              </a>
            </div>
          )}

          {/* Mobile: botón contacto + hamburger */}
          {isMobile && (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <a href="#contacto" style={{ background:C.forest, color:C.white, fontSize:13, fontWeight:600, padding:'7px 14px', borderRadius:6, textDecoration:'none' }}>
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
            {[['#articulos','Artículos'],['#categorias','Temas'],['#nosotros','Nosotros']].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{ color:C.text, fontSize:15, fontWeight:500, padding:'10px 12px', textDecoration:'none', borderRadius:8, display:'block', background:C.cream }}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : 480 }}>
        {/* Panel izquierdo oscuro */}
        <div style={{ background:C.dark, padding: isMobile ? '40px 24px 36px' : '72px 56px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <span style={{ display:'inline-block', background:C.terra, color:C.white, fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', padding:'5px 14px', borderRadius:20, marginBottom:20, alignSelf:'flex-start', whiteSpace:'nowrap' }}>
            Blog Educativo · Venezuela
          </span>
          <h1 style={{ color:C.white, fontSize: isMobile ? 'clamp(28px,8vw,38px)' : 'clamp(28px,3.5vw,46px)', fontWeight:900, lineHeight:1.15, margin:'0 0 16px', letterSpacing:'-1px' }}>
            Todo sobre<br /><span style={{ color:C.sage }}>Jardinería</span><br />en Venezuela
          </h1>
          <p style={{ color:'#A7B9A9', fontSize: isMobile ? 15 : 16, lineHeight:1.7, margin:'0 0 28px', maxWidth:380 }}>
            Guías prácticas y artículos educativos sobre plantas tropicales, horticultura, diseño de jardines y cuidado del verde — completamente gratis.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="#articulos" style={{ background:C.terra, color:C.white, fontWeight:700, fontSize:15, padding:'12px 26px', borderRadius:6, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
              📖 Leer artículos
            </a>
            <a href="#categorias" style={{ background:'transparent', color:'#A7B9A9', fontWeight:600, fontSize:15, padding:'12px 24px', borderRadius:6, textDecoration:'none', border:'1.5px solid rgba(255,255,255,0.2)', display:'inline-flex', alignItems:'center' }}>
              Explorar temas
            </a>
          </div>
        </div>

        {/* Panel derecho botánico — oculto en mobile */}
        {!isMobile && (
          <div style={{ background:'linear-gradient(135deg,#e8f5ec 0%,#c8e6d4 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:40, position:'relative', overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, opacity:0.92 }}>
              {EMOJIS.map((e,i) => (
                <div key={i} style={{ width:56, height:56, background:'rgba(255,255,255,0.7)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', transform:i%3===0?'rotate(-4deg)':i%3===1?'rotate(3deg)':'rotate(0deg)' }}>
                  {e}
                </div>
              ))}
            </div>
            <div style={{ position:'absolute', bottom:14, right:18, fontSize:12, color:'#6BAF82', fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>
              Jardinería Tropical
            </div>
          </div>
        )}

        {/* Strip de emojis en mobile */}
        {isMobile && (
          <div style={{ background:'linear-gradient(135deg,#e8f5ec 0%,#c8e6d4 100%)', padding:'18px 16px', display:'flex', gap:10, overflowX:'auto', scrollbarWidth:'none' }}>
            {EMOJIS.map((e,i) => (
              <div key={i} style={{ width:44, height:44, background:'rgba(255,255,255,0.8)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0, boxShadow:'0 1px 4px rgba(0,0,0,0.08)' }}>
                {e}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── ARTÍCULOS DESTACADOS ────────────────────────────────── */}
      <section id="articulos" style={{ padding: isMobile ? '48px 16px' : '72px 24px', background:C.cream }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32, flexWrap:'wrap' }}>
            <h2 style={{ fontSize: isMobile ? 22 : 'clamp(22px,3vw,32px)', fontWeight:800, color:C.dark, margin:0, letterSpacing:'-0.5px' }}>
              Artículos Recientes
            </h2>
            {!isMobile && <div style={{ flex:1, height:2, background:C.border }} />}
            <span style={{ fontSize:12, color:C.forest, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>
              Actualización semanal
            </span>
          </div>

          {/* Magazine grid: 1 featured + 2 small */}
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap:20 }}>
            <FeaturedCard article={ARTICLES[0]} isMobile={isMobile} />
            <div style={{ display:'flex', flexDirection: isMobile ? 'row' : 'column', gap:isMobile ? 14 : 20, flexWrap: isMobile ? 'nowrap' : 'unset', overflowX: isMobile ? 'auto' : 'visible' }}>
              <SmallCard article={ARTICLES[1]} isMobile={isMobile} />
              <SmallCard article={ARTICLES[2]} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ─────────────────────────────────────────── */}
      <section id="categorias" style={{ background:C.dark, padding: isMobile ? '40px 16px' : '56px 24px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ marginBottom:28 }}>
            <p style={{ color:C.sage, fontWeight:700, fontSize:12, letterSpacing:2, textTransform:'uppercase', margin:'0 0 6px' }}>Explora por tema</p>
            <h2 style={{ color:C.white, fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:800, margin:0, letterSpacing:'-0.5px' }}>Categorías del Blog</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap:12 }}>
            {CATEGORIES.map(cat => <CategoryCard key={cat.name} cat={cat} isMobile={isMobile} />)}
          </div>
        </div>
      </section>

      {/* ── MÁS ARTÍCULOS — tarjetas horizontales ───────────────── */}
      <section style={{ padding: isMobile ? '40px 16px' : '72px 24px', background:C.cream }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <h2 style={{ fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:800, color:C.dark, margin:'0 0 28px', letterSpacing:'-0.5px' }}>
            Más Artículos
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {ARTICLES.slice(3,6).map((a,i) => (
              <HorizontalCard key={a.id} article={a} last={i===2} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section style={{ background:C.sand, padding: isMobile ? '40px 16px' : '56px 24px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 0 : 0 }}>
            {[
              { n:'57+',    label:'Artículos publicados',   icon:'📝' },
              { n:'6',      label:'Categorías temáticas',   icon:'🗂️' },
              { n:'20+',    label:'Años de experiencia',    icon:'🌳' },
              { n:'100%',   label:'Contenido gratuito',     icon:'🎓' },
            ].map((s,i,arr) => (
              <div key={s.n} style={{
                textAlign:'center', padding: isMobile ? '24px 12px' : '32px 24px',
                borderRight: !isMobile && i < arr.length-1 ? `1px solid ${C.border}` : 'none',
                borderBottom: isMobile && i < 2 ? `1px solid ${C.border}` : 'none',
              }}>
                <span style={{ fontSize: isMobile ? 26 : 32, display:'block', marginBottom:10 }}>{s.icon}</span>
                <p style={{ fontSize: isMobile ? 'clamp(24px,7vw,34px)' : 'clamp(28px,4vw,40px)', fontWeight:900, color:C.forest, margin:'0 0 4px', letterSpacing:'-1px' }}>{s.n}</p>
                <p style={{ fontSize: isMobile ? 12 : 14, color:C.muted, margin:0, lineHeight:1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ─────────────────────────────────────── */}
      <section id="nosotros" style={{ padding: isMobile ? '48px 16px' : '80px 24px', background:C.white }}>
        <div style={{ maxWidth:1140, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(340px,1fr))', gap: isMobile ? 28 : 64, alignItems:'center' }}>
          <div style={{ background:C.forest, borderRadius:16, padding: isMobile ? '32px 24px' : '48px 40px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-20, right:-20, fontSize:100, opacity:0.1, userSelect:'none' }}>🌿</div>
            <span style={{ background:C.terra, color:C.white, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'5px 12px', borderRadius:20, display:'inline-block', marginBottom:18 }}>
              Quiénes somos
            </span>
            <h2 style={{ color:C.white, fontSize: isMobile ? 20 : 'clamp(20px,2.5vw,30px)', fontWeight:900, lineHeight:1.2, margin:'0 0 18px', letterSpacing:'-0.5px' }}>
              El blog de jardinería para Venezuela
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {['Plantas Tropicales','Horticultura Práctica','Diseño de Jardines','Jardinería Urbana'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:8, height:8, background:C.sage, borderRadius:'50%', flexShrink:0, display:'inline-block' }} />
                  <span style={{ color:'#C8E6D4', fontSize:15, fontWeight:500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize:12, color:C.forest, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>Nuestra misión</p>
            <h3 style={{ fontSize: isMobile ? 18 : 'clamp(18px,2vw,24px)', fontWeight:800, color:C.dark, margin:'0 0 16px', lineHeight:1.3 }}>
              Información gratuita y accesible para todos los venezolanos
            </h3>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:'0 0 14px' }}>
              <strong style={{ color:C.dark }}>Provinet Empresas Jardinería</strong> es un blog educativo venezolano dedicado a compartir conocimiento práctico sobre el mundo de las plantas, la jardinería tropical y el paisajismo.
            </p>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:'0 0 14px' }}>
              Con más de <strong style={{ color:C.dark }}>20 años de experiencia</strong> en el sector, compartimos guías y consejos adaptados al clima y la flora venezolana.
            </p>
            <p style={{ color:C.muted, fontSize:15, lineHeight:1.8, margin:0 }}>
              Nuestro compromiso: <strong style={{ color:C.dark }}>información gratuita, precisa y accesible</strong> para toda la comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ───────────────────────────────────────────── */}
      <section id="contacto" style={{ padding: isMobile ? '48px 16px' : '72px 24px', background:C.cream }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p style={{ color:C.forest, fontWeight:700, fontSize:12, letterSpacing:2, textTransform:'uppercase', marginBottom:8 }}>¿Tienes dudas?</p>
            <h2 style={{ fontSize: isMobile ? 22 : 'clamp(22px,3vw,34px)', fontWeight:900, color:C.dark, margin:'0 0 10px', letterSpacing:'-0.5px' }}>Contáctanos</h2>
            <p style={{ color:C.muted, fontSize: isMobile ? 15 : 17 }}>Preguntas, sugerencias o propuestas de artículos</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:16 }}>
            <ContactCard icon="📧" title="Correo Electrónico" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} desc="Respondemos en 48 horas hábiles" />
            <ContactCard icon="📞" title="Teléfono" value={CONTACT_PHONE} href={`tel:${CONTACT_PHONE.replace(/\s|-/g,'')}`} desc="Lun–Sáb de 8:00 AM a 6:00 PM" />
            <ContactCard icon="📍" title="Ubicación" value={ADDRESS} desc="Operamos en todo el territorio nacional" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ background:C.dark, color:'#8FA890' }}>
        <div style={{ borderBottom:'1px solid rgba(255,255,255,0.08)', padding: isMobile ? '36px 16px 28px' : '48px 24px 40px' }}>
          <div style={{ maxWidth:1140, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 28 : 40 }}>
            <div style={{ gridColumn: isMobile ? 'span 2' : 'span 1' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                <span style={{ fontSize:20 }}>🌿</span>
                <span style={{ color:C.white, fontWeight:800, fontSize:15 }}>Provinet Jardinería</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.75, margin:'0 0 10px' }}>Blog educativo sobre jardinería y plantas tropicales en Venezuela.</p>
              <p style={{ fontSize:12 }}><span style={{ color:C.sage }}>📍</span> {ADDRESS}</p>
              <p style={{ fontSize:12, marginTop:4 }}>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:'#8FA890', textDecoration:'none' }}><span style={{ color:C.sage }}>📧</span> {CONTACT_EMAIL}</a>
              </p>
            </div>
            <div>
              <h4 style={{ color:C.white, fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Temas</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
                {['Plantas Tropicales','Horticultura','Diseño de Jardines','Cuidado y Riego','Jardinería Urbana'].map(t => (
                  <a key={t} href="#categorias" style={{ color:'#8FA890', textDecoration:'none' }}>{t}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color:C.white, fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Info</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
                <a href="#nosotros"  style={{ color:'#8FA890', textDecoration:'none' }}>Sobre Nosotros</a>
                <a href="#articulos" style={{ color:'#8FA890', textDecoration:'none' }}>Artículos</a>
                <a href="#contacto"  style={{ color:'#8FA890', textDecoration:'none' }}>Contacto</a>
              </div>
            </div>
            <div>
              <h4 style={{ color:C.white, fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Legal</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13 }}>
                {[['privacy','Privacidad'],['terms','Términos'],['cookies','Cookies']].map(([k,v]) => (
                  <button key={k} onClick={() => setModal(k)} style={{ color:'#8FA890', background:'none', border:'none', cursor:'pointer', fontSize:13, padding:0, textAlign:'left' }}>{v}</button>
                ))}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:'#8FA890', textDecoration:'none' }}>Contacto Legal</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1140, margin:'0 auto', padding: isMobile ? '16px' : '20px 24px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:10, fontSize:12 }}>
          <span>© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</span>
          <div style={{ display:'flex', gap:16 }}>
            {[['privacy','Privacidad'],['terms','Términos'],['cookies','Cookies']].map(([k,v]) => (
              <button key={k} onClick={() => setModal(k)} style={{ color:C.sage, background:'none', border:'none', cursor:'pointer', fontSize:12 }}>{v}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── COOKIE BANNER ──────────────────────────────────────── */}
      {!cookie && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:999, background:C.dark, borderTop:`3px solid ${C.forest}`, padding: isMobile ? '14px 16px' : '16px 24px', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:12 }}>
          <p style={{ color:'#C8DDD0', fontSize:13, flex:'1 1 260px', margin:0 }}>
            Usamos cookies para mejorar tu experiencia y mostrar publicidad relevante.{' '}
            <button onClick={() => setModal('cookies')} style={{ color:C.sage, background:'none', border:'none', cursor:'pointer', fontSize:13, padding:0, textDecoration:'underline' }}>Cookies</button>{' '}·{' '}
            <button onClick={() => setModal('privacy')} style={{ color:C.sage, background:'none', border:'none', cursor:'pointer', fontSize:13, padding:0, textDecoration:'underline' }}>Privacidad</button>
          </p>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={acceptCookie} style={{ background:C.forest, color:C.white, border:'none', borderRadius:6, padding:'10px 22px', fontWeight:700, fontSize:14, cursor:'pointer', minHeight:42 }}>Aceptar</button>
            <button onClick={() => setModal('cookies')} style={{ background:'transparent', color:'#C8DDD0', border:'1px solid rgba(255,255,255,0.2)', borderRadius:6, padding:'10px 14px', fontSize:13, cursor:'pointer', minHeight:42 }}>Configurar</button>
          </div>
        </div>
      )}

      {/* ── MODALES ────────────────────────────────────────────── */}
      {modal && (
        <PolicyModal title={modal==='privacy'?'Política de Privacidad':modal==='terms'?'Términos de Uso':'Política de Cookies'} onClose={() => setModal(null)}>
          {modal==='privacy'  && <PrivacyContent  onCookies={() => setModal('cookies')} />}
          {modal==='terms'    && <TermsContent />}
          {modal==='cookies'  && <CookiesContent  onAccept={() => { acceptCookie(); setModal(null); }} onPrivacy={() => setModal('privacy')} />}
        </PolicyModal>
      )}
    </div>
  );
}

// ── SUB-COMPONENTES ───────────────────────────────────────────────────────────

function FeaturedCard({ article: a, isMobile }) {
  return (
    <div style={{ background:C.white, borderRadius:14, overflow:'hidden', border:`1px solid ${C.border}`, display:'flex', flexDirection:'column', boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
      <div style={{ background:a.catBg, padding: isMobile ? '28px 20px 20px' : '40px 32px 28px', display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ fontSize: isMobile ? 48 : 64 }}>{a.icon}</span>
        <span style={{ background:a.catBg, color:a.catColor, fontSize:10, fontWeight:800, padding:'4px 10px', borderRadius:20, textTransform:'uppercase', letterSpacing:1, border:`1px solid ${a.catColor}33` }}>{a.category}</span>
      </div>
      <div style={{ padding: isMobile ? '20px' : '28px 32px 32px', flex:1, display:'flex', flexDirection:'column', gap:12 }}>
        <span style={{ color:C.muted, fontSize:12 }}>{a.date}</span>
        <h3 style={{ fontSize: isMobile ? 18 : 22, fontWeight:800, color:C.dark, lineHeight:1.3, margin:0 }}>{a.title}</h3>
        <p style={{ color:C.muted, fontSize: isMobile ? 14 : 15, lineHeight:1.75, margin:0, flex:1 }}>{a.excerpt}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, fontSize:13 }}>⏱ {a.readTime} de lectura</span>
          <span style={{ color:C.terra, fontSize:14, fontWeight:700 }}>Leer →</span>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ article: a, isMobile }) {
  return (
    <div style={{ background:C.white, borderRadius:12, overflow:'hidden', border:`1px solid ${C.border}`, display:'flex', flexShrink: isMobile ? 0 : 'unset', width: isMobile ? 240 : 'auto', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ background:a.catBg, width: isMobile ? 60 : 72, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? 26 : 32 }}>
        {a.icon}
      </div>
      <div style={{ padding: isMobile ? '14px 16px' : '18px 20px', flex:1, minWidth:0 }}>
        <span style={{ color:a.catColor, fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:1 }}>{a.category}</span>
        <h3 style={{ fontSize: isMobile ? 13 : 14, fontWeight:700, color:C.dark, lineHeight:1.4, margin:'5px 0 8px' }}>{a.title}</h3>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:C.muted, fontSize:12 }}>⏱ {a.readTime}</span>
          <span style={{ color:C.terra, fontSize:12, fontWeight:700, flexShrink:0 }}>Leer →</span>
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
      {!isMobile && <span style={{ color:C.terra, fontSize:14, fontWeight:700, flexShrink:0, alignSelf:'center' }}>Leer →</span>}
    </div>
  );
}

function CategoryCard({ cat, isMobile }) {
  return (
    <div style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding: isMobile ? '14px 12px' : '16px 20px', display:'flex', alignItems:'center', gap:10, cursor:'default' }}>
      <span style={{ fontSize: isMobile ? 22 : 26 }}>{cat.icon}</span>
      <div style={{ minWidth:0 }}>
        <p style={{ color:C.white, fontWeight:700, fontSize: isMobile ? 13 : 14, margin:'0 0 2px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cat.name}</p>
        <p style={{ color:C.sage, fontSize:12, margin:0 }}>{cat.count} artículos</p>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, value, href = '', desc }) {
  return (
    <div style={{ background:C.white, borderRadius:12, padding:'24px 20px', border:`1px solid ${C.border}`, borderTop:`4px solid ${C.forest}` }}>
      <span style={{ fontSize:28, display:'block', marginBottom:12 }}>{icon}</span>
      <h3 style={{ color:C.dark, fontWeight:800, fontSize:15, marginBottom:8 }}>{title}</h3>
      {href
        ? <a href={href} style={{ color:C.forest, fontWeight:600, fontSize:13, display:'block', marginBottom:6, textDecoration:'none', wordBreak:'break-all' }}>{value}</a>
        : <p style={{ color:C.forest, fontWeight:600, fontSize:13, marginBottom:6 }}>{value}</p>
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
          <button onClick={onClose} style={{ background:C.sand, border:'none', borderRadius:'50%', width:34, height:34, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>×</button>
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
        <p><strong>Provinet Empresas Jardinería</strong>, con domicilio en {ADDRESS}. Consultas: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.forest }}>{CONTACT_EMAIL}</a></p>
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
          <li>Mostrar publicidad relevante a través de Google.</li>
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
        <p style={{ marginTop:8 }}>Controla publicidad personalizada: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>google.com/settings/ads</a></p>
        <p style={{ marginTop:8 }}>Privacidad de Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>policies.google.com/privacy</a></p>
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
        <p style={{ marginTop:12 }}>Ejerce tus derechos en: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.forest }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>
      <PolicySection title="10. Cookies">
        <p>Para más detalle, consulta nuestra{' '}
          <button onClick={onCookies} style={{ color:C.forest, background:'none', border:'none', cursor:'pointer', fontSize:14, padding:0, textDecoration:'underline' }}>Política de Cookies</button>.
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
        <p>Operado por <strong>Provinet Empresas Jardinería</strong>, blog educativo sobre jardinería y plantas, con domicilio en {ADDRESS}. Finalidad: contenido informativo y educativo gratuito sobre jardinería en Venezuela.</p>
      </PolicySection>
      <PolicySection title="2. Naturaleza del contenido">
        <p>Todo el contenido tiene carácter <strong>exclusivamente informativo y educativo</strong>. No constituye asesoramiento agronómico o botánico vinculante. Los resultados de cultivo pueden variar según condiciones locales.</p>
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
        <p>{SITE_NAME} no se responsabiliza de decisiones tomadas únicamente con base en el contenido del blog, daños derivados del uso del sitio ni contenidos de sitios de terceros enlazados.</p>
      </PolicySection>
      <PolicySection title="6. Publicidad de Google">
        <p>Este sitio puede mostrar publicidad vía <strong>Google Ads / Google AdSense</strong>. Los anunciantes son responsables de sus contenidos. La aparición de anuncios no implica respaldo por parte de {SITE_NAME}.</p>
        <p style={{ marginTop:8 }}>Gestiona preferencias en: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>google.com/settings/ads</a></p>
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
        <p><a href={`mailto:${CONTACT_EMAIL}`} style={{ color:C.forest }}>{CONTACT_EMAIL}</a></p>
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
          <CookieCategory color="#F0FDF4" labelColor="#15803D" label="Esenciales / Necesarias" text="Imprescindibles para el funcionamiento básico.">
            <CookieItem name="provonet_cookie" desc="Almacena tu preferencia de consentimiento." duration="12 meses" />
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
        <p><strong>Google LLC</strong> puede instalar cookies propias. Política: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>policies.google.com/privacy</a></p>
        <p style={{ marginTop:8 }}>Excluirte de publicidad personalizada: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>google.com/settings/ads</a></p>
        <p style={{ marginTop:8 }}>Exclusión de Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>tools.google.com/dlpage/gaoptout</a></p>
        <p style={{ marginTop:8 }}>Preferencias publicitarias (DAA): <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color:C.forest }}>aboutads.info/choices</a></p>
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
          <button onClick={onPrivacy} style={{ color:C.forest, background:'none', border:'none', cursor:'pointer', fontSize:14, padding:0, textDecoration:'underline' }}>Política de Privacidad</button>.
        </p>
      </PolicySection>
      <PolicySection title="Tu consentimiento">
        <p>Al hacer clic en «Aceptar» consientes todas las cookies descritas. Puedes retirar tu consentimiento borrando las cookies desde tu navegador. La preferencia se almacena 12 meses.</p>
      </PolicySection>
      <button onClick={onAccept} style={{ background:C.forest, color:C.white, border:'none', borderRadius:8, padding:'14px', fontSize:15, fontWeight:700, cursor:'pointer', minHeight:50, marginTop:4 }}>
        Aceptar todas las cookies
      </button>
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
