# Espera a que la API local de Dolphin Anty este lista
Write-Host "Esperando que Dolphin Anty cargue la API local..." -ForegroundColor Yellow

$apiReady = $false
$intentos = 0
do {
    try {
        $r = Invoke-WebRequest -Uri 'http://localhost:3001/v1.0/health' -TimeoutSec 2 -ErrorAction Stop
        $apiReady = $true
        Write-Host "API local detectada!" -ForegroundColor Green
    } catch {
        Start-Sleep -Seconds 2
        $intentos++
        Write-Host "Intento $intentos - esperando..."
    }
} while (-not $apiReady -and $intentos -lt 15)

if (-not $apiReady) {
    Write-Host "ERROR: Dolphin Anty no responde en el puerto 3001." -ForegroundColor Red
    Write-Host "Asegurate de que la app de escritorio este abierta."
    exit 1
}

# Obtener el token de sesion local
$tokenFile = "$env:APPDATA\dolphin_anty\application-launch-start"
if (Test-Path $tokenFile) {
    $localToken = Get-Content $tokenFile -Raw
    Write-Host "Token local encontrado"
} else {
    $localToken = ""
}

$headers = @{ 'Content-Type' = 'application/json'; 'Accept' = 'application/json' }
if ($localToken) { $headers['X-Session-Token'] = $localToken.Trim() }

# Iniciar Candonga 1 (ID: 789482225)
$profileId = '789482225'
Write-Host "Iniciando Candonga 1 (ID: $profileId)..." -ForegroundColor Cyan

try {
    $r = Invoke-WebRequest -Uri "http://localhost:3001/v1.0/browser_profiles/$profileId/start" -Method POST -Headers $headers -Body '{}' -ErrorAction Stop
    Write-Host "Respuesta: $($r.Content)"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $err = $reader.ReadToEnd()
    Write-Host "Error HTTP ${code}: $err" -ForegroundColor Red
}
