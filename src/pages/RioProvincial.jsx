// @ts-nocheck
import { useEffect } from 'react';

export default function RioProvincial() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Provinet Empresa Civil — Blog independiente sobre finanzas personales y de negocio';

    return () => {
      document.title = prevTitle;
    };
  }, []);

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Provinet Empresa Civil — Blog independiente sobre finanzas personales y de negocio</title>
<meta name="description" content="Blog educativo e independiente que explica, en español y de forma práctica, cómo separar el dinero personal del dinero del negocio. Contenido informativo, sin afiliación con bancos ni entidades financieras.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://provinetempresacivil.blog/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Provinet Empresa Civil">
<meta property="og:title" content="Provinet Empresa Civil — Separar el dinero personal del negocio">
<meta property="og:description" content="Blog independiente e informativo sobre finanzas personales y de emprendimiento. Sin afiliación bancaria.">
<meta property="og:url" content="https://provinetempresacivil.blog/">

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%2316302B%22/><text x=%2250%22 y=%2265%22 font-size=%2260%22 fill=%22%23F8F5EF%22 text-anchor=%22middle%22 font-family=%22monospace%22>P</text></svg>">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.19 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.visible{visibility:visible}.relative{position:relative}.mx-auto{margin-left:auto;margin-right:auto}.my-4{margin-top:1rem;margin-bottom:1rem}.mb-3{margin-bottom:.75rem}.mb-8{margin-bottom:2rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:1.25rem}.mt-6{margin-top:1.5rem}.mt-7{margin-top:1.75rem}.mt-8{margin-top:2rem}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-11{height:2.75rem}.w-11{width:2.75rem}.w-full{width:100%}.max-w-6xl{max-width:72rem}.flex-1{flex:1 1 0%}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.gap-6{gap:1.5rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem*var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.75rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem*var(--tw-space-y-reverse))}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.p-6{padding:1.5rem}.p-7{padding:1.75rem}.p-8{padding:2rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-10{padding-top:2.5rem;padding-bottom:2.5rem}.py-14{padding-top:3.5rem;padding-bottom:3.5rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.pb-14{padding-bottom:3.5rem}.pt-1{padding-top:.25rem}.pt-10{padding-top:2.5rem}.pt-2{padding-top:.5rem}.pt-4{padding-top:1rem}.text-left{text-align:left}.text-center{text-align:center}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-none{line-height:1}.leading-tight{line-height:1.25}.underline{text-decoration-line:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.hover\:opacity-70:hover{opacity:.7}@media (min-width:768px){.md\:flex{display:flex}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\:flex-row{flex-direction:row}.md\:items-end{align-items:flex-end}.md\:text-right{text-align:right}.md\:text-5xl{font-size:3rem;line-height:1}}</style>
<style>
/* ============================================================
   Provinet Empresa Civil — style.css
   Paleta: crema papel / verde tinta / salvia / arena tostada
   Tipografía: Space Grotesk (display) + Source Serif 4 (cuerpo) + JetBrains Mono (datos)
   ============================================================ */

:root{
  --crema:      #FFF8EE;
  --crema-2:    #FFE9CE;
  --tinta:      #2C3E50;
  --tinta-80:   #3B516A;
  --salvia:     #14B8A6;
  --salvia-l:   #99E6DA;
  --arena:      #FF6B57;
  --arena-l:    #FFD1A9;
  --linea:      #FFDDB8;
  --blanco:     #FFFFFF;
  --sol:        #FFC93C;
}

*{ box-sizing:border-box; }

html{ scroll-behavior:smooth; }

body{
  background:var(--crema);
  color:var(--tinta);
  font-family:'Nunito', 'Trebuchet MS', sans-serif;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
}

.font-display{
  font-family:'Space Grotesk', sans-serif;
  letter-spacing:-0.01em;
}

.fuente-mono{
  font-family:'JetBrains Mono', monospace;
}

/* ---------- Barra de exención (siempre visible) ---------- */
.exencion-bar{
  background:var(--arena);
  color:var(--blanco);
  font-family:'JetBrains Mono', monospace;
  font-size:0.72rem;
  letter-spacing:0.02em;
}

