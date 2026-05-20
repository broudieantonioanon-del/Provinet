import { useState, useEffect } from 'react';

const SITE_URL      = 'https://www.provonetpapeleria.com.ve';
const SITE_NAME     = 'Provinet Empresa Papeleria';
const CONTACT_EMAIL = 'contacto@provonetpapeleria.com.ve';
const CONTACT_PHONE = '+58 212-000-0000';
const ADDRESS       = 'Caracas, Venezuela';
const LAST_UPDATED  = '14 de mayo de 2025';

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Provinet Empresa Papeleria — Blog Educativo",
  "description": "Blog educativo sobre papelería, útiles escolares y material de oficina en Venezuela",
  "url": SITE_URL,
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "email": CONTACT_EMAIL,
    "address": { "@type": "PostalAddress", "addressLocality": "Caracas", "addressCountry": "VE" }
  }
});

const C = {
  dark:   '#0A2540',
  blue:   '#1A73E8',
  orange: '#FF6B00',
  white:  '#FFFFFF',
  gray:   '#F4F7FB',
  text:   '#334155',
};

const ARTICLES = [
  {
    id: 1,
    category: 'Escolar',
    categoryColor: '#EFF6FF',
    categoryText: '#1E40AF',
    title: 'Guía completa de útiles escolares para el regreso a clases en Venezuela',
    excerpt: 'Conoce qué materiales son indispensables para el año escolar venezolano: desde cuadernos y lápices hasta carpetas y mochilas. Aprende a organizarte desde el primer día.',
    readTime: '5 min de lectura',
    date: '10 de mayo de 2025',
    icon: '📚',
  },
  {
    id: 2,
    category: 'Oficina',
    categoryColor: '#FFF7ED',
    categoryText: '#C2410C',
    title: 'Cómo organizar tu escritorio de trabajo para maximizar tu productividad',
    excerpt: 'Un escritorio bien organizado mejora tu concentración y rendimiento. Descubre los artículos de papelería esenciales para mantener tu espacio de trabajo ordenado y eficiente.',
    readTime: '4 min de lectura',
    date: '7 de mayo de 2025',
    icon: '🗂️',
  },
  {
    id: 3,
    category: 'Impresión',
    categoryColor: '#F0FDF4',
    categoryText: '#15803D',
    title: 'Todo lo que debes saber sobre el papel: gramajes, tipos y usos',
    excerpt: 'No todos los papeles son iguales. Aprende las diferencias entre papel bond, cartulina, papel fotográfico y más. Elige el tipo correcto para cada proyecto de impresión o escritura.',
    readTime: '6 min de lectura',
    date: '3 de mayo de 2025',
    icon: '🖨️',
  },
  {
    id: 4,
    category: 'Educativo',
    categoryColor: '#FDF4FF',
    categoryText: '#7E22CE',
    title: 'Historia del bolígrafo: de la pluma de ave a la tinta gel moderna',
    excerpt: 'El bolígrafo ha recorrido un camino fascinante desde el siglo XIX. Conoce la evolución de este instrumento de escritura fundamental y los distintos tipos que existen hoy.',
    readTime: '7 min de lectura',
    date: '28 de abril de 2025',
    icon: '✒️',
  },
  {
    id: 5,
    category: 'Manualidades',
    categoryColor: '#FFF1F2',
    categoryText: '#BE123C',
    title: 'Técnicas de encuadernación artesanal: crea tus propios cuadernos',
    excerpt: 'Aprende paso a paso cómo encuadernar tus propios cuadernos y libretas en casa. Necesitarás materiales básicos de papelería y mucha creatividad para personalizar tus proyectos.',
    readTime: '8 min de lectura',
    date: '22 de abril de 2025',
    icon: '📖',
  },
  {
    id: 6,
    category: 'Consejos',
    categoryColor: '#ECFDF5',
    categoryText: '#065F46',
    title: 'Cómo elegir el marcador y resaltador ideal para estudiar más eficientemente',
    excerpt: 'El color y tipo de marcador que usas puede influir directamente en tu memoria. Descubre la psicología del color aplicada al estudio y cuáles herramientas de papelería te ayudan a retener más información.',
    readTime: '4 min de lectura',
    date: '15 de abril de 2025',
    icon: '🖊️',
  },
];

