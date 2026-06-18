// @ts-nocheck
import { useEffect } from 'react';

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

:root {
  --navy:       #1A56DB;
  --navy-mid:   #1E429F;
  --slate:      #1C64F2;
  --sky:        #3F83F8;
  --sky-light:  #EBF5FF;
  --accent:     #0EA5E9;
  --white:      #FFFFFF;
  --grey-50:    #F8FAFC;
  --grey-100:   #F1F5F9;
  --grey-300:   #CBD5E1;
  --grey-500:   #64748B;
  --grey-700:   #374151;
  --text:       #1E293B;
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --radius:     10px;
  --shadow:     0 2px 16px rgba(26,86,219,0.08);
  --shadow-md:  0 4px 32px rgba(26,86,219,0.14);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  background: var(--white);
}

nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--white);
  border-bottom: 2px solid var(--grey-100);
  box-shadow: 0 2px 12px rgba(26,86,219,0.07);
  padding: 0 24px;
}
.nav-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  height: 64px; gap: 16px;
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.15rem; color: var(--text);
  text-decoration: none; white-space: nowrap;
  display: flex; align-items: center; gap: 8px;
}
.nav-logo span { color: var(--navy); }
.nav-links {
  display: flex; gap: 6px; list-style: none; flex-wrap: wrap;
}
.nav-links a {
  color: var(--grey-700); text-decoration: none;
  font-size: 0.85rem; font-weight: 500;
  padding: 6px 12px; border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.nav-links a:hover { color: var(--navy); background: var(--sky-light); }
.nav-search {
  display: flex; align-items: center; gap: 8px;
  background: var(--grey-50);
  border: 1px solid var(--grey-300);
  border-radius: 8px; padding: 6px 12px;
}
.nav-search input {
  background: none; border: none; outline: none;
  color: var(--text); font-family: var(--font-body);
  font-size: 0.85rem; width: 160px;
}
.nav-search input::placeholder { color: var(--grey-500); }
.burger { display: none; background: none; border: none; cursor: pointer; }
.burger span { display: block; width: 22px; height: 2px; background: var(--text); margin: 5px 0; border-radius: 2px; }

.hero {
  background: linear-gradient(135deg, #EBF5FF 0%, #F0F7FF 60%, #E8F4FD 100%);
  padding: 80px 24px 72px;
  text-align: center; color: var(--text);
  position: relative; overflow: hidden;
  border-bottom: 1px solid var(--grey-100);
}
.hero::before {
  content: '';
  position: absolute; top: -60px; right: -60px;
  width: 320px; height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero-eyebrow {
  display: inline-block;
  background: rgba(26,86,219,0.1);
  color: var(--navy);
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 5px 14px; border-radius: 20px;
  margin-bottom: 20px;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.2; margin-bottom: 20px;
  max-width: 680px; margin-inline: auto;
  color: var(--text);
}
.hero h1 em { color: var(--navy); font-style: normal; }
.hero p {
  font-size: 1.05rem; color: var(--grey-500);
  max-width: 520px; margin: 0 auto 32px;
}
.hero-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--navy); color: var(--white);
  font-weight: 600; font-size: 0.95rem;
  padding: 13px 28px; border-radius: 8px;
  text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
}
.hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,86,219,0.25); }

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
section { padding: 64px 24px; }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--navy); margin-bottom: 8px;
}
.section-sub { color: var(--grey-500); font-size: 0.95rem; margin-bottom: 36px; }