/* ---------- Costura / seam divisorio (elemento firma) ---------- */
.costura{
  position:relative;
}
.costura::before{
  content:"";
  position:absolute;
  top:0; bottom:0; left:50%;
  width:0;
  border-left:3px dashed var(--salvia);
  transform:translateX(-50%);
}
.costura-punto{
  position:absolute;
  left:50%; top:50%;
  transform:translate(-50%,-50%);
  width:38px; height:38px;
  border-radius:50%;
  background:var(--sol);
  border:3px solid var(--blanco);
  box-shadow:0 4px 10px -2px rgba(255,107,87,0.45);
  display:flex; align-items:center; justify-content:center;
  color:var(--tinta);
  font-family:'Space Grotesk', sans-serif;
  font-weight:700;
  font-size:0.9rem;
}

@media (max-width: 767px){
  .costura::before{ display:none; }
  .costura-punto{ display:none; }
}

/* ---------- Tarjetas de artículo ---------- */
.tarjeta-articulo{
  background:var(--blanco);
  border:1px solid var(--linea);
  transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.tarjeta-articulo:hover{
  transform:translateY(-3px);
  box-shadow:0 12px 26px -12px rgba(255,107,87,0.35);
  border-color:var(--salvia);
}

/* ---------- Etiqueta ledger ---------- */
.etiqueta-ledger{
  font-family:'JetBrains Mono', monospace;
  font-size:0.68rem;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--salvia);
  border-bottom:2px dashed var(--sol);
  display:inline-block;
  padding-bottom:2px;
}

/* ---------- Botones ---------- */
.btn-primario{
  background:var(--arena);
  color:var(--blanco);
  font-family:'Space Grotesk', sans-serif;
  transition:background .15s ease, transform .15s ease;
}
.btn-primario:hover{
  background:#E8543F;
  transform:translateY(-1px);
}
.btn-secundario{
  border:2px solid var(--salvia);
  color:var(--salvia);
  font-family:'Space Grotesk', sans-serif;
  transition:all .15s ease;
}
.btn-secundario:hover{
  background:var(--salvia);
  color:var(--blanco);
}

/* ---------- Overlays legales ---------- */
.overlay-legal{
  position:fixed; inset:0;
  background:rgba(44,62,80,0.45);
  backdrop-filter:blur(2px);
  z-index:60;
  display:none;
  align-items:flex-start;
  justify-content:center;
  overflow-y:auto;
  padding:2.5rem 1rem;
}
.overlay-legal.activo{ display:flex; }
.overlay-panel{
  background:var(--crema);
  max-width:760px;
  width:100%;
  border:1px solid var(--linea);
  box-shadow:0 30px 60px -20px rgba(0,0,0,0.35);
}

/* ---------- Foco visible (accesibilidad) ---------- */
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible{
  outline:2px solid var(--salvia);
  outline-offset:2px;
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce){
  *{ scroll-behavior:auto !important; transition:none !important; }
}

.divisor-punteado{
  border-top:2px dashed var(--linea);
}

.numero-cuenta::before{
  content:"№ ";
  color:var(--arena);
}

/* ---------- Redondeo más juguetón (menos institucional) ---------- */
.rounded{ border-radius:0.9rem !important; }
.rounded-lg{ border-radius:1.25rem !important; }
input, textarea{ border-radius:0.9rem !important; }

</style>

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Provinet Empresa Civil",
  "url": "https://provinetempresacivil.blog/",
  "description": "Blog independiente e informativo sobre cómo separar el dinero personal del dinero del negocio.",
  "inLanguage": "es",
  "isAccessibleForFree": true,
  "publisher": {
    "@type": "Person",
    "name": "Elias Moises Barcelo Martinez",
    "email": "soporte@provinetempresacivil.blog",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Esquina de la Calle 6, Carrera 19",
      "addressLocality": "Barquisimeto",
      "postalCode": "3001",
      "addressRegion": "Lara",
      "addressCountry": "VE"
    }
  },
  "publishingPrinciples": "https://provinetempresacivil.blog/#politica-editorial",
  "blogPost": [
    {
      "@type": "BlogPosting",
      "headline": "Cómo separar el dinero personal del negocio: guía desde cero",
      "datePublished": "2026-06-10",
      "author": { "@type": "Person", "name": "Elias Moises Barcelo Martinez" }
    },
    {
      "@type": "BlogPosting",
      "headline": "Por qué mezclar las finanzas personales y del negocio es un error frecuente",
      "datePublished": "2026-06-17",
      "author": { "@type": "Person", "name": "Elias Moises Barcelo Martinez" }
    },
    {
      "@type": "BlogPosting",
      "headline": "Orden financiero básico para emprendedores: primeros pasos prácticos",
      "datePublished": "2026-06-24",
      "author": { "@type": "Person", "name": "Elias Moises Barcelo Martinez" }
    }
  ]
}
</script>
</head>

