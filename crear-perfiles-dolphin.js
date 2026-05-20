const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2Y3ZWUzM2EwOGExOTA1MmYwMjY3MzRmZTAwNmY4NTZlNzRiM2I4ZDQ1MjRkZDE5ODdlNTYwZmU2YzJmZDJkZDU0NTZlY2UxMGFiZTU1ZTYiLCJpYXQiOjE3Nzg0NDI4ODkuMTIxODIsIm5iZiI6MTc3ODQ0Mjg4OS4xMjE4MjMsImV4cCI6MTc4MTAzNDg4OS4xMTE1MzEsInN1YiI6IjUxMTEzMzMiLCJzY29wZXMiOltdLCJ0ZWFtX2lkIjo1MDA3OTY4LCJ0ZWFtX3BsYW4iOiJzdGFydGVyIiwidGVhbV9wbGFuX2V4cGlyYXRpb24iOjE3ODEwMzM2NTR9.TMkocSLyw8N0ikQM4O8ys18FevKnEyhZIbscndxv5xQ2sXgrPMOpk7ZF9eP0WfdpmDgWqSesrPmUsFDAYbpTPmWn6sJBr_Za1w2fM3TFEjo2XLDNRVF-6pUpB-YzxZSWZpk3q9-MWaMAI_y6N-7TcwyiTD2ULjhyiM2UKI929uGdhxPRNMdn7CXWxnR2BTUGSegK90KfAXBgykyOot-Jt6fyk0b8NUrM3T6qzwTTYXN-xinSyph-n_QY-8cXZp0gms6Tg3MSVzQ8rf4KAux9JOhsh0cXL5fKWvAl6Otom5TzoQhdyYi03R9nus1-pBaX566XY0Kt1U0JZilg5EttwOEshK5PYtnbWe5fJIbPqVpiqVnnhX0MDVpYQH6GgaD_17bjSN87fc1CFBxgFMTktwf-A5p4-qLHYDUKmmMeuIssYoJDK9EKeZXXDS93-LzthIQ0pH4CjhdXHIQbce7hmRBEKDYHHCpvwtIRjiXTZzLt8iHNPjeX-PfvZQyoVsnKZmN6WP5Dfu8SEB2a6wx1auorG0Dq2uvV09hclWl7dyPoktSfrp7bYBNf_2USoAAyaMAkYyfN8yTwGOdJnBDxFgAX4qyCdow3vZccCH-7Zwqvb-HOZJ963aO2N5bJwf-HY_TPxcz9STAeEiv0dFJlQQFYngz8U78Cz9mWGmWmelw';
const API_BASE = 'https://apiv2.dolphin-anty-api.com/api/v2';

// 10 configuraciones únicas — máxima diversidad para Google Ads
const FINGERPRINTS = [
  { platform: 'windows', osVersion: '11',    resolution: '1920x1080', cpu: 8,  memory: 16, doNotTrack: false },
  { platform: 'macos',   osVersion: '14',    resolution: '2560x1440', cpu: 10, memory: 32, doNotTrack: false },
  { platform: 'windows', osVersion: '10',    resolution: '1366x768',  cpu: 4,  memory: 8,  doNotTrack: true  },
  { platform: 'macos',   osVersion: '13',    resolution: '1440x900',  cpu: 6,  memory: 16, doNotTrack: false },
  { platform: 'windows', osVersion: '11',    resolution: '1600x900',  cpu: 12, memory: 32, doNotTrack: false },
  { platform: 'windows', osVersion: '10',    resolution: '1280x800',  cpu: 6,  memory: 8,  doNotTrack: true  },
  { platform: 'macos',   osVersion: '12',    resolution: '1920x1200', cpu: 8,  memory: 16, doNotTrack: false },
  { platform: 'windows', osVersion: '11',    resolution: '2560x1440', cpu: 16, memory: 32, doNotTrack: false },
  { platform: 'windows', osVersion: '10',    resolution: '1280x1024', cpu: 4,  memory: 4,  doNotTrack: true  },
  { platform: 'macos',   osVersion: '14',    resolution: '1920x1080', cpu: 12, memory: 16, doNotTrack: false },
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function buildProfile(name, fp) {
  return {
    name,
    platform: fp.platform,
    browserType: 'anty',
    mainWebsite: 'google',
    osVersion: fp.osVersion,
    doNotTrack: fp.doNotTrack,

    useragent:    { mode: 'auto' },
    screen:       { mode: 'manual', resolution: fp.resolution },
    cpu:          { mode: 'manual', value: fp.cpu },
    memory:       { mode: 'manual', value: fp.memory },

    // Ruido único por perfil — esencial para evadir detección
    canvas:       { mode: 'noise' },
    webgl:        { mode: 'noise' },
    webglInfo:    { mode: 'auto' },
    audio:        { mode: 'noise' },
    clientRects:  { mode: 'noise' },

    // WebRTC usa la IP del proxy — crítico para Google Ads
    webrtc:       { mode: 'altered' },

    // Timezone y locale automáticos desde el proxy
    timezone:     { mode: 'auto' },
    locale:       { mode: 'auto' },
    geolocation:  { mode: 'auto' },

    fonts:        { mode: 'auto' },
    mediaDevices: { mode: 'real' },
    ports:        { mode: 'block' },
    webgpu:       'off',
  };
}

async function createProfile(name, fp) {
  const body = buildProfile(name, fp);

  const res = await fetch(`${API_BASE}/browser_profiles`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

async function main() {
  console.log('=== Dolphin Anty — Creación de perfiles ===\n');

  const created = [];
  const failed  = [];

  for (let i = 0; i < 10; i++) {
    const name = `Candonga ${i + 1}`;
    const fp   = FINGERPRINTS[i];

    process.stdout.write(`[${i + 1}/10] Creando "${name}" (${fp.platform} ${fp.osVersion}, ${fp.resolution})... `);

    try {
      const result = await createProfile(name, fp);
      const id = result?.data?.id ?? result?.id ?? 'sin ID';
      console.log(`OK — ID: ${id}`);
      created.push({ name, id, platform: fp.platform, resolution: fp.resolution });
    } catch (err) {
      console.log(`ERROR — ${err.message}`);
      failed.push({ name, error: err.message });
    }

    // Pausa entre peticiones para no saturar la API
    if (i < 9) await sleep(600);
  }

  console.log('\n=== Resumen ===');
  console.log(`Creados: ${created.length}/10`);
  if (created.length > 0) {
    console.log('\nPerfiles creados:');
    created.forEach(p => console.log(`  ✓ ${p.name} | ID: ${p.id} | ${p.platform} | ${p.resolution}`));
  }
  if (failed.length > 0) {
    console.log('\nErrores:');
    failed.forEach(p => console.log(`  ✗ ${p.name} — ${p.error}`));
  }
  console.log('\n¡Listo! Abre Dolphin Anty para ver los perfiles.');
}

main().catch(err => {
  console.error('Error fatal:', err.message);
  process.exit(1);
});
