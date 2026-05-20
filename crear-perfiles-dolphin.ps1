[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$TOKEN   = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2Y3ZWUzM2EwOGExOTA1MmYwMjY3MzRmZTAwNmY4NTZlNzRiM2I4ZDQ1MjRkZDE5ODdlNTYwZmU2YzJmZDJkZDU0NTZlY2UxMGFiZTU1ZTYiLCJpYXQiOjE3Nzg0NDI4ODkuMTIxODIsIm5iZiI6MTc3ODQ0Mjg4OS4xMjE4MjMsImV4cCI6MTc4MTAzNDg4OS4xMTE1MzEsInN1YiI6IjUxMTEzMzMiLCJzY29wZXMiOltdLCJ0ZWFtX2lkIjo1MDA3OTY4LCJ0ZWFtX3BsYW4iOiJzdGFydGVyIiwidGVhbV9wbGFuX2V4cGlyYXRpb24iOjE3ODEwMzM2NTR9.TMkocSLyw8N0ikQM4O8ys18FevKnEyhZIbscndxv5xQ2sXgrPMOpk7ZF9eP0WfdpmDgWqSesrPmUsFDAYbpTPmWn6sJBr_Za1w2fM3TFEjo2XLDNRVF-6pUpB-YzxZSWZpk3q9-MWaMAI_y6N-7TcwyiTD2ULjhyiM2UKI929uGdhxPRNMdn7CXWxnR2BTUGSegK90KfAXBgykyOot-Jt6fyk0b8NUrM3T6qzwTTYXN-xinSyph-n_QY-8cXZp0gms6Tg3MSVzQ8rf4KAux9JOhsh0cXL5fKWvAl6Otom5TzoQhdyYi03R9nus1-pBaX566XY0Kt1U0JZilg5EttwOEshK5PYtnbWe5fJIbPqVpiqVnnhX0MDVpYQH6GgaD_17bjSN87fc1CFBxgFMTktwf-A5p4-qLHYDUKmmMeuIssYoJDK9EKeZXXDS93-LzthIQ0pH4CjhdXHIQbce7hmRBEKDYHHCpvwtIRjiXTZzLt8iHNPjeX-PfvZQyoVsnKZmN6WP5Dfu8SEB2a6wx1auorG0Dq2uvV09hclWl7dyPoktSfrp7bYBNf_2USoAAyaMAkYyfN8yTwGOdJnBDxFgAX4qyCdow3vZccCH-7Zwqvb-HOZJ963aO2N5bJwf-HY_TPxcz9STAeEiv0dFJlQQFYngz8U78Cz9mWGmWmelw'
$API_URL = 'https://dolphin-anty-api.com/browser_profiles'
$HEADERS = @{
    'Authorization' = "Bearer $TOKEN"
    'Content-Type'  = 'application/json'
    'Accept'        = 'application/json'
}

# User agents únicos — Chrome en diferentes versiones y OS
$userAgents = @(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_7_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
)

# 10 fingerprints únicos — máxima diversidad para Google Ads
$platforms   = @('windows','macos','windows','macos','windows','windows','macos','windows','windows','macos')
$osVersions  = @('11','14','10','13','11','10','12','11','10','14')
$resolutions = @('1920x1080','2560x1440','1366x768','1440x900','1600x900','1280x800','1920x1200','2560x1440','1280x1024','1920x1080')
$cpuCores    = @(8,10,4,6,12,6,8,16,4,12)
$ramValues   = @(16,32,8,16,32,8,16,32,4,16)
$dntValues   = @($false,$false,$true,$false,$false,$true,$false,$false,$true,$false)

Write-Host '=== Dolphin Anty - Creacion de 10 perfiles ===' -ForegroundColor Cyan
Write-Host ''

$created = @()
$failed  = @()

for ($i = 0; $i -lt 10; $i++) {
    $num   = $i + 1
    $name  = "Candonga $num"
    $plat  = $platforms[$i]
    $osVer = $osVersions[$i]
    $res   = $resolutions[$i]
    $cpu   = $cpuCores[$i]
    $mem   = $ramValues[$i]
    $dnt   = $dntValues[$i]
    $ua    = $userAgents[$i]
    $label = "[$num/10] $name ($plat $osVer, $res)..."

    Write-Host $label -NoNewline

    $body = @{
        name        = $name
        platform    = $plat
        browserType = 'anty'
        mainWebsite = 'google'
        osVersion   = $osVer
        doNotTrack  = $dnt
        useragent   = @{ mode = 'manual'; value = $ua }
        screen      = @{ mode = 'manual'; resolution = $res }
        cpu         = @{ mode = 'manual'; value = $cpu }
        memory      = @{ mode = 'manual'; value = $mem }
        canvas      = @{ mode = 'noise' }
        webgl       = @{ mode = 'noise' }
        webglInfo   = @{ mode = 'auto' }
        audio       = @{ mode = 'noise' }
        clientRects = @{ mode = 'noise' }
        webrtc      = @{ mode = 'altered'; ipAddress = $null }
        timezone    = @{ mode = 'auto'; value = $null }
        locale      = @{ mode = 'auto'; value = $null }
        geolocation = @{ mode = 'auto' }
        fonts        = @{ mode = 'auto' }
        mediaDevices = @{ mode = 'real' }
        ports        = @{ mode = 'block' }
    }

    $json = $body | ConvertTo-Json -Depth 10

    try {
        $r   = Invoke-WebRequest -Uri $API_URL -Method POST -Headers $HEADERS -Body $json -ErrorAction Stop
        $obj = $r.Content | ConvertFrom-Json
        $id  = if ($obj.browserProfileId) { $obj.browserProfileId } elseif ($obj.data.id) { $obj.data.id } else { 'sin-ID' }
        Write-Host " OK - ID: $id" -ForegroundColor Green
        $created += "$name | ID: $id | $plat $osVer | $res"
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errBody = $reader.ReadToEnd()
        Write-Host " ERROR HTTP $code - $errBody" -ForegroundColor Red
        $failed += "$name : HTTP $code $errBody"
    }

    if ($i -lt 9) { Start-Sleep -Milliseconds 700 }
}

Write-Host ''
Write-Host '=== Resumen ===' -ForegroundColor Cyan
Write-Host "Creados: $($created.Count)/10"

if ($created.Count -gt 0) {
    Write-Host ''
    Write-Host 'Perfiles creados:' -ForegroundColor Green
    $created | ForEach-Object { Write-Host "  OK $_" }
}
if ($failed.Count -gt 0) {
    Write-Host ''
    Write-Host 'Errores:' -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  X $_" }
}

Write-Host ''
Write-Host 'Listo! Abre Dolphin Anty para ver los perfiles.' -ForegroundColor Cyan