<body class="antialiased">

<!-- ============ BARRA DE EXENCIÓN (siempre visible, arriba) ============ -->
<div class="exencion-bar py-2 px-4 text-center">
  Provinet Empresa Civil no tiene afiliación, vínculo comercial ni representación oficial con ningún banco, entidad financiera o institución. Contenido exclusivamente informativo y educativo.
</div>

<!-- ============ ENCABEZADO ============ -->
<header class="border-b" style="border-color:var(--linea)">
  <div class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between flex-wrap gap-3">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 flex items-center justify-center rounded-full font-display font-bold text-lg" style="background:var(--salvia); color:var(--blanco)">PE</div>
      <div>
        <p class="font-display font-bold text-lg leading-tight" style="color:var(--tinta)">Provinet Empresa Civil</p>
        <p class="etiqueta-ledger">Blog independiente · Contenido informativo y educativo sobre finanzas</p>
      </div>
    </div>
    <nav class="flex gap-5 font-display text-sm" style="color:var(--tinta)">
      <a href="#articulos" class="hover:opacity-70">Artículos</a>
      <a href="#acerca" class="hover:opacity-70">Acerca de</a>
      <a href="#contacto" class="hover:opacity-70">Contacto</a>
    </nav>
  </div>
</header>

<!-- ============ HERO — "qué ES y qué NO ES", sin scroll ============ -->
<section class="max-w-6xl mx-auto px-5 pt-10 pb-14">
  <div class="grid md:grid-cols-2 gap-10 items-center costura relative">

    <div>
      <span class="etiqueta-ledger">Cuenta № 01 · Finanzas personales</span>
      <h1 class="font-display font-bold text-4xl md:text-5xl mt-4 leading-tight" style="color:var(--tinta)">
        Separar el dinero<br>que es tuyo del dinero<br>del negocio.
      </h1>
      <p class="mt-5 text-lg" style="color:var(--tinta-80)">
        Un blog educativo, escrito en español, que explica de forma clara y práctica por qué conviene llevar cuentas separadas desde el primer día de un emprendimiento — y cómo hacerlo sin complicarse.
      </p>
      <div class="mt-7 flex gap-3 flex-wrap">
        <a href="#articulos" class="btn-primario px-6 py-3 rounded font-medium inline-block">Leer los artículos</a>
        <a href="#que-no-es" class="btn-secundario px-6 py-3 rounded font-medium inline-block">¿Qué NO es este sitio?</a>
      </div>
    </div>

    <div class="costura-punto hidden md:flex">⇄</div>

    <div class="bg-white border rounded-lg p-7" style="border-color:var(--linea)">
      <span class="etiqueta-ledger">Cuenta № 02 · Negocio</span>
      <h2 class="font-display font-semibold text-2xl mt-4" style="color:var(--tinta)">¿Qué es Provinet Empresa Civil?</h2>
      <ul class="mt-4 space-y-2 text-sm" style="color:var(--tinta-80)">
        <li>✓ Un blog independiente, operado por una sola persona real.</li>
        <li>✓ Contenido educativo sobre orden financiero y separación de cuentas.</li>
        <li>✓ Escrito en español, con fuentes citadas y sin lenguaje de urgencia.</li>
      </ul>
      <div class="divisor-punteado my-4"></div>
      <h2 id="que-no-es" class="font-display font-semibold text-2xl" style="color:var(--tinta)">¿Qué NO es?</h2>
      <ul class="mt-4 space-y-2 text-sm" style="color:var(--tinta-80)">
        <li>✕ No es el sitio oficial de ningún banco ni entidad financiera.</li>
        <li>✕ No vende productos, créditos ni servicios financieros.</li>
        <li>✕ No solicita contraseñas, tarjetas ni datos bancarios.</li>
        <li>✕ No ofrece asesoría financiera personalizada.</li>
      </ul>
    </div>

  </div>
</section>