const CATEGORIES = [
  { name: 'Escolar', count: 12, icon: '📚' },
  { name: 'Material de Oficina', count: 8, icon: '🗂️' },
  { name: 'Impresión', count: 6, icon: '🖨️' },
  { name: 'Manualidades', count: 9, icon: '✂️' },
  { name: 'Consejos y Tips', count: 11, icon: '💡' },
  { name: 'Historia', count: 4, icon: '📜' },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function RioProvincial() {
  const [cookie, setCookie] = useState(false);
  const [modal, setModal]   = useState(null); // 'privacy' | 'terms' | 'cookies'
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.title = 'Provinet Empresa Papeleria | Blog Educativo sobre Papelería en Venezuela';
    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Blog educativo de Provinet Empresa Papeleria: artículos, guías y consejos sobre útiles escolares, material de oficina, impresión y manualidades en Venezuela.');
    setMeta('name', 'keywords', 'papelería Venezuela,útiles escolares,material de oficina,blog papelería,consejos estudio,organización oficina,cuadernos,bolígrafos Venezuela');
    setMeta('property', 'og:title', 'Provinet Empresa Papeleria | Blog Educativo sobre Papelería en Venezuela');
    setMeta('property', 'og:description', 'Artículos y guías educativas sobre papelería, útiles escolares, material de oficina e impresión en Venezuela.');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', SITE_URL);

    const s = document.createElement('script');
    s.id = 'schema-provonet'; s.type = 'application/ld+json'; s.textContent = SCHEMA;
    if (!document.querySelector('#schema-provonet')) document.head.appendChild(s);

    if (localStorage.getItem('provonet_cookie') === '1') setCookie(true);
    return () => { document.querySelector('#schema-provonet')?.remove(); };
  }, []);

  function acceptCookie() { localStorage.setItem('provonet_cookie', '1'); setCookie(true); }

  return (
    <div style={{ fontFamily: 'system-ui,sans-serif', color: C.text, background: C.white }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: C.dark, padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoSVG />
            <span style={{ color: C.white, fontWeight: 700, fontSize: 20 }}>Provinet Empresa Papeleria</span>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <a href="#articulos" style={{ color: '#93C5FD', fontSize: 14, textDecoration: 'none', padding: '8px 12px' }}>Artículos</a>
            <a href="#categorias" style={{ color: '#93C5FD', fontSize: 14, textDecoration: 'none', padding: '8px 12px' }}>Temas</a>
            <a href="#nosotros" style={{ color: '#93C5FD', fontSize: 14, textDecoration: 'none', padding: '8px 12px' }}>Nosotros</a>
            <a href="#contacto" style={{ color: C.white, fontSize: 14, fontWeight: 600, padding: '8px 16px', borderRadius: 6, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>Contacto</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #0f3460 60%, #1a4a8a 100%)`, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ color: '#60A5FA', fontWeight: 600, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
            Blog Educativo · Papelería en Venezuela
          </p>
          <h1 style={{ color: C.white, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Tu Guía de Papelería<br />con <span style={{ color: '#60A5FA' }}>Provinet</span>
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 40px' }}>
            Artículos educativos, guías prácticas y consejos sobre útiles escolares, material de oficina, técnicas de impresión y manualidades para Venezuela.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <a href="#articulos" style={{ display: 'inline-flex', alignItems: 'center', background: C.orange, color: C.white, fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', minHeight: 52 }}>
              Leer Artículos
            </a>
            <a href="#nosotros" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: C.white, fontWeight: 600, fontSize: 16, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)', minHeight: 52 }}>
              Sobre Nosotros
            </a>
          </div>
          <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 28 }}>
            Información gratuita · Artículos semanales · Consejos prácticos
          </p>
        </div>
      </section>

      {/* ── ARTÍCULOS DESTACADOS ── */}
      <section id="articulos" style={{ padding: '72px 24px', background: C.white }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            Nuestros artículos
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: C.dark, marginBottom: 8 }}>
            Aprende sobre Papelería
          </h2>
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: 17, marginBottom: 52 }}>
            Guías educativas y consejos prácticos sobre el mundo de la papelería
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 28 }}>
            {ARTICLES.slice(0, 3).map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ── */}
      <section id="categorias" style={{ padding: '64px 24px', background: C.gray }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            Explora por tema
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: C.dark, marginBottom: 8 }}>
            Temas del Blog
          </h2>
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: 16, marginBottom: 44 }}>
            Encuentra información sobre los temas que más te interesan
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.name} style={{ background: C.white, borderRadius: 12, padding: '24px 20px', textAlign: 'center', border: '1px solid #E2E8F0', cursor: 'default' }}>
                <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>{cat.icon}</span>
                <p style={{ fontWeight: 700, color: C.dark, fontSize: 15, margin: '0 0 4px' }}>{cat.name}</p>
                <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>{cat.count} artículos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁS ARTÍCULOS ── */}
      <section style={{ padding: '72px 24px', background: C.white }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: C.dark, marginBottom: 8 }}>
            Más Artículos Educativos
          </h2>
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: 17, marginBottom: 52 }}>
            Sigue aprendiendo sobre papelería con nuestras guías
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 28 }}>
            {ARTICLES.slice(3, 6).map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* ── DATOS EDUCATIVOS ── */}
      <section style={{ padding: '64px 24px', background: C.dark }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: C.white, marginBottom: 12 }}>
            ¿Por qué leer sobre papelería?
          </h2>
          <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 16, marginBottom: 52, maxWidth: 600, margin: '0 auto 52px' }}>
            El conocimiento sobre los materiales que usamos cada día mejora nuestra productividad y creatividad
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32 }}>
            <InfoCard number="50+" label="Artículos educativos publicados" />
            <InfoCard number="6" label="Categorías temáticas disponibles" />
            <InfoCard number="15+" label="Años de experiencia en el sector" />
            <InfoCard number="Semanal" label="Publicación de nuevos artículos" />
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ── */}
      <section id="nosotros" style={{ padding: '80px 24px', background: C.gray }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            Quiénes somos
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: C.dark, marginBottom: 28 }}>
            Sobre Provinet Empresa Papeleria
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div style={{ background: C.white, borderRadius: 16, padding: '40px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <LogoSVG size={40} />
                </div>
                <h3 style={{ color: C.dark, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Provinet Empresa Papeleria</h3>
                <p style={{ color: '#64748B', fontSize: 14, marginBottom: 0 }}>Blog educativo sobre papelería en Venezuela</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.75, margin: 0 }}>
                <strong style={{ color: C.dark }}>Provinet Empresa Papeleria</strong> es un blog educativo venezolano dedicado a compartir conocimiento práctico sobre el mundo de la papelería, los útiles escolares, el material de oficina y las artes manuales.
              </p>
              <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.75, margin: 0 }}>
                Con más de <strong>15 años de experiencia</strong> en el sector, nuestro equipo editorial comparte guías, comparativas y consejos basados en conocimiento real del mercado venezolano, ayudando a estudiantes, docentes, emprendedores y profesionales a tomar mejores decisiones sobre sus materiales de trabajo y estudio.
              </p>
              <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.75, margin: 0 }}>
                Nuestro compromiso es ofrecer <strong>información gratuita, precisa y accesible</strong> para toda la comunidad venezolana que busca orientación sobre papelería y material escolar u de oficina.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
                {['Información educativa', 'Contenido en español', 'Enfoque venezolano', 'Actualización constante'].map(tag => (
                  <span key={tag} style={{ background: '#EFF6FF', color: C.blue, fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 20 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: '80px 24px', background: C.white }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            Escríbenos
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: C.dark, marginBottom: 12 }}>
            Contáctanos
          </h2>
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: 17, marginBottom: 52 }}>
            ¿Tienes preguntas, sugerencias o quieres proponer un tema para un artículo?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
            <ContactCard
              icon="📧"
              title="Correo Electrónico"
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
              desc="Respondemos en un plazo de 48 horas hábiles"
            />
            <ContactCard
              icon="📞"
              title="Teléfono"
              value={CONTACT_PHONE}
              href={`tel:${CONTACT_PHONE.replace(/\s|-/g, '')}`}
              desc="Lunes a sábado, de 8:00 AM a 6:00 PM"
            />
            <ContactCard
              icon="📍"
              title="Ubicación"
              value={ADDRESS}
              desc="Operamos en todo el territorio nacional venezolano"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.dark, padding: '56px 24px 32px', color: '#94A3B8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 36, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <LogoSVG />
                <span style={{ color: C.white, fontWeight: 700, fontSize: 18 }}>Provinet Empresa Papeleria</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75 }}>
                Blog educativo sobre papelería, útiles escolares y material de oficina en Venezuela. Información gratuita y de calidad para toda la comunidad.
              </p>
              <p style={{ fontSize: 13, marginTop: 16 }}>
                <span style={{ color: '#60A5FA' }}>📍</span> {ADDRESS}
              </p>
              <p style={{ fontSize: 13, marginTop: 6 }}>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#94A3B8', textDecoration: 'none' }}>
                  <span style={{ color: '#60A5FA' }}>📧</span> {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div>
              <h3 style={{ color: C.white, fontWeight: 600, marginBottom: 18, fontSize: 15 }}>Temas del Blog</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                <a href="#categorias" style={{ color: '#94A3B8', textDecoration: 'none' }}>Útiles Escolares</a>
                <a href="#categorias" style={{ color: '#94A3B8', textDecoration: 'none' }}>Material de Oficina</a>
                <a href="#categorias" style={{ color: '#94A3B8', textDecoration: 'none' }}>Impresión y Copiado</a>
                <a href="#categorias" style={{ color: '#94A3B8', textDecoration: 'none' }}>Manualidades</a>
                <a href="#categorias" style={{ color: '#94A3B8', textDecoration: 'none' }}>Consejos y Tips</a>
              </div>
            </div>

            <div>
              <h3 style={{ color: C.white, fontWeight: 600, marginBottom: 18, fontSize: 15 }}>Información</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                <a href="#nosotros" style={{ color: '#94A3B8', textDecoration: 'none' }}>Sobre Nosotros</a>
                <a href="#contacto" style={{ color: '#94A3B8', textDecoration: 'none' }}>Contacto</a>
                <a href="#articulos" style={{ color: '#94A3B8', textDecoration: 'none' }}>Artículos</a>
              </div>
            </div>

            <div>
              <h3 style={{ color: C.white, fontWeight: 600, marginBottom: 18, fontSize: 15 }}>Legal</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                <button onClick={() => setModal('privacy')} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textAlign: 'left' }}>
                  Política de Privacidad
                </button>
                <button onClick={() => setModal('terms')} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textAlign: 'left' }}>
                  Términos de Uso
                </button>
                <button onClick={() => setModal('cookies')} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textAlign: 'left' }}>
                  Política de Cookies
                </button>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#94A3B8', textDecoration: 'none' }}>
                  Contacto Legal
                </a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 13 }}>
            <span>© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => setModal('privacy')} style={{ color: '#60A5FA', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Privacidad</button>
              <button onClick={() => setModal('terms')} style={{ color: '#60A5FA', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Términos</button>
              <button onClick={() => setModal('cookies')} style={{ color: '#60A5FA', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Cookies</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── COOKIE BANNER ── */}
      {!cookie && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: '#1E293B', borderTop: '2px solid rgba(96,165,250,0.3)', padding: '16px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <p style={{ color: '#CBD5E1', fontSize: 14, flex: '1 1 300px', margin: 0 }}>
            Usamos cookies para mejorar tu experiencia y mostrar publicidad relevante.{' '}
            <button onClick={() => setModal('cookies')} style={{ color: '#93C5FD', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textDecoration: 'underline' }}>
              Política de Cookies
            </button>{' '}·{' '}
            <button onClick={() => setModal('privacy')} style={{ color: '#93C5FD', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textDecoration: 'underline' }}>
              Privacidad
            </button>
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={acceptCookie} style={{ background: C.blue, color: C.white, border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 44 }}>
              Aceptar todo
            </button>
            <button onClick={() => setModal('cookies')} style={{ background: 'transparent', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '10px 16px', fontSize: 14, cursor: 'pointer', minHeight: 44 }}>
              Configurar
            </button>
          </div>
        </div>
      )}

      {/* ── MODALES DE POLÍTICAS ── */}
      {modal && (
        <PolicyModal
          title={modal === 'privacy' ? 'Política de Privacidad' : modal === 'terms' ? 'Términos de Uso' : 'Política de Cookies'}
          onClose={() => setModal(null)}
        >
          {modal === 'privacy'  && <PrivacyContent  onCookies={() => setModal('cookies')} />}
          {modal === 'terms'    && <TermsContent />}
          {modal === 'cookies'  && <CookiesContent  onAccept={() => { acceptCookie(); setModal(null); }} onPrivacy={() => setModal('privacy')} />}
        </PolicyModal>
      )}
    </div>
  );
}

// ─── SUB-COMPONENTES ──────────────────────────────────────────────────────────

function LogoSVG({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1A73E8"/>
      <g transform="rotate(-45 16 16)">
        <rect x="13" y="8" width="6" height="11" rx="1.5" fill="white"/>
        <polygon points="13,19 16,25 19,19" fill="white" opacity="0.85"/>
        <rect x="13" y="8" width="6" height="3" rx="1.5" fill="#FED7AA"/>
      </g>
    </svg>
  );
}

function ArticleCard({ article }) {
  return (
    <div style={{ background: C.white, borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ background: article.categoryColor, padding: '32px 28px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: 48 }}>{article.icon}</span>
      </div>
      <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ background: article.categoryColor, color: article.categoryText, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {article.category}
          </span>
          <span style={{ color: '#94A3B8', fontSize: 12 }}>{article.date}</span>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, lineHeight: 1.45, margin: 0 }}>{article.title}</h3>
        <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7, margin: 0, flex: 1 }}>{article.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ color: '#94A3B8', fontSize: 13 }}>⏱ {article.readTime}</span>
          <span style={{ color: C.blue, fontSize: 13, fontWeight: 600 }}>Leer más →</span>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ number, label }) {
  return (
    <div style={{ textAlign: 'center', padding: '8px' }}>
      <p style={{ color: '#60A5FA', fontWeight: 800, fontSize: 'clamp(32px,4vw,44px)', margin: '0 0 8px' }}>{number}</p>
      <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.5, margin: 0 }}>{label}</p>
    </div>
  );
}

