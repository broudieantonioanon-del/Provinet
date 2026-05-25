const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2Y3ZWUzM2EwOGExOTA1MmYwMjY3MzRmZTAwNmY4NTZlNzRiM2I4ZDQ1MjRkZDE5ODdlNTYwZmU2YzJmZDJkZDU0NTZlY2UxMGFiZTU1ZTYiLCJpYXQiOjE3Nzg0NDI4ODkuMTIxODIsIm5iZiI6MTc3ODQ0Mjg4OS4xMjE4MjMsImV4cCI6MTc4MTAzNDg4OS4xMTE1MzEsInN1YiI6IjUxMTEzMzMiLCJzY29wZXMiOltdLCJ0ZWFtX2lkIjo1MDA3OTY4LCJ0ZWFtX3BsYW4iOiJzdGFydGVyIiwidGVhbV9wbGFuX2V4cGlyYXRpb24iOjE3ODEwMzM2NTR9.TMkocSLyw8N0ikQM4O8ys18FevKnEyhZIbscndxv5xQ2sXgrPMOpk7ZF9eP0WfdpmDgWqSesrPmUsFDAYbpTPmWn6sJBr_Za1w2fM3TFEjo2XLDNRVF-6pUpB-YzxZSWZpk3q9-MWaMAI_y6N-7TcwyiTD2ULjhyiM2UKI929uGdhxPRNMdn7CXWxnR2BTUGSegK90KfAXBgykyOot-Jt6fyk0b8NUrM3T6qzwTTYXN-xinSyph-n_QY-8cXZp0gms6Tg3MSVzQ8rf4KAux9JOhsh0cXL5fKWvAl6Otom5TzoQhdyYi03R9nus1-pBaX566XY0Kt1U0JZilg5EttwOEshK5PYtnbWe5fJIbPqVpiqVnnhX0MDVpYQH6GgaD_17bjSN87fc1CFBxgFMTktwf-A5p4-qLHYDUKmmMeuIssYoJDK9EKeZXXDS93-LzthIQ0pH4CjhdXHIQbce7hmRBEKDYHHCpvwtIRjiXTZzLt8iHNPjeX-PfvZQyoVsnKZmN6WP5Dfu8SEB2a6wx1auorG0Dq2uvV09hclWl7dyPoktSfrp7bYBNf_2USoAAyaMAkYyfN8yTwGOdJnBDxFgAX4qyCdow3vZccCH-7Zwqvb-HOZJ963aO2N5bJwf-HY_TPxcz9STAeEiv0dFJlQQFYngz8U78Cz9mWGmWmelw';
const API = 'https://dolphin-anty-api.com';

// Proxy para cada perfil: Candonga 8, 9, 10
const ASIGNACIONES = [
  { perfil: 'Candonga 8',  host: '103.195.116.14', port: 5432, login: 'o4kws', password: '5wzmc0kw' },
  { perfil: 'Candonga 9',  host: '103.195.116.22', port: 5432, login: 'o4kws', password: '5wzmc0kw' },
  { perfil: 'Candonga 10', host: '103.195.116.23', port: 5432, login: 'o4kws', password: '5wzmc0kw' },
];

const H = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getProfiles() {
  const res = await fetch(`${API}/browser_profiles?limit=100&query=Candonga`, { headers: H });
  const json = await res.json();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
  return json.data ?? [];
}

async function updateProxy(profileId, proxy) {
  const body = {
    proxy: {
      type: 'http',
      host: proxy.host,
      port: proxy.port,
      login: proxy.login,
      password: proxy.password,
    },
  };
  const res = await fetch(`${API}/browser_profiles/${profileId}`, {
    method: 'PATCH',
    headers: H,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

async function main() {
  console.log('=== Conectar proxies — Dolphin Anty Candonga 5, 6 y 7 ===\n');

  console.log('Obteniendo perfiles Candonga...');
  const profiles = await getProfiles();

  const profileMap = {};
  profiles.forEach(p => { profileMap[p.name] = p.id; });

  console.log('Perfiles encontrados:', Object.keys(profileMap).sort().join(', '));
  console.log();

  const ok = [];
  const fail = [];

  for (const entry of ASIGNACIONES) {
    const id = profileMap[entry.perfil];
    if (!id) {
      console.log(`✗ "${entry.perfil}" — perfil NO encontrado`);
      fail.push(entry.perfil);
      continue;
    }

    process.stdout.write(`Actualizando "${entry.perfil}" (ID: ${id}) → ${entry.host}:${entry.port}... `);
    try {
      await updateProxy(id, entry);
      console.log('✓ OK');
      ok.push(entry.perfil);
    } catch (err) {
      console.log(`✗ ERROR — ${err.message}`);
      fail.push(entry.perfil);
    }

    await sleep(400);
  }

  console.log('\n=== Resumen ===');
  const total = ASIGNACIONES.length;
  console.log(`Actualizados: ${ok.length}/${total}`);
  if (ok.length)   ok.forEach(n  => console.log(`  ✓ ${n}`));
  if (fail.length) fail.forEach(n => console.log(`  ✗ ${n}`));
  if (ok.length === total) console.log(`\n¡Listo! Los ${total} proxies están conectados a los perfiles.`);
}

main().catch(err => {
  console.error('Error fatal:', err.message);
  process.exit(1);
});