<!-- ============ ARTÍCULOS ============ -->
<section id="articulos" class="max-w-6xl mx-auto px-5 py-14 border-t" style="border-color:var(--linea)">
  <span class="etiqueta-ledger">Registro de publicaciones</span>
  <h2 class="font-display font-bold text-3xl mt-3 mb-8" style="color:var(--tinta)">Artículos</h2>

  <div class="grid md:grid-cols-3 gap-6">

    <!-- Artículo 1 -->
    <article class="tarjeta-articulo rounded-lg p-6 flex flex-col">
      <p class="fuente-mono text-xs" style="color:var(--arena)">24 jun 2026 · Elias Moises Barcelo Martinez</p>
      <h3 class="font-display font-semibold text-xl mt-3" style="color:var(--tinta)">Cómo separar el dinero personal del negocio: guía desde cero</h3>
      <p class="mt-3 text-sm flex-1" style="color:var(--tinta-80)">
        Los pasos concretos para abrir una cuenta dedicada al negocio, fijar un "sueldo" propio y dejar de usar la misma billetera para todo.
      </p>
      <details class="mt-4">
        <summary class="font-display text-sm cursor-pointer" style="color:var(--salvia)">Leer artículo completo</summary>
        <div class="mt-3 text-sm space-y-3" style="color:var(--tinta-80)">
          <p>El primer paso práctico es abrir una cuenta bancaria distinta, exclusiva para los movimientos del negocio, aunque el emprendimiento aún sea pequeño o informal. Esto permite ver con claridad cuánto entra y cuánto sale realmente de la actividad, sin mezclarlo con gastos del hogar.</p>
          <p>El segundo paso es definir un monto fijo o un porcentaje de las ganancias que la persona se "paga" a sí misma, como si fuera un sueldo. Ese monto es el único dinero del negocio que pasa a la cuenta personal; el resto se queda en la cuenta del negocio para gastos operativos y reinversión.</p>
          <p>El tercer paso es registrar cada movimiento, aunque sea en una hoja simple: fecha, concepto y monto. No se necesita un sistema contable complejo para empezar; alcanza con un cuaderno o una hoja de cálculo básica, siempre que se use de forma constante.</p>
          <p>Finalmente, conviene revisar ese registro cada semana o cada mes, para detectar a tiempo si los gastos personales están "invadiendo" el dinero del negocio, o al revés. Este hábito de revisión es, en la práctica, más importante que la herramienta que se use para llevarlo.</p>
          <p class="fuente-mono text-xs pt-2" style="color:var(--arena)">Contenido informativo y educativo. No constituye asesoría financiera personalizada.</p>
        </div>
      </details>
    </article>

    <!-- Artículo 2 -->
    <article class="tarjeta-articulo rounded-lg p-6 flex flex-col">
      <p class="fuente-mono text-xs" style="color:var(--arena)">17 jun 2026 · Elias Moises Barcelo Martinez</p>
      <h3 class="font-display font-semibold text-xl mt-3" style="color:var(--tinta)">Por qué mezclar las finanzas personales y del negocio es un error frecuente</h3>
      <p class="mt-3 text-sm flex-1" style="color:var(--tinta-80)">
        Las consecuencias prácticas de no separar las cuentas: decisiones tomadas a ciegas, dificultad para medir ganancias reales y estrés financiero.
      </p>
      <details class="mt-4">
        <summary class="font-display text-sm cursor-pointer" style="color:var(--salvia)">Leer artículo completo</summary>
        <div class="mt-3 text-sm space-y-3" style="color:var(--tinta-80)">
          <p>Cuando el dinero del negocio y el dinero personal viven en la misma cuenta, es muy difícil saber si el emprendimiento realmente está generando ganancias o si, sin darse cuenta, se está "comiendo" los ahorros personales para sostenerlo.</p>
          <p>Esta mezcla también dificulta tomar decisiones importantes, como si conviene subir precios, contratar ayuda o invertir en más inventario, porque no existe un panorama claro de cuánto dinero pertenece realmente a la actividad económica.</p>
          <p>A nivel emocional, no separar las finanzas suele generar más estrés: cada gasto personal se siente como una amenaza al negocio, y cada gasto del negocio se siente como un sacrificio personal, cuando en realidad son dos cosas distintas que deben medirse por separado.</p>
          <p class="fuente-mono text-xs pt-2" style="color:var(--arena)">Contenido informativo y educativo. No constituye asesoría financiera personalizada.</p>
        </div>
      </details>
    </article>

    <!-- Artículo 3 -->
    <article class="tarjeta-articulo rounded-lg p-6 flex flex-col">
      <p class="fuente-mono text-xs" style="color:var(--arena)">10 jun 2026 · Elias Moises Barcelo Martinez</p>
      <h3 class="font-display font-semibold text-xl mt-3" style="color:var(--tinta)">Orden financiero básico para emprendedores: primeros pasos prácticos</h3>
      <p class="mt-3 text-sm flex-1" style="color:var(--tinta-80)">
        Tres hábitos simples de orden financiero que cualquier persona puede empezar a aplicar hoy mismo, sin necesidad de conocimientos contables previos.
      </p>
      <details class="mt-4">
        <summary class="font-display text-sm cursor-pointer" style="color:var(--salvia)">Leer artículo completo</summary>
        <div class="mt-3 text-sm space-y-3" style="color:var(--tinta-80)">
          <p>El primer hábito es anotar todo movimiento de dinero, sin excepción, aunque parezca pequeño. La falta de registro es la causa más común de desorden financiero, tanto en la vida personal como en un negocio recién iniciado.</p>
          <p>El segundo hábito es clasificar los gastos en categorías simples: fijos, variables y ocasionales. Esta clasificación ayuda a identificar rápidamente en qué se está gastando de más y qué se puede ajustar sin afectar lo esencial.</p>
          <p>El tercer hábito es revisar el estado financiero con una frecuencia fija, por ejemplo cada domingo, dedicando quince minutos a mirar los números en frío. Este pequeño hábito, repetido con constancia, suele tener más impacto que cualquier herramienta o aplicación sofisticada.</p>
          <p class="fuente-mono text-xs pt-2" style="color:var(--arena)">Contenido informativo y educativo. No constituye asesoría financiera personalizada.</p>
        </div>
      </details>
    </article>

  </div>