function ContactCard({ icon, title, value, href, desc }) {
  return (
    <div style={{ background: C.gray, borderRadius: 12, padding: '28px 24px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
      <span style={{ fontSize: 36, display: 'block', marginBottom: 14 }}>{icon}</span>
      <h3 style={{ color: C.dark, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</h3>
      {href ? (
        <a href={href} style={{ color: C.blue, fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 8, textDecoration: 'none' }}>{value}</a>
      ) : (
        <p style={{ color: C.blue, fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{value}</p>
      )}
      <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function PolicyModal({ title, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.white, width: '100%', maxWidth: 700, maxHeight: '92vh', borderRadius: '16px 16px 0 0', display: 'flex', flexDirection: 'column', boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.dark }}>{title}</h2>
          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '24px', fontSize: 14, color: '#475569', lineHeight: 1.8 }}>
          {children}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', flexShrink: 0 }}>
          <button onClick={onClose} style={{ width: '100%', background: C.dark, color: C.white, border: 'none', borderRadius: 8, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer', minHeight: 52 }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTENIDO DE POLÍTICAS ───────────────────────────────────────────────────

function PrivacyContent({ onCookies }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ margin: 0, fontSize: 12, color: '#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>

      <p>En <strong>{SITE_NAME}</strong> nos comprometemos a proteger tu privacidad. Esta Política de Privacidad describe qué información recopilamos cuando visitas nuestro sitio web, cómo la usamos y los derechos que tienes sobre tus datos personales, en cumplimiento de las Políticas de Privacidad de Google, el Reglamento General de Protección de Datos (RGPD) y la legislación venezolana vigente.</p>

      <PolicySection title="1. Responsable del tratamiento">
        <p><strong>Provinet Empresa Papeleria</strong>, blog educativo sobre papelería con domicilio en {ADDRESS}. Para cualquier consulta sobre privacidad: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: C.blue }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>

      <PolicySection title="2. Datos que recopilamos">
        <p>Recopilamos las siguientes categorías de datos:</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, sistema operativo, páginas visitadas, duración de la sesión y tipo de dispositivo.</li>
          <li><strong>Cookies y tecnologías similares:</strong> datos de sesión, preferencias y métricas de uso (consulta nuestra Política de Cookies).</li>
          <li><strong>Datos de conversión publicitaria:</strong> información de interacción con anuncios de Google Ads para medir el rendimiento de campañas.</li>
          <li><strong>Datos de contacto voluntarios:</strong> si nos escribes al correo, los datos que tú mismo nos compartas (nombre, correo, mensaje).</li>
        </ul>
        <p style={{ marginTop: 12 }}>No recopilamos datos especialmente sensibles como información financiera, médica, documentos de identidad ni datos de menores sin consentimiento del tutor legal.</p>
      </PolicySection>

      <PolicySection title="3. Finalidad del tratamiento">
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Brindar y mejorar el contenido educativo del blog.</li>
          <li>Analizar el comportamiento de navegación para optimizar la experiencia del usuario.</li>
          <li>Medir el rendimiento de campañas publicitarias en Google Ads.</li>
          <li>Responder a consultas enviadas por correo electrónico.</li>
          <li>Mostrar publicidad contextualmente relevante a través de Google.</li>
          <li>Cumplir con obligaciones legales aplicables.</li>
        </ul>
      </PolicySection>

      <PolicySection title="4. Base legal del tratamiento">
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>Consentimiento:</strong> para cookies no esenciales, publicidad personalizada y seguimiento de conversiones. Puedes revocar tu consentimiento en cualquier momento.</li>
          <li><strong>Interés legítimo:</strong> para análisis de tráfico, seguridad del sitio y mejora del contenido.</li>
          <li><strong>Cumplimiento legal:</strong> cuando la normativa vigente así lo exija.</li>
        </ul>
      </PolicySection>

      <PolicySection title="5. Google Ads, Google Analytics y publicidad">
        <p>Este sitio utiliza <strong>Google Ads</strong> y <strong>Google Analytics</strong> para medir el rendimiento de campañas publicitarias y analizar el tráfico web. Google puede usar cookies propias para personalizar anuncios según visitas anteriores a este u otros sitios.</p>
        <p style={{ marginTop: 8 }}>Puedes controlar la publicidad personalizada de Google en: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>google.com/settings/ads</a></p>
        <p style={{ marginTop: 8 }}>Política de privacidad de Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>policies.google.com/privacy</a></p>
        <p style={{ marginTop: 8 }}>Este sitio puede participar en el programa de <strong>Google AdSense</strong>. Los anuncios mostrados son gestionados por Google y están sujetos a las políticas de Google para Editores.</p>
      </PolicySection>

      <PolicySection title="6. Compartición de datos con terceros">
        <p>No vendemos ni alquilamos tus datos personales. Podemos compartir información con:</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>Google LLC</strong> (Google Ads, Google Analytics, AdSense): para análisis y publicidad, conforme a los Términos de Servicio de Google.</li>
          <li><strong>Proveedores de alojamiento web</strong>: para el funcionamiento técnico del sitio.</li>
          <li><strong>Autoridades competentes</strong>: cuando sea requerido por mandato legal.</li>
        </ul>
      </PolicySection>

      <PolicySection title="7. Transferencias internacionales de datos">
        <p>Algunos proveedores, como Google LLC, procesan datos fuera de Venezuela. En esos casos se aplican los marcos legales internacionales vigentes (incluyendo Cláusulas Contractuales Tipo de la UE) para garantizar un nivel de protección adecuado.</p>
      </PolicySection>

      <PolicySection title="8. Conservación de datos">
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Datos de navegación y analítica: hasta 26 meses.</li>
          <li>Datos de conversión de Google Ads: conforme a la política de retención de Google (máx. 14 meses).</li>
          <li>Datos de contacto por correo: hasta 24 meses desde el último contacto.</li>
          <li>Datos requeridos por obligación legal: el período que establezca la normativa aplicable.</li>
        </ul>
      </PolicySection>

      <PolicySection title="9. Tus derechos">
        <p>Tienes derecho a:</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong>Acceder</strong> a los datos personales que tenemos sobre ti.</li>
          <li><strong>Rectificar</strong> datos inexactos o incompletos.</li>
          <li><strong>Suprimir</strong> tus datos («derecho al olvido»).</li>
          <li><strong>Limitar</strong> el tratamiento de tus datos.</li>
          <li><strong>Oponerte</strong> al tratamiento basado en interés legítimo.</li>
          <li><strong>Portabilidad</strong> de tus datos en formato legible por máquina.</li>
          <li><strong>Retirar tu consentimiento</strong> en cualquier momento sin efecto retroactivo.</li>
        </ul>
        <p style={{ marginTop: 12 }}>Para ejercer cualquiera de estos derechos escríbenos a: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: C.blue }}>{CONTACT_EMAIL}</a></p>
      </PolicySection>

      <PolicySection title="10. Cookies">
        <p>Utilizamos cookies propias y de terceros. Para más detalle, consulta nuestra{' '}
          <button onClick={onCookies} style={{ color: C.blue, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textDecoration: 'underline' }}>Política de Cookies</button>.
        </p>
      </PolicySection>

      <PolicySection title="11. Seguridad">
        <p>Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos: cifrado HTTPS/TLS en todas las comunicaciones, controles de acceso restringido y monitoreo continuo de seguridad.</p>
      </PolicySection>

      <PolicySection title="12. Menores de edad">
        <p>Este sitio no está dirigido a menores de 13 años y no recopilamos intencionalmente datos de menores. Si detectas que un menor ha proporcionado datos sin consentimiento de su tutor, contáctanos para proceder a su eliminación.</p>
      </PolicySection>

      <PolicySection title="13. Cambios a esta política">
        <p>Podemos actualizar esta Política periódicamente. Publicaremos los cambios en esta misma página con la nueva fecha de actualización. El uso continuado del sitio tras la publicación de cambios implica su aceptación.</p>
      </PolicySection>
    </div>
  );
}

function TermsContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ margin: 0, fontSize: 12, color: '#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>
      <p>Al acceder y utilizar el sitio web de <strong>{SITE_NAME}</strong>, aceptas los presentes Términos de Uso en su totalidad. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices este sitio.</p>

      <PolicySection title="1. Objeto y titularidad">
        <p>Este sitio web es operado por <strong>Provinet Empresa Papeleria</strong>, blog educativo sobre papelería, útiles escolares, material de oficina y artes manuales, con domicilio en {ADDRESS}. Su finalidad es ofrecer contenido informativo y educativo gratuito sobre el mundo de la papelería en Venezuela.</p>
      </PolicySection>

      <PolicySection title="2. Naturaleza del contenido">
        <p>Todo el contenido publicado en este blog (artículos, guías, consejos, comparativas) tiene carácter <strong>exclusivamente informativo y educativo</strong>. La información proporcionada no constituye asesoramiento profesional vinculante. {SITE_NAME} no garantiza la exactitud absoluta ni la vigencia permanente de todos los contenidos publicados.</p>
      </PolicySection>

      <PolicySection title="3. Uso aceptable">
        <p>Al usar este sitio te comprometes a no:</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Reproducir o distribuir el contenido del blog sin autorización escrita previa.</li>
          <li>Intentar acceder a sistemas, bases de datos o áreas no autorizadas del sitio.</li>
          <li>Realizar scraping masivo, crawling automatizado o uso no autorizado de los contenidos.</li>
          <li>Utilizar el sitio para actividades ilegales, engañosas o fraudulentas.</li>
          <li>Interferir con el funcionamiento normal del sitio o sus servidores.</li>
          <li>Enviar spam o comunicaciones no solicitadas a través de los canales de contacto.</li>
          <li>Hacerse pasar por {SITE_NAME} o sus representantes.</li>
        </ul>
      </PolicySection>

      <PolicySection title="4. Propiedad intelectual">
        <p>Todos los contenidos de este sitio (textos, artículos, imágenes, diseño gráfico, logotipos y la denominación comercial «Provinet Empresa Papeleria») son propiedad de {SITE_NAME} o de sus titulares legítimos, y están protegidos por las leyes de propiedad intelectual venezolanas e internacionales.</p>
        <p style={{ marginTop: 8 }}>Se permite citar fragmentos breves de los artículos con atribución expresa a {SITE_NAME} y enlace al artículo original. Queda prohibida la reproducción total sin autorización escrita.</p>
      </PolicySection>

      <PolicySection title="5. Limitación de responsabilidad">
        <p>{SITE_NAME} no garantiza la disponibilidad ininterrumpida del sitio web. La empresa no se responsabiliza de:</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>Decisiones tomadas exclusivamente con base en el contenido informativo del blog.</li>
          <li>Daños directos o indirectos derivados del uso o imposibilidad de uso del sitio.</li>
          <li>Contenidos de sitios web de terceros enlazados desde este blog.</li>
          <li>Variaciones en precios o disponibilidad de productos mencionados en artículos.</li>
        </ul>
      </PolicySection>

      <PolicySection title="6. Publicidad de Google">
        <p>Este sitio puede mostrar publicidad a través de <strong>Google Ads</strong> y/o <strong>Google AdSense</strong>. Los anunciantes son responsables de sus propios contenidos publicitarios. La aparición de anuncios no implica respaldo, recomendación ni relación comercial por parte de {SITE_NAME}.</p>
        <p style={{ marginTop: 8 }}>La publicidad mostrada puede estar personalizada según tu historial de navegación. Puedes gestionar tus preferencias publicitarias en <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>google.com/settings/ads</a>.</p>
      </PolicySection>

      <PolicySection title="7. Enlaces externos">
        <p>Este blog puede incluir enlaces a sitios web externos con fines informativos. {SITE_NAME} no controla el contenido de dichos sitios y no asume responsabilidad por su disponibilidad, exactitud o políticas de privacidad. El acceso a sitios externos es bajo tu propio riesgo.</p>
      </PolicySection>

      <PolicySection title="8. Privacidad y cookies">
        <p>El tratamiento de tus datos personales y el uso de cookies se rige por nuestra <strong>Política de Privacidad</strong> y <strong>Política de Cookies</strong>, documentos complementarios a estos Términos de Uso y accesibles desde cualquier página del sitio.</p>
      </PolicySection>

      <PolicySection title="9. Modificaciones de los Términos">
        <p>{SITE_NAME} se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios entran en vigor desde su publicación en este sitio. El uso continuado del sitio tras la publicación de cambios implica la aceptación de los nuevos términos. Te recomendamos revisar periódicamente este documento.</p>
      </PolicySection>

      <PolicySection title="10. Legislación aplicable y jurisdicción">
        <p>Estos Términos de Uso se rigen por la legislación de la República Bolivariana de Venezuela. Cualquier controversia derivada de la interpretación o aplicación de estos términos será sometida a los tribunales competentes de la jurisdicción de {ADDRESS}, renunciando las partes a cualquier otro fuero que pudiera corresponderles.</p>
      </PolicySection>

      <PolicySection title="11. Contacto">
        <p>Para cualquier consulta sobre estos Términos de Uso:
          {' '}<a href={`mailto:${CONTACT_EMAIL}`} style={{ color: C.blue }}>{CONTACT_EMAIL}</a>
        </p>
      </PolicySection>
    </div>
  );
}

function CookiesContent({ onAccept, onPrivacy }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ margin: 0, fontSize: 12, color: '#94A3B8' }}>Última actualización: {LAST_UPDATED}</p>
      <p>Esta política explica cómo <strong>{SITE_NAME}</strong> usa cookies y tecnologías similares en su sitio web, en cumplimiento con los requisitos de Google Ads, Google AdSense y la normativa de privacidad aplicable.</p>

      <PolicySection title="¿Qué son las cookies?">
        <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, teléfono o tableta) cuando visitas un sitio web. Permiten recordar tus preferencias, analizar cómo interactúas con el sitio y mostrar publicidad más relevante. No contienen información personal directamente identificable salvo que tú la hayas proporcionado previamente.</p>
      </PolicySection>

      <PolicySection title="Tipos de cookies que utilizamos">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <CookieCategory color="#EFF6FF" labelColor="#1E40AF" label="Esenciales / Necesarias" text="Imprescindibles para el funcionamiento básico del sitio. No pueden desactivarse sin afectar la funcionalidad del sitio.">
            <CookieItem name="provonet_cookie" desc="Almacena tu preferencia de consentimiento de cookies." duration="12 meses" />
          </CookieCategory>

          <CookieCategory color="#F0FDF4" labelColor="#15803D" label="Analíticas (Google Analytics)" text="Nos ayudan a comprender cómo los visitantes interactúan con el contenido del blog para mejorar la experiencia.">
            <CookieItem name="_ga" desc="Identifica usuarios únicos de forma anónima en Google Analytics." duration="2 años" />
            <CookieItem name="_gid" desc="Distingue sesiones de usuarios en Google Analytics." duration="24 horas" />
            <CookieItem name="_ga_*" desc="Cookie de sesión de Google Analytics 4." duration="2 años" />
            <CookieItem name="_gat" desc="Controla la velocidad de solicitudes a Google Analytics." duration="1 minuto" />
          </CookieCategory>

          <CookieCategory color="#FFF7ED" labelColor="#C2410C" label="Publicitarias (Google Ads / AdSense)" text="Usadas por Google para medir conversiones, mostrar anuncios relevantes y limitar la frecuencia de impresión de anuncios.">
            <CookieItem name="_gcl_au" desc="Seguimiento de conversiones y atribución de Google Ads." duration="3 meses" />
            <CookieItem name="IDE" desc="Personalización de anuncios de la red de Display de Google (DoubleClick)." duration="13 meses" />
            <CookieItem name="DSID" desc="Identificación del usuario autenticado para publicidad de Google." duration="2 semanas" />
            <CookieItem name="test_cookie" desc="Verifica que el navegador acepta cookies (Google DoubleClick)." duration="Sesión" />
            <CookieItem name="NID" desc="Almacena preferencias del usuario para personalización de anuncios de Google." duration="6 meses" />
          </CookieCategory>

          <CookieCategory color="#F5F3FF" labelColor="#5B21B6" label="Funcionales (Preferencias)" text="Recuerdan tus preferencias para mejorar tu experiencia en el sitio.">
            <CookieItem name="lang" desc="Almacena el idioma preferido del usuario." duration="Sesión" />
          </CookieCategory>

        </div>
      </PolicySection>

      <PolicySection title="Cookies de terceros">
        <p><strong>Google LLC</strong> puede instalar cookies propias cuando visitas este sitio para proveer sus servicios de análisis y publicidad. Google tiene su propia política de privacidad disponible en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>policies.google.com/privacy</a>.</p>
        <p style={{ marginTop: 8 }}>Para optar por no recibir publicidad personalizada de Google: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>google.com/settings/ads</a></p>
        <p style={{ marginTop: 8 }}>Herramienta de exclusión de Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>tools.google.com/dlpage/gaoptout</a></p>
        <p style={{ marginTop: 8 }}>Gestión de preferencias publicitarias (DAA): <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>aboutads.info/choices</a></p>
      </PolicySection>

      <PolicySection title="Cómo gestionar o eliminar las cookies desde tu navegador">
        <p>Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se vaya a instalar una. Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio o la relevancia de los anuncios mostrados.</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
          <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web</li>
          <li><strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies</li>
          <li><strong>Opera:</strong> Configuración → Avanzado → Privacidad y seguridad → Cookies</li>
        </ul>
        <p style={{ marginTop: 10 }}>Para más información consulta nuestra{' '}
          <button onClick={onPrivacy} style={{ color: C.blue, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, textDecoration: 'underline' }}>Política de Privacidad</button>.
        </p>
      </PolicySection>

      <PolicySection title="Tu consentimiento">
        <p>Al hacer clic en «Aceptar todo» consientes el uso de todas las cookies descritas. Puedes retirar tu consentimiento en cualquier momento borrando las cookies desde tu navegador. Tu preferencia de consentimiento se almacena durante 12 meses.</p>
      </PolicySection>

      <button onClick={onAccept} style={{ background: C.blue, color: C.white, border: 'none', borderRadius: 8, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer', minHeight: 52, marginTop: 4 }}>
        Aceptar todas las cookies
      </button>
    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 8, marginTop: 0 }}>{title}</h3>
      <div style={{ color: '#475569' }}>{children}</div>
    </div>
  );
}

function CookieCategory({ color, labelColor, label, text, children }) {
  return (
    <div style={{ background: color, borderRadius: 8, padding: '14px 16px', border: '1px solid rgba(0,0,0,0.05)' }}>
      <p style={{ color: labelColor, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 4px' }}>{label}</p>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#475569' }}>{text}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  );
}

function CookieItem({ name, desc, duration }) {
  return (
    <div style={{ fontSize: 12, color: '#475569', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <code style={{ background: 'rgba(0,0,0,0.07)', padding: '2px 7px', borderRadius: 4, fontFamily: 'monospace', flexShrink: 0 }}>{name}</code>
      <span style={{ flex: 1 }}>{desc}</span>
      <span style={{ color: '#94A3B8', flexShrink: 0, fontStyle: 'italic' }}>{duration}</span>
    </div>
  );
}