.categories { background: var(--grey-50); }
.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px; margin-top: 32px;
}
.cat-card {
  background: var(--white); border: 1px solid var(--grey-100);
  border-radius: var(--radius); padding: 22px 18px;
  text-align: center; text-decoration: none; color: var(--text);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.cat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.cat-icon { font-size: 2rem; margin-bottom: 10px; display: block; }
.cat-card h3 { font-size: 0.92rem; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
.cat-card p { font-size: 0.78rem; color: var(--grey-500); }

.articles-section { background: var(--white); }
.articles-filter {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;
}
.filter-btn {
  border: 1px solid var(--grey-300); background: var(--white);
  color: var(--grey-700); font-family: var(--font-body);
  font-size: 0.82rem; font-weight: 500;
  padding: 6px 16px; border-radius: 20px; cursor: pointer;
  transition: all 0.2s;
}
.filter-btn.active, .filter-btn:hover {
  background: var(--sky); color: var(--white); border-color: var(--sky);
}
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
.article-card {
  background: var(--white); border: 1px solid var(--grey-100);
  border-radius: var(--radius); overflow: hidden;
  box-shadow: var(--shadow); transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.article-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.card-thumb {
  height: 140px;
  display: flex; align-items: center; justify-content: center;
  font-size: 3rem;
}
.card-body { padding: 20px; }
.card-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 3px 10px; border-radius: 12px;
  margin-bottom: 10px;
}
.card-body h2 { font-size: 1rem; font-weight: 600; color: var(--navy); margin-bottom: 8px; line-height: 1.4; }
.card-body p { font-size: 0.85rem; color: var(--grey-500); line-height: 1.6; }
.card-read {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 14px; font-size: 0.82rem; font-weight: 600;
  color: var(--sky); text-decoration: none;
}
.card-read:hover { text-decoration: underline; }

.tag-empleo      { background: #EBF2FF; color: #1D4ED8; }
.tag-sueldo      { background: #F0FDF4; color: #15803D; }
.tag-ahorro      { background: #FFF7ED; color: #C2410C; }
.tag-presupuesto { background: #FDF4FF; color: #7E22CE; }
.tag-fiscal      { background: #FFF1F2; color: #BE123C; }
.tag-retiro      { background: #ECFEFF; color: #0E7490; }

#article-view {
  display: none;
  position: fixed; inset: 0; z-index: 200;
  background: var(--white); overflow-y: auto;
}
.article-nav {
  background: var(--white); padding: 14px 24px;
  display: flex; align-items: center; gap: 16px;
  position: sticky; top: 0; z-index: 201;
  border-bottom: 1px solid var(--grey-100);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.back-btn {
  background: none; border: none; cursor: pointer;
  color: var(--navy); font-size: 0.9rem; font-weight: 500;
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-body);
}
.back-btn:hover { color: var(--sky); }
.article-content {
  max-width: 760px; margin: 0 auto; padding: 48px 24px 80px;
}
.article-content .art-tag {
  display: inline-block; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 14px; margin-bottom: 16px;
}
.article-content h1 {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  color: var(--navy); line-height: 1.2; margin-bottom: 16px;
}
.article-meta { font-size: 0.82rem; color: var(--grey-500); margin-bottom: 32px; }
.article-body h2 {
  font-family: var(--font-display);
  font-size: 1.35rem; color: var(--navy);
  margin: 36px 0 12px; padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
}
.article-body h3 { font-size: 1.05rem; color: var(--slate); margin: 24px 0 8px; }
.article-body p { margin-bottom: 16px; color: var(--grey-700); line-height: 1.8; }
.article-body ul, .article-body ol { padding-left: 22px; margin-bottom: 16px; }
.article-body li { margin-bottom: 8px; color: var(--grey-700); line-height: 1.7; }
.article-body strong { color: var(--navy); }
.tip-box {
  background: var(--sky-light); border-left: 4px solid var(--sky);
  border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 24px 0;
}
.tip-box p { margin: 0; color: var(--slate); font-size: 0.95rem; }
.related-articles {
  margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--grey-100);
}
.related-articles h3 { font-size: 1rem; font-weight: 600; color: var(--navy); margin-bottom: 16px; }
.related-list { display: flex; gap: 12px; flex-wrap: wrap; }
.related-link {
  background: var(--grey-50); border: 1px solid var(--grey-100);
  border-radius: 8px; padding: 10px 16px;
  font-size: 0.85rem; color: var(--sky); text-decoration: none;
  font-weight: 500;
}
.related-link:hover { background: var(--sky-light); }

.ad-slot {
  text-align: center; padding: 16px 0; color: var(--grey-300);
  font-size: 0.75rem; border: 1px dashed var(--grey-300);
  border-radius: 6px; margin: 28px 0;
}

#page-view {
  display: none;
  position: fixed; inset: 0; z-index: 200;
  background: var(--white); overflow-y: auto;
}
.page-content {
  max-width: 760px; margin: 0 auto; padding: 48px 24px 80px;
}
.page-content h1 {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4vw, 2.2rem);
  color: var(--navy); margin-bottom: 24px;
}
.page-content h2 { font-size: 1.15rem; color: var(--slate); margin: 28px 0 10px; font-weight: 600; }
.page-content p { color: var(--grey-700); margin-bottom: 14px; line-height: 1.8; }
.page-content ul { padding-left: 20px; margin-bottom: 14px; }
.page-content li { color: var(--grey-700); margin-bottom: 6px; line-height: 1.7; }
.page-content a { color: var(--sky); }

footer {
  background: var(--grey-50); color: var(--grey-700);
  border-top: 1px solid var(--grey-100);
  padding: 48px 24px 24px;
}
.footer-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px;
  margin-bottom: 32px;
}
.footer-brand { grid-column: span 1; }
.footer-logo {
  font-family: var(--font-display); color: var(--text);
  font-size: 1.1rem; margin-bottom: 10px; display: block;
}
.footer-logo span { color: var(--navy); }
.footer-desc { font-size: 0.85rem; line-height: 1.6; color: var(--grey-500); }
.footer-col h4 { color: var(--text); font-size: 0.88rem; font-weight: 600; margin-bottom: 14px; }
.footer-col ul { list-style: none; }
.footer-col li { margin-bottom: 8px; }
.footer-col a { color: var(--grey-500); text-decoration: none; font-size: 0.85rem; }
.footer-col a:hover { color: var(--navy); }
.footer-bottom {
  max-width: 1100px; margin: 0 auto;
  border-top: 1px solid var(--grey-300);
  padding-top: 20px; font-size: 0.8rem; color: var(--grey-500);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;
}

#cookie-banner {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;
  background: var(--white); color: var(--text);
  padding: 18px 24px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; flex-wrap: wrap;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
  border-top: 2px solid var(--grey-100);
}
#cookie-banner p { font-size: 0.85rem; max-width: 680px; color: var(--grey-700); }
#cookie-banner a { color: var(--navy); }
.cookie-btns { display: flex; gap: 10px; flex-shrink: 0; }
.btn-accept {
  background: var(--navy); color: var(--white);
  border: none; font-family: var(--font-body); font-weight: 600;
  font-size: 0.85rem; padding: 9px 20px; border-radius: 7px;
  cursor: pointer;
}
.btn-reject {
  background: none; color: var(--grey-500);
  border: 1px solid var(--grey-300);
  font-family: var(--font-body); font-size: 0.85rem;
  padding: 9px 20px; border-radius: 7px; cursor: pointer;
}

.modal-overlay {
  display: none; position: fixed; inset: 0; z-index: 500;
  background: rgba(0,0,0,0.5); align-items: center; justify-content: center;
}
.modal-overlay.open { display: flex; }
.modal-box {
  background: var(--white); border-radius: var(--radius);
  max-width: 640px; width: 92%; max-height: 80vh;
  overflow-y: auto; padding: 32px;
  box-shadow: var(--shadow-md);
}
.modal-close {
  float: right; background: none; border: none;
  font-size: 1.2rem; cursor: pointer; color: var(--grey-500);
}
.modal-box h2 { font-family: var(--font-display); color: var(--navy); margin-bottom: 16px; font-size: 1.4rem; }
.modal-box p, .modal-box li { font-size: 0.9rem; color: var(--grey-700); line-height: 1.7; margin-bottom: 10px; }
.modal-box ul { padding-left: 18px; }

@media (max-width: 768px) {
  .nav-links, .nav-search { display: none; }
  .burger { display: block; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: span 2; }
  .articles-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .footer-inner { grid-template-columns: 1fr; }
  .footer-brand { grid-column: span 1; }
}
`;

const ARTICLES = [
  {
    id: 1,
    category: 'empleo',
    tag: 'Primer Empleo',
    tagClass: 'tag-empleo',
    icon: '💼',
    color: '#EBF2FF',
    title: 'Cómo entender tu primer contrato de trabajo: lo que nadie te explica',
    excerpt: 'Antes de firmar cualquier papel, debes saber qué estás aceptando. Te explicamos cada cláusula importante.',
    related: [2, 3, 4],
    content: `
      <span class="art-tag tag-empleo">Primer Empleo</span>
      <h1>Cómo entender tu primer contrato de trabajo: lo que nadie te explica</h1>
      <p class="article-meta">Por Robert Julian Delgado Alfaro · Provinet Empresas Finanzas Joven · Lectura: 8 min</p>
      <div class="article-body">
        <p>Firmar tu primer contrato de trabajo es uno de los momentos más importantes de tu vida económica. Sin embargo, la mayoría de los jóvenes lo hacen sin leer más de tres líneas. El resultado: sorpresas desagradables semanas después. En este artículo te enseñamos a leer un contrato de trabajo como lo haría alguien que sabe lo que está firmando.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
        <h2>¿Por qué es tan importante leer el contrato?</h2>
        <p>Un contrato de trabajo es un documento legal vinculante. Cuando lo firmas, estás aceptando una serie de condiciones que pueden afectar tu salario, tus horarios, tus vacaciones y hasta lo que puedes hacer fuera del trabajo. No leerlo equivale a aceptar condiciones que podrías desconocer durante meses o años.</p>
        <p>Los empleadores están acostumbrados a que los candidatos firmen rápido porque quieren el trabajo. Tú tienes todo el derecho de pedir tiempo para leerlo con calma, incluso llevártelo a casa y revisarlo al día siguiente. Ningún empleador serio debe negarse a esto.</p>
        <h2>Las cláusulas que más te importan</h2>
        <h3>1. Tipo de contrato</h3>
        <p>Existen contratos por tiempo determinado (tienen fecha de fin), por tiempo indeterminado (no tienen fecha de fin) y por obra o proyecto. Los contratos temporales no son ilegales, pero sí debes saber que tu empleo puede acabar en una fecha concreta. Un contrato indefinido te da más estabilidad y, en muchos países, más derechos ante un despido.</p>
        <h3>2. Salario: bruto vs. neto</h3>
        <p>El número que te dicen en la entrevista ("ganarás X") casi siempre es el salario <strong>bruto</strong>, antes de deducciones. El salario neto es lo que realmente recibirás en tu cuenta. Las deducciones más comunes incluyen: impuesto sobre la renta, seguridad social o aportes al sistema de salud y pensiones. La diferencia entre bruto y neto puede ser significativa, a veces entre el 15% y el 30% dependiendo del país y del ingreso.</p>
        <div class="tip-box">
          <p>💡 <strong>Consejo práctico:</strong> Antes de aceptar una oferta, pregunta cuánto es el salario neto mensual que recibirás en tu cuenta bancaria. No el bruto. Es tu derecho saberlo antes de firmar.</p>
        </div>
        <h3>3. Jornada y horario</h3>
        <p>El contrato debe especificar cuántas horas trabajarás por semana y en qué horario. Si te piden flexibilidad total sin límite de horas, desconfía. Hay un máximo legal de horas de trabajo en la mayoría de los países, y las horas extras deben tener un pago adicional establecido por ley o por acuerdo.</p>
        <h3>4. Vacaciones y días libres</h3>
        <p>¿Cuántos días de vacaciones tendrás? ¿Cuándo puedes tomarlos? ¿Hay días festivos pagados? Estas condiciones deben estar en el contrato o en la política interna de la empresa que el contrato mencione. Si no aparecen, pregunta antes de firmar.</p>
        <h3>5. Cláusula de confidencialidad</h3>
        <p>Es normal que un contrato te pida no compartir información confidencial de la empresa con terceros. Sin embargo, si la cláusula es excesivamente amplia (por ejemplo, que no puedas trabajar en ninguna empresa del mismo sector durante años después de irte), debes evaluarla con cuidado. Estas cláusulas de no competencia tienen límites legales.</p>
        <h3>6. Período de prueba</h3>
        <p>Muchos contratos incluyen un período de prueba (por ejemplo, 3 meses) durante el cual tanto tú como el empleador pueden terminar la relación con más facilidad. Asegúrate de saber cuánto dura, cuáles son tus derechos durante ese período y qué pasa al terminarlo.</p>
        <h2>Señales de alerta en un contrato</h2>
        <ul>
          <li>Salario variable sin garantías mínimas escritas.</li>
          <li>Horas de trabajo indefinidas o "las que la empresa requiera".</li>
          <li>Cláusulas de exclusividad que te impidan tener otros ingresos sin permiso.</li>
          <li>Ausencia de fecha de inicio o de duración del contrato temporal.</li>
          <li>Menciones a "remuneración en especie" sin especificar el valor.</li>
        </ul>
        <h2>Tu derecho a negociar</h2>
        <p>Una oferta de trabajo no es una imposición. Puedes preguntar, negociar y pedir cambios. Si hay algo que no te convence, expónlo con educación y claridad. Lo peor que pueden decirte es que no, y eso te da información valiosa sobre el tipo de empleador con el que tratas.</p>
        <p>Si el empleador se molesta porque lees el contrato o haces preguntas, eso ya te dice mucho sobre cómo te tratará como empleado.</p>
        <h2>Conclusión</h2>
        <p>Tu primer contrato de trabajo marca el inicio de tu vida profesional y económica. Leerlo con calma, entender cada sección y aclarar dudas antes de firmar no es desconfianza: es inteligencia financiera. Guarda siempre una copia firmada del contrato en un lugar seguro. Esa hoja puede protegerte en el futuro.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
      </div>
    `
  },
  {
    id: 2,
    category: 'sueldo',
    tag: 'Tu Sueldo',
    tagClass: 'tag-sueldo',
    icon: '💵',
    color: '#F0FDF4',
    title: 'La regla 50/30/20: cómo dividir tu sueldo sin complicaciones',
    excerpt: 'Un método sencillo y comprobado para que tu salario alcance para todo lo que necesitas y también para lo que quieres.',
    related: [3, 5, 1],
    content: `
      <span class="art-tag tag-sueldo">Tu Sueldo</span>
      <h1>La regla 50/30/20: cómo dividir tu sueldo sin complicaciones</h1>
      <p class="article-meta">Por Robert Julian Delgado Alfaro · Provinet Empresas Finanzas Joven · Lectura: 7 min</p>
      <div class="article-body">
        <p>Una de las preguntas más frecuentes entre jóvenes que reciben su primer sueldo es: ¿en qué lo gasto primero? La regla 50/30/20 es una de las guías más usadas en el mundo para responder exactamente esa pregunta. No requiere una hoja de cálculo elaborada ni conocimientos avanzados. Solo honestidad con uno mismo y disciplina.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
        <h2>¿Qué es la regla 50/30/20?</h2>
        <p>Es un modelo de distribución del ingreso popularizado por la economista Elizabeth Warren. La idea es simple: divide tu ingreso neto mensual en tres grandes bloques.</p>
        <ul>
          <li><strong>50%</strong> para necesidades básicas</li>
          <li><strong>30%</strong> para deseos o gastos personales</li>
          <li><strong>20%</strong> para ahorro y metas financieras</li>
        </ul>
        <h2>El 50%: necesidades básicas</h2>
        <p>Este bloque cubre todo lo que <em>tienes</em> que pagar para vivir y trabajar. Si no lo pagas, tu vida se complica inmediatamente. Entre estos gastos están:</p>
        <ul>
          <li>Alquiler o cuota de hipoteca</li>
          <li>Alimentación básica (mercado, no restaurantes)</li>
          <li>Transporte al trabajo</li>
          <li>Servicios básicos (agua, luz, internet)</li>
          <li>Salud (seguro médico, medicamentos)</li>
        </ul>
        <p>Si este bloque supera el 50% de tu ingreso, hay dos caminos: reducir gastos fijos (por ejemplo, vivir en un lugar más económico) o buscar aumentar tus ingresos.</p>
        <div class="tip-box">
          <p>💡 <strong>Ejemplo real:</strong> Si ganas $400 al mes, tu tope de necesidades es $200. Si solo el alquiler te cuesta $220, necesitas ajustar algo: buscar roomies, mudar a un lugar más económico, o aumentar ingresos.</p>
        </div>
        <h2>El 30%: deseos personales</h2>
        <p>Aquí entra todo lo que quieres pero no necesitas para sobrevivir: salir a comer, suscripciones de streaming, ropa de moda, hobbies, viajes. Este bloque no es el enemigo. Gastar en lo que disfrutas es parte de una vida equilibrada. El problema es cuando este bloque se come el de necesidades o el de ahorro.</p>
        <h2>El 20%: ahorro y metas</h2>
        <p>Este es el bloque que más jóvenes omiten, y el que más diferencia hace a largo plazo. Incluye:</p>
        <ul>
          <li>Fondo de emergencia (prioridad máxima al principio)</li>
          <li>Ahorro para metas específicas (viaje, auto, estudios)</li>
          <li>Aportes a planes de retiro o pensión</li>
          <li>Pago de deudas por encima del mínimo</li>
        </ul>
        <h2>Cómo aplicar la regla desde el primer cobro</h2>
        <p>El día que recibes tu sueldo, antes de gastar nada, transfiere el 20% destinado al ahorro a una cuenta separada. No lo veas como "lo que sobra al final del mes" porque, si lo dejas para el final, nunca sobra. Págate a ti mismo primero.</p>
        <h2>Conclusión</h2>
        <p>La regla 50/30/20 no es perfecta, pero es un punto de partida sólido para cualquier joven que quiera tomar el control de su dinero sin volverse loco con planillas. Pruébala durante tres meses y ajusta según tu realidad.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
      </div>
    `
  },
  {
    id: 3,
    category: 'ahorro',
    tag: 'Ahorro',
    tagClass: 'tag-ahorro',
    icon: '🏦',
    color: '#FFF7ED',
    title: 'Fondo de emergencia: qué es, cuánto necesitas y cómo construirlo',
    excerpt: 'El fondo de emergencia es la base de toda vida financiera estable. Sin él, cualquier imprevisto puede desestabilizarte por completo.',
    related: [2, 4, 6],
    content: `
      <span class="art-tag tag-ahorro">Ahorro</span>
      <h1>Fondo de emergencia: qué es, cuánto necesitas y cómo construirlo</h1>
      <p class="article-meta">Por Robert Julian Delgado Alfaro · Provinet Empresas Finanzas Joven · Lectura: 9 min</p>
      <div class="article-body">
        <p>Imagina que mañana tu teléfono se rompe por completo y necesitas comprarte otro para trabajar. O que te despiden sin previo aviso. O que tienes que pagar una consulta médica urgente. ¿Tienes ese dinero disponible ahora mismo? Si la respuesta es no, necesitas un fondo de emergencia.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
        <h2>¿Qué es un fondo de emergencia?</h2>
        <p>Es una reserva de dinero líquido —es decir, de acceso inmediato— destinada exclusivamente a cubrir gastos imprevistos o urgentes. No es un ahorro para vacaciones, ni para comprarte algo que deseas. Es un escudo financiero. La palabra clave es <strong>liquidez</strong>: el dinero debe estar accesible en horas, no en días ni semanas.</p>
        <h2>¿Cuánto dinero debe tener?</h2>
        <p>La recomendación estándar es que tu fondo de emergencia cubra entre <strong>3 y 6 meses de tus gastos esenciales</strong>. Gastos esenciales, no ingresos: es el monto que necesitas para pagar alquiler, comida, transporte y servicios básicos durante ese período.</p>
        <div class="tip-box">
          <p>💡 <strong>Ejemplo:</strong> Si tus gastos mensuales básicos son $300, necesitas un fondo de entre $900 (3 meses) y $1.800 (6 meses). Si eres trabajador independiente, apunta a los 6 meses; si tienes empleo estable, 3 meses puede ser suficiente.</p>
        </div>
        <h2>Cómo construirlo desde cero paso a paso</h2>
        <h3>Paso 1: Calcula tu meta</h3>
        <p>Suma todos tus gastos esenciales mensuales. Multiplica ese número por 3. Ese es tu objetivo mínimo.</p>
        <h3>Paso 2: Abre una cuenta separada</h3>
        <p>El fondo de emergencia debe estar en una cuenta diferente a la que usas en el día a día. Si está mezclado con tu dinero corriente, lo gastarás sin darte cuenta.</p>
        <h3>Paso 3: Define cuánto depositas cada mes</h3>
        <p>No tienes que llegar a tu meta en un mes. Lo importante es ser consistente. Si puedes destinar $30 al mes, llegarás a tu meta gradualmente. Usa una parte del 20% de ahorro de la regla 50/30/20 para esto.</p>
        <h3>Paso 4: Automatiza si puedes</h3>
        <p>Si tu banco lo permite, programa una transferencia automática el día que cobras. El hábito se construye solo.</p>
        <h3>Paso 5: No lo toques (salvo emergencias reales)</h3>
        <p>Una emergencia real es: perder el trabajo, enfermedad, accidente, daño importante. <strong>No es una emergencia</strong>: una venta irresistible de ropa o salir más de lo presupuestado.</p>
        <h2>Conclusión</h2>
        <p>El fondo de emergencia es aburrido. No produce grandes retornos ni genera emoción. Pero es la diferencia entre una emergencia que te estresa y una emergencia que te destruye financieramente. Constrúyelo antes que cualquier otra meta.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
      </div>
    `
  },
  {
    id: 4,
    category: 'presupuesto',
    tag: 'Presupuesto',
    tagClass: 'tag-presupuesto',
    icon: '📊',
    color: '#FDF4FF',
    title: 'Cómo hacer un presupuesto mensual que realmente funcione',
    excerpt: 'No basta con anotar los gastos. Un buen presupuesto te dice a dónde va tu dinero antes de que llegue allí.',
    related: [2, 3, 5],
    content: `
      <span class="art-tag tag-presupuesto">Presupuesto</span>
      <h1>Cómo hacer un presupuesto mensual que realmente funcione</h1>
      <p class="article-meta">Por Robert Julian Delgado Alfaro · Provinet Empresas Finanzas Joven · Lectura: 9 min</p>
      <div class="article-body">
        <p>La mayoría de las personas que dicen "no me alcanza el dinero" no tienen un problema de ingresos: tienen un problema de planificación. Un presupuesto mensual no es un registro de lo que ya gastaste (eso es un historial), sino un plan de lo que vas a gastar. La diferencia es enorme.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
        <h2>Por qué fallan la mayoría de los presupuestos</h2>
        <p>Los presupuestos fracasan por tres razones principales: son demasiado rígidos y no dejan margen para lo inesperado; no se actualizan cuando cambia la situación; o se crean con buenas intenciones y se abandonan a los tres días.</p>
        <h2>Paso 1: Conoce tu ingreso neto real</h2>
        <p>El punto de partida es saber con exactitud cuánto dinero entra cada mes. No el bruto, sino el neto. Si tu ingreso es variable, calcula un promedio de los últimos 3 meses y usa el más bajo como referencia.</p>
        <h2>Paso 2: Lista todos tus gastos fijos</h2>
        <p>Los gastos fijos son los que pagas todos los meses por el mismo monto: alquiler, internet, suscripciones, deudas con cuota mensual. Suma todos y anota el total. Este número es tu piso mensual.</p>
        <h2>Paso 3: Estima tus gastos variables</h2>
        <p>Los gastos variables cambian cada mes: comida, transporte, ropa, entretenimiento. Revisa tus últimos 2 o 3 meses y calcula el promedio por categoría.</p>
        <div class="tip-box">
          <p>💡 <strong>Consejo:</strong> No te sorprendas si ves categorías donde gastaste mucho más de lo que creías. Eso es exactamente el valor del ejercicio: ver la realidad, no la versión idealizada de tus gastos.</p>
        </div>
        <h2>Paso 4: Compara ingresos vs. gastos totales</h2>
        <p>Suma todos tus gastos fijos y variables. Compara ese número con tu ingreso neto. Si gastas más de lo que ganas, necesitas identificar qué gastos puedes reducir de inmediato.</p>
        <h2>Paso 5: Asigna un presupuesto a cada categoría</h2>
        <p>Establece un límite mensual para cada categoría de gasto variable. Recuerda: dentro del presupuesto debe haber una partida para ahorro. El ahorro no es "lo que sobra al final"; es una categoría igual de importante que el alquiler.</p>
        <h2>Paso 6: Revisa y ajusta al final de cada mes</h2>
        <p>Compara lo que planeaste con lo que realmente pasó. ¿Superaste alguna categoría? Usa esa información para ajustar el presupuesto del mes siguiente. Un presupuesto es un documento vivo, no una sentencia.</p>
        <h2>Conclusión</h2>
        <p>La libertad financiera real empieza por saber a dónde va cada peso, bolívar o dólar que entra a tu vida. Cuando tienes un presupuesto, disfrutas el gasto en ocio sin culpa porque está planificado.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
      </div>
    `
  },
  {
    id: 5,
    category: 'fiscal',
    tag: 'Fiscal',
    tagClass: 'tag-fiscal',
    icon: '📋',
    color: '#FFF1F2',
    title: 'Impuestos para jóvenes: qué debes saber antes de cobrar tu primer sueldo',
    excerpt: 'Entender el sistema fiscal desde el inicio te evitará sorpresas, multas y confusiones que pueden costarte caro.',
    related: [1, 2, 6],
    content: `
      <span class="art-tag tag-fiscal">Fiscal</span>
      <h1>Impuestos para jóvenes: qué debes saber antes de cobrar tu primer sueldo</h1>
      <p class="article-meta">Por Robert Julian Delgado Alfaro · Provinet Empresas Finanzas Joven · Lectura: 8 min</p>
      <div class="article-body">
        <p>Los impuestos son inevitables, pero no tienen por qué ser confusos. La mayoría de los jóvenes llegan a su primer trabajo sin saber nada sobre el sistema fiscal, y esto puede generar sorpresas desagradables: desde descuentos en el sueldo que no esperaban hasta obligaciones que desconocían. En este artículo te explicamos lo básico que necesitas entender.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
        <h2>¿Qué son los impuestos y por qué los pago?</h2>
        <p>Los impuestos son pagos obligatorios que hacemos al Estado para financiar servicios públicos: salud, educación, seguridad, infraestructura. Cuando empiezas a trabajar y a generar ingresos, te conviertes en contribuyente. Esto significa que tienes derechos pero también obligaciones fiscales que cumplir.</p>
        <h2>El impuesto sobre la renta: qué es y cómo funciona</h2>
        <p>El impuesto sobre la renta (ISR o ISLR según el país) grava tus ingresos. La forma más común para los trabajadores dependientes es que tu empleador lo retenga directamente de tu sueldo antes de pagarte. Por eso el sueldo neto que recibes es menor que el bruto.</p>
        <p>La mayoría de los sistemas fiscales tienen tasas progresivas: quien gana más, paga un porcentaje mayor. Si tu salario es bajo, es posible que no llegues al umbral mínimo para pagar ISR.</p>
        <div class="tip-box">
          <p>💡 <strong>Clave:</strong> Pídele a tu empleador o al departamento de recursos humanos que te explique exactamente qué retenciones te hacen y por qué. Tienes derecho a saberlo.</p>
        </div>
        <h2>Aportes a seguridad social y pensiones</h2>
        <p>Además del impuesto sobre la renta, casi todos los sistemas laborales incluyen aportes obligatorios a la seguridad social para salud, pensiones y desempleo. Estos descuentos también salen de tu sueldo bruto. En Venezuela, los aportes incluyen el Seguro Social Obligatorio (SSO), la Ley de Política Habitacional y el INCES, entre otros.</p>
        <h2>Trabajadores independientes: más responsabilidad fiscal</h2>
        <p>Si trabajas como freelance o por cuenta propia, eres tú quien debe gestionar tu declaración fiscal. Nadie te retiene impuestos automáticamente, pero eso no significa que no debas pagarlos. Debes guardar tus comprobantes de ingreso, llevar un registro básico de lo que ganas y declarar periódicamente ante la autoridad fiscal.</p>
        <h2>Qué documentos debes conservar</h2>
        <ul>
          <li>Recibos de sueldo o nóminas mensuales</li>
          <li>Comprobantes de retenciones de impuesto</li>
          <li>Declaraciones de impuesto si aplica</li>
          <li>Facturas de gastos deducibles (si eres independiente)</li>
        </ul>
        <h2>Errores fiscales comunes en jóvenes</h2>
        <ul>
          <li>No declarar ingresos extra (trabajos adicionales, freelance).</li>
          <li>No guardar comprobantes de pagos y retenciones.</li>
          <li>Ignorar las fechas límite de declaración.</li>
          <li>Confundir el sueldo bruto con el neto al calcular ingresos.</li>
        </ul>
        <h2>Conclusión</h2>
        <p>No necesitas ser experto en impuestos, pero sí entender los conceptos básicos que afectan tu bolsillo desde el primer día de trabajo. Si tienes dudas específicas sobre tu situación fiscal, consulta a un contador o asesor fiscal. Conocer tus obligaciones te protege y te da control sobre tus finanzas.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
      </div>
    `
  },
  {
    id: 6,
    category: 'retiro',
    tag: 'Retiro',
    tagClass: 'tag-retiro',
    icon: '🎯',
    color: '#ECFEFF',
    title: 'Independencia financiera: cómo empezar a planificarla desde los 20 años',
    excerpt: 'No se trata de hacerse rico rápido. La independencia financiera se construye con pequeñas decisiones consistentes desde temprano.',
    related: [2, 3, 4],
    content: `
      <span class="art-tag tag-retiro">Retiro</span>
      <h1>Independencia financiera: cómo empezar a planificarla desde los 20 años</h1>
      <p class="article-meta">Por Robert Julian Delgado Alfaro · Provinet Empresas Finanzas Joven · Lectura: 8 min</p>
      <div class="article-body">
        <p>La independencia financiera no significa ser millonario. Significa llegar a un punto en que tus activos y ahorros generan suficientes ingresos para cubrir tus gastos sin depender de un empleo. Puede sonar lejano a los 20 años, pero la matemática del interés compuesto hace que empezar temprano sea la ventaja más poderosa que existe.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
        <h2>¿Qué es la independencia financiera?</h2>
        <p>La independencia financiera (IF) es el estado en que ya no dependes de trabajar para vivir. Tus inversiones, rentas u otras fuentes pasivas de ingreso cubren todos tus gastos. El concepto no implica no trabajar: muchas personas con IF siguen trabajando, pero por elección, no por necesidad.</p>
        <h2>El poder del interés compuesto: por qué los 20 años son el mejor momento</h2>
        <p>El interés compuesto es la capacidad de tu dinero de generar más dinero sobre sí mismo. Si inviertes $100 con un rendimiento del 8% anual, al año tienes $108. El segundo año, ese 8% se aplica sobre $108, no sobre $100. La diferencia parece pequeña al principio, pero a lo largo de décadas se vuelve enorme.</p>
        <div class="tip-box">
          <p>💡 <strong>Ejemplo:</strong> Si empiezas a los 25 años ahorrando $50 al mes con un rendimiento promedio del 7% anual, a los 65 tendrás aproximadamente $131.000. Si esperas hasta los 35 para hacer lo mismo, llegarás a los 65 con unos $61.000. Diez años de diferencia equivalen a más del doble de resultado.</p>
        </div>
        <h2>Los tres pilares de la independencia financiera</h2>
        <h3>1. Gastar menos de lo que ganas</h3>
        <p>La tasa de ahorro es el factor más poderoso. Si ahorras el 10% de tu sueldo, necesitarás unos 40 años para ser financieramente independiente. Si ahorras el 50%, puedes lograrlo en menos de 20. No tienes que llegar al 50%, pero aumentar gradualmente tu tasa de ahorro acelera el proceso significativamente.</p>
        <h3>2. Invertir el excedente</h3>
        <p>El dinero guardado en una cuenta corriente pierde valor con la inflación. El camino a la IF requiere invertir: fondos indexados, bienes raíces, planes de pensiones. El objetivo es que tu dinero trabaje para ti mientras duermes.</p>
        <h3>3. Aumentar tus ingresos</h3>
        <p>Ahorrar más es importante, pero hay un límite a cuánto puedes recortar gastos. Aumentar tus ingresos no tiene límite teórico: ascensos, freelance, emprendimiento, habilidades nuevas. Cada dólar extra que ganas y no gastas es un dólar que puede ir a construir tu libertad financiera.</p>
        <h2>La regla del 4%: cuánto necesitas para retirarte</h2>
        <p>La "regla del 4%" dice que puedes retirar el 4% de tus inversiones anuales indefinidamente sin agotar el capital. Esto significa que si tus gastos anuales son $12.000, necesitas $300.000 invertidos para ser financieramente independiente. Saber tu número objetivo hace el camino más concreto.</p>
        <h2>Cómo empezar hoy con lo que tienes</h2>
        <ul>
          <li>Construye primero tu fondo de emergencia.</li>
          <li>Elimina deudas de alto interés.</li>
          <li>Comienza a ahorrar e invertir aunque sea pequeñas cantidades.</li>
          <li>Edúcate continuamente sobre finanzas personales e inversión.</li>
          <li>Aumenta tu tasa de ahorro cada vez que sube tu ingreso.</li>
        </ul>
        <h2>Conclusión</h2>
        <p>La independencia financiera no es un sueño de ricos. Es un objetivo matemático que depende de tus decisiones diarias de ahorro e inversión. Empezar a los 20 años, aunque sea con poco, te da la ventaja más valiosa: el tiempo. Cada mes que pasa sin comenzar es una oportunidad que no vuelve.</p>
        <div class="ad-slot">[ Espacio publicitario ]</div>
      </div>
    `
  }
];

const HTML = `
<div id="cookie-banner">
  <p>Usamos cookies propias y de terceros (incluida publicidad de Google) para mejorar tu experiencia. Lee nuestra <a href="#" onclick="event.preventDefault();openModal('privacidad')">Política de Privacidad</a> y <a href="#" onclick="event.preventDefault();openModal('cookies')">Política de Cookies</a>.</p>
  <div class="cookie-btns">
    <button class="btn-accept" onclick="acceptCookies()">Aceptar</button>
    <button class="btn-reject" onclick="rejectCookies()">Rechazar</button>
  </div>
</div>

<div class="modal-overlay" id="modal-privacidad">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('privacidad')">✕</button>
    <h2>Política de Privacidad</h2>
    <p><strong>Responsable:</strong> Robert Julian Delgado Alfaro — Provinet Empresas Finanzas Joven<br>
    <strong>Contacto:</strong> provinetempresasfinanzasjoven@gmail.com</p>
    <p>Este sitio web recopila únicamente los datos estrictamente necesarios para su funcionamiento. No se solicitan datos personales mediante formularios de registro.</p>
    <p><strong>Publicidad de terceros:</strong> Utilizamos Google AdSense para mostrar anuncios. Google puede usar cookies para mostrar anuncios relevantes a los usuarios según sus visitas previas a este u otros sitios web. Puedes desactivar el uso de estas cookies visitando <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">google.com/settings/ads</a>.</p>
    <p><strong>Cookies:</strong> Usamos cookies de sesión y de terceros (Google Analytics / AdSense). Ver Política de Cookies para más detalle.</p>
    <p><strong>Derechos:</strong> Tienes derecho a acceder, rectificar y eliminar tus datos. Puedes ejercerlos escribiéndonos a nuestro correo de contacto.</p>
    <p><strong>Última actualización:</strong> Junio 2025.</p>
  </div>
</div>

<div class="modal-overlay" id="modal-cookies">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('cookies')">✕</button>
    <h2>Política de Cookies</h2>
    <p>Una cookie es un pequeño archivo de texto que un sitio web guarda en tu dispositivo. Este sitio utiliza los siguientes tipos:</p>
    <ul>
      <li><strong>Cookies técnicas:</strong> necesarias para el funcionamiento básico del sitio (guardar preferencia de cookies).</li>
      <li><strong>Cookies analíticas:</strong> Google Analytics para medir el tráfico de forma anónima.</li>
      <li><strong>Cookies publicitarias:</strong> Google AdSense para mostrar anuncios personalizados o genéricos según tu configuración.</li>
    </ul>
    <p>Puedes aceptar, rechazar o configurar las cookies en cualquier momento desde el banner de consentimiento. Rechazar las cookies publicitarias no impedirá que veas anuncios, pero estos serán genéricos y no personalizados.</p>
    <p><strong>Más información:</strong> <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Política de publicidad de Google</a>.</p>
  </div>
</div>

<div class="modal-overlay" id="modal-legal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('legal')">✕</button>
    <h2>Aviso Legal</h2>
    <p><strong>Titular:</strong> Robert Julian Delgado Alfaro<br>
    <strong>Proyecto:</strong> Provinet Empresas Finanzas Joven<br>
    <strong>Contacto:</strong> provinetempresasfinanzasjoven@gmail.com</p>
    <p>El contenido de este sitio tiene fines exclusivamente informativos y educativos. La información publicada no constituye asesoramiento financiero, legal ni fiscal personalizado. Antes de tomar decisiones económicas importantes, consulta con un profesional certificado.</p>
    <p>Nos esforzamos por mantener la información actualizada y verificada, pero no garantizamos su exactitud en todo momento. El sitio puede contener enlaces a terceros; no somos responsables de sus contenidos.</p>
    <p><strong>Política editorial:</strong> Los artículos son redactados por el equipo de Provinet Empresas Finanzas Joven con base en investigación de fuentes públicas verificables. No publicamos contenido patrocinado sin indicarlo expresamente.</p>
  </div>
</div>

<div class="modal-overlay" id="modal-sobre">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('sobre')">✕</button>
    <h2>Sobre Nosotros</h2>
    <p>Somos <strong>Provinet Empresas Finanzas Joven</strong>, un proyecto editorial independiente creado por <strong>Robert Julian Delgado Alfaro</strong> con una misión clara: que ningún joven tenga que enfrentarse solo a las finanzas personales.</p>
    <p>Sabemos lo que se siente recibir el primer sueldo y no saber qué hacer con él. Por eso creamos este espacio: guías prácticas, honestas y sin tecnicismos, escritas para jóvenes venezolanos que quieren tomar el control de su vida económica.</p>
    <p>Nuestro contenido está basado en investigación real, fuentes verificables y experiencia concreta. No somos un banco ni una institución financiera. Somos un equipo comprometido con la educación financiera accesible.</p>
    <p><strong>Contacto:</strong> provinetempresasfinanzasjoven@gmail.com</p>
  </div>
</div>

<div class="modal-overlay" id="modal-contacto">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('contacto')">✕</button>
    <h2>Contacto</h2>
    <p>¿Tienes una pregunta, sugerencia o quieres proponer un tema para un artículo? Escríbenos directamente.</p>
    <p>📧 <strong><a href="mailto:provinetempresasfinanzasjoven@gmail.com">provinetempresasfinanzasjoven@gmail.com</a></strong></p>
    <p>Respondemos en un plazo de 24 a 48 horas hábiles. No gestionamos consultas de asesoría financiera personalizada, pero con gusto te orientamos hacia los recursos más útiles.</p>
    <p>Proyecto: Provinet Empresas Finanzas Joven<br>Venezuela — disponible en toda América Latina.</p>
  </div>
</div>

<nav>
  <div class="nav-inner">
    <a class="nav-logo" href="#" onclick="event.preventDefault();showHome()">
      <span>Provinet</span> Empresas Finanzas Joven
    </a>
    <ul class="nav-links">
      <li><a href="#" onclick="event.preventDefault();showHome()">Inicio</a></li>
      <li><a href="#" onclick="event.preventDefault();filterCategory('empleo')">Primer Empleo</a></li>
      <li><a href="#" onclick="event.preventDefault();filterCategory('sueldo')">Tu Sueldo</a></li>
      <li><a href="#" onclick="event.preventDefault();filterCategory('ahorro')">Ahorro</a></li>
      <li><a href="#" onclick="event.preventDefault();filterCategory('presupuesto')">Presupuesto</a></li>
      <li><a href="#" onclick="event.preventDefault();filterCategory('fiscal')">Fiscal</a></li>
      <li><a href="#" onclick="event.preventDefault();filterCategory('retiro')">Retiro</a></li>
      <li><a href="#" onclick="event.preventDefault();openModal('sobre')">Nosotros</a></li>
    </ul>
    <div class="nav-search">
      <span>🔍</span>
      <input type="search" id="searchInput" placeholder="Buscar artículos..." oninput="searchArticles(this.value)">
    </div>
    <button class="burger" onclick="toggleMobileMenu()" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div id="main-site">
  <header class="hero">
    <div class="hero-eyebrow">Educación financiera para jóvenes</div>
    <h1>Tu dinero trabaja para ti.<br><em>Aprende cómo hacerlo.</em></h1>
    <p>Guías prácticas sobre finanzas personales desde el primer empleo hasta la independencia económica. Sin tecnicismos, sin rodeos.</p>
    <a class="hero-cta" href="#articulos" onclick="event.preventDefault();document.getElementById('articulos').scrollIntoView({behavior:'smooth'})">Explorar artículos ↓</a>
  </header>

  <section class="categories">
    <div class="container">
      <h2 class="section-title">¿Qué quieres aprender hoy?</h2>
      <p class="section-sub">Elige el tema que más necesitas ahora mismo</p>
      <div class="cat-grid">
        <div class="cat-card" onclick="filterCategory('empleo')">
          <span class="cat-icon">💼</span>
          <h3>Primer Empleo</h3>
          <p>Contratos, derechos y primeros pasos</p>
        </div>
        <div class="cat-card" onclick="filterCategory('sueldo')">
          <span class="cat-icon">💵</span>
          <h3>Manejo del Sueldo</h3>
          <p>Cómo distribuir y hacer rendir tu salario</p>
        </div>
        <div class="cat-card" onclick="filterCategory('ahorro')">
          <span class="cat-icon">🏦</span>
          <h3>Ahorro Inteligente</h3>
          <p>Métodos y estrategias para ahorrar de verdad</p>
        </div>
        <div class="cat-card" onclick="filterCategory('presupuesto')">
          <span class="cat-icon">📊</span>
          <h3>Presupuesto</h3>
          <p>Planifica tus gastos mes a mes</p>
        </div>
        <div class="cat-card" onclick="filterCategory('fiscal')">
          <span class="cat-icon">📋</span>
          <h3>Obligaciones Fiscales</h3>
          <p>Impuestos y declaraciones que debes conocer</p>
        </div>
        <div class="cat-card" onclick="filterCategory('retiro')">
          <span class="cat-icon">🎯</span>
          <h3>Independencia &amp; Retiro</h3>
          <p>Planea tu futuro desde hoy</p>
        </div>
      </div>
    </div>
  </section>

  <section class="articles-section" id="articulos">
    <div class="container">
      <h2 class="section-title">Artículos</h2>
      <p class="section-sub">Contenido educativo real, sin relleno</p>
      <div class="articles-filter">
        <button class="filter-btn active" onclick="filterCategory('all', this)">Todos</button>
        <button class="filter-btn" onclick="filterCategory('empleo', this)">Primer Empleo</button>
        <button class="filter-btn" onclick="filterCategory('sueldo', this)">Tu Sueldo</button>
        <button class="filter-btn" onclick="filterCategory('ahorro', this)">Ahorro</button>
        <button class="filter-btn" onclick="filterCategory('presupuesto', this)">Presupuesto</button>
        <button class="filter-btn" onclick="filterCategory('fiscal', this)">Fiscal</button>
        <button class="filter-btn" onclick="filterCategory('retiro', this)">Retiro</button>
      </div>
      <div class="articles-grid" id="articles-grid"></div>
    </div>
  </section>
</div>

<div id="article-view">
  <div class="article-nav">
    <button class="back-btn" onclick="closeArticle()">← Volver al blog</button>
    <span style="color:var(--grey-500); font-size:0.8rem;" id="article-breadcrumb"></span>
  </div>
  <div class="article-content" id="article-content"></div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <span class="footer-logo"><span>Provinet</span> Empresas Finanzas Joven</span>
      <p class="footer-desc">Educación financiera honesta y práctica para jóvenes venezolanos. El conocimiento financiero es el mejor activo que puedes construir.</p>
    </div>
    <div class="footer-col">
      <h4>Categorías</h4>
      <ul>
        <li><a href="#" onclick="event.preventDefault();filterCategory('empleo')">Primer Empleo</a></li>
        <li><a href="#" onclick="event.preventDefault();filterCategory('sueldo')">Tu Sueldo</a></li>
        <li><a href="#" onclick="event.preventDefault();filterCategory('ahorro')">Ahorro Inteligente</a></li>
        <li><a href="#" onclick="event.preventDefault();filterCategory('presupuesto')">Presupuesto</a></li>
        <li><a href="#" onclick="event.preventDefault();filterCategory('fiscal')">Fiscal</a></li>
        <li><a href="#" onclick="event.preventDefault();filterCategory('retiro')">Retiro</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Información</h4>
      <ul>
        <li><a href="#" onclick="event.preventDefault();openModal('sobre')">Sobre Nosotros</a></li>
        <li><a href="#" onclick="event.preventDefault();openModal('contacto')">Contacto</a></li>
        <li><a href="#" onclick="event.preventDefault();openModal('privacidad')">Política de Privacidad</a></li>
        <li><a href="#" onclick="event.preventDefault();openModal('cookies')">Política de Cookies</a></li>
        <li><a href="#" onclick="event.preventDefault();openModal('legal')">Aviso Legal</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Provinet Empresas Finanzas Joven. Todos los derechos reservados.</span>
    <span>Contenido con fines educativos. No constituye asesoramiento financiero.</span>
  </div>
</footer>
`;

function renderCard(a) {
  return `
    <div class="article-card" onclick="openArticle(${a.id})" data-cat="${a.category}">
      <div class="card-thumb" style="background:${a.color}">${a.icon}</div>
      <div class="card-body">
        <span class="card-tag ${a.tagClass}">${a.tag}</span>
        <h2>${a.title}</h2>
        <p>${a.excerpt}</p>
        <a class="card-read" href="#" onclick="event.stopPropagation();event.preventDefault();openArticle(${a.id})">Leer artículo →</a>
      </div>
    </div>
  `;
}

function init() {
  function renderList(list) {
    var grid = document.getElementById('articles-grid');
    if (!grid) return;
    grid.innerHTML = list.map(renderCard).join('');
  }

  renderList(ARTICLES);

  window.openArticle = function(id) {
    var a = ARTICLES.find(function(x) { return x.id === id; });
    if (!a) return;
    var relatedHTML = '';
    if (a.related && a.related.length) {
      var links = a.related.map(function(rid) {
        var ra = ARTICLES.find(function(x) { return x.id === rid; });
        return ra
          ? '<a class="related-link" href="#" onclick="event.preventDefault();openArticle(' + ra.id + ')">' + ra.title + '</a>'
          : '';
      }).join('');
      relatedHTML = '<div class="related-articles"><h3>Artículos relacionados</h3><div class="related-list">' + links + '</div></div>';
    }
    var content = document.getElementById('article-content');
    if (content) content.innerHTML = a.content + relatedHTML;
    var breadcrumb = document.getElementById('article-breadcrumb');
    if (breadcrumb) breadcrumb.textContent = a.tag;
    var view = document.getElementById('article-view');
    var main = document.getElementById('main-site');
    if (view) { view.style.display = 'block'; view.scrollTop = 0; }
    if (main) main.style.display = 'none';
  };

  window.closeArticle = function() {
    var view = document.getElementById('article-view');
    var main = document.getElementById('main-site');
    if (view) view.style.display = 'none';
    if (main) main.style.display = 'block';
  };

  window.showHome = function() {
    if (window.closeArticle) window.closeArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.filterCategory = function(cat, btn) {
    var allBtns = document.querySelectorAll('.filter-btn');
    allBtns.forEach(function(b) { b.classList.remove('active'); });
    if (btn && btn.classList) {
      btn.classList.add('active');
    } else {
      allBtns.forEach(function(b) {
        var oc = b.getAttribute('onclick') || '';
        if (cat === 'all' && oc.indexOf("'all'") !== -1) b.classList.add('active');
        else if (cat !== 'all' && oc.indexOf("'" + cat + "'") !== -1) b.classList.add('active');
      });
    }
    var filtered = cat === 'all' ? ARTICLES : ARTICLES.filter(function(a) { return a.category === cat; });
    renderList(filtered);
    var sec = document.getElementById('articulos');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.searchArticles = function(value) {
    var q = (value || '').toLowerCase().trim();
    if (!q) { renderList(ARTICLES); return; }
    var filtered = ARTICLES.filter(function(a) {
      return a.title.toLowerCase().indexOf(q) !== -1 ||
             a.excerpt.toLowerCase().indexOf(q) !== -1 ||
             a.tag.toLowerCase().indexOf(q) !== -1;
    });
    renderList(filtered);
  };

  window.openModal = function(name) {
    var el = document.getElementById('modal-' + name);
    if (el) el.classList.add('open');
  };

  window.closeModal = function(name) {
    var el = document.getElementById('modal-' + name);
    if (el) el.classList.remove('open');
  };

  window.acceptCookies = function() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
    try { localStorage.setItem('fj-cookies', '1'); } catch(e) {}
  };

  window.rejectCookies = function() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
    try { localStorage.setItem('fj-cookies', '0'); } catch(e) {}
  };

  window.toggleMobileMenu = function() {
    var links = document.querySelector('.nav-links');
    if (!links) return;
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  };

  try {
    if (localStorage.getItem('fj-cookies') !== null) {
      var banner = document.getElementById('cookie-banner');
      if (banner) banner.style.display = 'none';
    }
  } catch(e) {}

  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        var name = overlay.id.replace('modal-', '');
        if (window.closeModal) window.closeModal(name);
      }
    });
  });
}

function cleanup() {
  document.getElementById('fj-st')?.remove();
  ['openArticle','closeArticle','showHome','filterCategory','searchArticles',
   'openModal','closeModal','acceptCookies','rejectCookies','toggleMobileMenu'
  ].forEach(function(fn) { delete window[fn]; });
}

export default function RioProvincial() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Provinet Empresas Finanzas Joven | Educación Financiera para Jóvenes';
    const style = document.createElement('style');
    style.id = 'fj-st';
    style.textContent = STYLE;
    document.head.appendChild(style);
    const timer = setTimeout(init, 0);
    return () => { clearTimeout(timer); cleanup(); document.title = prevTitle; };
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}