</section>

<!-- ============ ACERCA DE ============ -->
<section id="acerca" class="max-w-6xl mx-auto px-5 py-14 border-t" style="border-color:var(--linea)">
  <div class="grid md:grid-cols-2 gap-10">
    <div>
      <span class="etiqueta-ledger">Quién escribe</span>
      <h2 class="font-display font-bold text-3xl mt-3" style="color:var(--tinta)">Acerca de Provinet Empresa Civil</h2>
      <p class="mt-4 text-sm" style="color:var(--tinta-80)">
        Provinet Empresa Civil es un blog independiente escrito y operado por <strong>Elias Moises Barcelo Martinez</strong>. El objetivo del sitio es explicar, con lenguaje sencillo y ejemplos prácticos, cómo separar el dinero personal del dinero de un negocio o emprendimiento.
      </p>
      <p class="mt-3 text-sm" style="color:var(--tinta-80)">
        El método de trabajo consiste en revisar fuentes públicas sobre educación financiera y traducirlas a pasos concretos y aplicables, sin tecnicismos innecesarios. Este sitio no representa a ninguna institución financiera, banco, cooperativa ni organismo público.
      </p>
      <p class="mt-3 text-sm font-medium" style="color:var(--tinta)">
        Declaración de independencia: Provinet Empresa Civil no tiene afiliación, vínculo comercial ni representación oficial con ningún banco, entidad financiera o institución. Contenido exclusivamente informativo y educativo.
      </p>
    </div>
    <div id="politica-editorial" class="bg-white border rounded-lg p-7" style="border-color:var(--linea)">
      <span class="etiqueta-ledger">Política editorial</span>
      <h3 class="font-display font-semibold text-xl mt-3" style="color:var(--tinta)">Cómo se elige y verifica el contenido</h3>
      <ul class="mt-4 space-y-2 text-sm" style="color:var(--tinta-80)">
        <li>• Los artículos se basan en fuentes públicas de educación financiera, citadas cuando corresponde.</li>
        <li>• No se aceptan pagos para publicar contenido favorable a un tercero.</li>
        <li>• La publicidad mostrada en el sitio (si existe) no influye en los temas ni en las conclusiones de los artículos.</li>
        <li>• No se prometen resultados económicos ni se ofrece asesoría personalizada.</li>
        <li>• Cualquier corrección se aplica de forma visible en el artículo correspondiente.</li>
      </ul>
    </div>
  </div>
</section>

<!-- ============ CONTACTO ============ -->
<section id="contacto" class="max-w-6xl mx-auto px-5 py-14 border-t" style="border-color:var(--linea)">
  <span class="etiqueta-ledger">Contacto verificable</span>
  <h2 class="font-display font-bold text-3xl mt-3 mb-8" style="color:var(--tinta)">Contacto</h2>

  <div class="grid md:grid-cols-2 gap-10">

    <div class="text-sm space-y-3" style="color:var(--tinta-80)">
      <p><strong style="color:var(--tinta)">Titular:</strong> Elias Moises Barcelo Martinez</p>
      <p><strong style="color:var(--tinta)">Correo:</strong> soporte@provinetempresacivil.blog</p>
      <p><strong style="color:var(--tinta)">Teléfono / WhatsApp:</strong> +58 414-350-4449</p>
      <p><strong style="color:var(--tinta)">Dirección:</strong> Esquina de la Calle 6, Carrera 19, Barquisimeto 3001, Lara, Venezuela</p>
      <div class="divisor-punteado my-4"></div>
      <p class="text-xs" style="color:var(--arena)">Este sitio jamás solicitará contraseñas, datos de tarjetas, datos bancarios ni documentos de identidad por ningún canal.</p>
    </div>

    <!-- Formulario de contacto editorial (anti-phishing: nombre, email, mensaje) -->
    <form class="bg-white border rounded-lg p-6 space-y-3" style="border-color:var(--linea)" onsubmit="event.preventDefault(); this.reset(); document.getElementById('msj-contacto').classList.remove('hidden');">
      <p class="font-display font-semibold" style="color:var(--tinta)">Contacto editorial</p>
      <input required type="text" placeholder="Tu nombre" class="w-full border rounded px-3 py-2 text-sm" style="border-color:var(--linea)">
      <input required type="email" placeholder="Tu correo" class="w-full border rounded px-3 py-2 text-sm" style="border-color:var(--linea)">
      <textarea required placeholder="Tu mensaje" rows="4" class="w-full border rounded px-3 py-2 text-sm" style="border-color:var(--linea)"></textarea>
      <button type="submit" class="btn-primario w-full py-2.5 rounded font-medium">Enviar mensaje</button>
      <p id="msj-contacto" class="hidden text-xs" style="color:var(--salvia)">Gracias, tu mensaje quedó registrado.</p>
      <p class="text-xs pt-1" style="color:var(--arena)">Nunca pediremos contraseñas ni datos bancarios en este formulario. Al enviar, aceptás la <a href="javascript:void(0)" onclick="abrirOverlay('overlay-privacidad')" class="underline">Política de privacidad</a>.</p>
    </form>

  </div>

  <!-- Newsletter (solo email, opcional nombre) -->
  <div class="mt-8 rounded-lg p-6 border" style="border-color:var(--linea); background:var(--crema-2)">
    <p class="font-display font-semibold mb-3" style="color:var(--tinta)">Boletín educativo (opcional)</p>
    <form class="flex flex-col md:flex-row gap-3" onsubmit="event.preventDefault(); this.reset(); document.getElementById('msj-news').classList.remove('hidden');">
      <input type="text" placeholder="Nombre (opcional)" class="flex-1 border rounded px-3 py-2 text-sm" style="border-color:var(--linea)">
      <input required type="email" placeholder="Tu correo" class="flex-1 border rounded px-3 py-2 text-sm" style="border-color:var(--linea)">
      <button type="submit" class="btn-secundario px-5 py-2 rounded font-medium">Suscribirme</button>
    </form>
    <p id="msj-news" class="hidden text-xs mt-2" style="color:var(--salvia)">Listo, ya estás suscrito.</p>
    <p class="text-xs mt-2" style="color:var(--arena)">Solo se solicita correo. Podés darte de baja cuando quieras.</p>
  </div>
</section>

<!-- ============ PIE DE PÁGINA ============ -->
<footer class="border-t mt-6" style="border-color:var(--linea)">
  <div class="max-w-6xl mx-auto px-5 py-10 text-sm" style="color:var(--tinta-80)">
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <p class="font-display font-bold" style="color:var(--tinta)">Provinet Empresa Civil</p>
        <p class="mt-2">Titular: Elias Moises Barcelo Martinez</p>
        <p>Correo: soporte@provinetempresacivil.blog</p>
        <p>Dirección: Esquina de la Calle 6, Carrera 19, Barquisimeto 3001, Lara, Venezuela</p>
      </div>
      <div class="flex flex-col md:items-end gap-1">
        <button onclick="abrirOverlay('overlay-privacidad')" class="underline text-left md:text-right">Política de privacidad y cookies</button>
        <button onclick="abrirOverlay('overlay-legal')" class="underline text-left md:text-right">Aviso legal</button>
        <a href="#politica-editorial" class="underline text-left md:text-right">Política editorial</a>
      </div>
    </div>
    <p class="divisor-punteado mt-6 pt-4 text-xs" style="color:var(--arena)">
      Provinet Empresa Civil no tiene afiliación, vínculo comercial ni representación oficial con ningún banco, entidad financiera o institución. Contenido exclusivamente informativo y educativo. © 2026 Provinet Empresa Civil.
    </p>
  </div>
</footer>

<!-- ============ OVERLAY: POLÍTICA DE PRIVACIDAD Y COOKIES ============ -->
<div id="overlay-privacidad" class="overlay-legal">
  <div class="overlay-panel p-8 mt-6">
    <div class="flex justify-between items-start">
      <h2 class="font-display font-bold text-2xl" style="color:var(--tinta)">Política de privacidad y cookies</h2>
      <button onclick="cerrarOverlay('overlay-privacidad')" class="font-display text-xl leading-none">✕</button>
    </div>
    <div class="mt-4 text-sm space-y-3" style="color:var(--tinta-80)">
      <p>Provinet Empresa Civil, operado por Elias Moises Barcelo Martinez, recopila únicamente los datos que la persona entrega de forma voluntaria en los formularios de contacto (nombre, correo y mensaje) y de boletín (correo y, opcionalmente, nombre).</p>
      <p>Estos datos se usan exclusivamente para responder consultas y enviar el boletín educativo, si la persona se suscribió. No se venden ni se comparten con terceros con fines comerciales.</p>
      <p>El sitio puede usar cookies técnicas necesarias para su funcionamiento y, si corresponde, cookies de publicidad de terceros (por ejemplo, Google AdSense) para mostrar anuncios. Estas cookies no permiten identificar a la persona por su nombre.</p>
      <p>La persona puede solicitar en cualquier momento la eliminación de sus datos escribiendo a soporte@provinetempresacivil.blog.</p>
      <p>Este sitio no solicita ni almacena contraseñas, datos de tarjetas, datos bancarios ni documentos de identidad.</p>
    </div>
  </div>
</div>

<!-- ============ OVERLAY: AVISO LEGAL ============ -->
<div id="overlay-legal" class="overlay-legal">
  <div class="overlay-panel p-8 mt-6">
    <div class="flex justify-between items-start">
      <h2 class="font-display font-bold text-2xl" style="color:var(--tinta)">Aviso legal</h2>
      <button onclick="cerrarOverlay('overlay-legal')" class="font-display text-xl leading-none">✕</button>
    </div>
    <div class="mt-4 text-sm space-y-3" style="color:var(--tinta-80)">
      <p><strong>Titularidad:</strong> Este sitio, provinetempresacivil.blog, es operado y de titularidad exclusiva de Elias Moises Barcelo Martinez, con domicilio en Esquina de la Calle 6, Carrera 19, Barquisimeto 3001, Lara, Venezuela, y correo de contacto soporte@provinetempresacivil.blog.</p>
      <p><strong>Propiedad intelectual:</strong> Los textos, diseño y marca "Provinet Empresa Civil" son propiedad original del titular, salvo cuando se cite expresamente una fuente externa.</p>
      <p><strong>Ausencia de afiliación:</strong> Provinet Empresa Civil no tiene afiliación, vínculo comercial ni representación oficial con ningún banco, entidad financiera, gobierno u organismo público. Toda mención a terceros tiene fines exclusivamente informativos y de análisis.</p>
      <p><strong>Naturaleza del contenido:</strong> El contenido de este sitio es informativo y educativo. No constituye asesoría financiera, legal ni contable personalizada, y no debe interpretarse como tal.</p>
      <p><strong>Publicidad:</strong> Este sitio puede mostrar anuncios a través de redes publicitarias como Google AdSense. La presencia de publicidad no implica recomendación ni afiliación con los anunciantes.</p>
    </div>
  </div>
</div>

<script>
function abrirOverlay(id){
  document.getElementById(id).classList.add('activo');
}
function cerrarOverlay(id){
  document.getElementById(id).classList.remove('activo');
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    document.querySelectorAll('.overlay-legal.activo').forEach(function(el){ el.classList.remove('activo'); });
  }
});
</script>

</body>
</html>`;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
