[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$TOKEN   = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2Y3ZWUzM2EwOGExOTA1MmYwMjY3MzRmZTAwNmY4NTZlNzRiM2I4ZDQ1MjRkZDE5ODdlNTYwZmU2YzJmZDJkZDU0NTZlY2UxMGFiZTU1ZTYiLCJpYXQiOjE3Nzg0NDI4ODkuMTIxODIsIm5iZiI6MTc3ODQ0Mjg4OS4xMjE4MjMsImV4cCI6MTc4MTAzNDg4OS4xMTE1MzEsInN1YiI6IjUxMTEzMzMiLCJzY29wZXMiOltdLCJ0ZWFtX2lkIjo1MDA3OTY4LCJ0ZWFtX3BsYW4iOiJzdGFydGVyIiwidGVhbV9wbGFuX2V4cGlyYXRpb24iOjE3ODEwMzM2NTR9.TMkocSLyw8N0ikQM4O8ys18FevKnEyhZIbscndxv5xQ2sXgrPMOpk7ZF9eP0WfdpmDgWqSesrPmUsFDAYbpTPmWn6sJBr_Za1w2fM3TFEjo2XLDNRVF-6pUpB-YzxZSWZpk3q9-MWaMAI_y6N-7TcwyiTD2ULjhyiM2UKI929uGdhxPRNMdn7CXWxnR2BTUGSegK90KfAXBgykyOot-Jt6fyk0b8NUrM3T6qzwTTYXN-xinSyph-n_QY-8cXZp0gms6Tg3MSVzQ8rf4KAux9JOhsh0cXL5fKWvAl6Otom5TzoQhdyYi03R9nus1-pBaX566XY0Kt1U0JZilg5EttwOEshK5PYtnbWe5fJIbPqVpiqVnnhX0MDVpYQH6GgaD_17bjSN87fc1CFBxgFMTktwf-A5p4-qLHYDUKmmMeuIssYoJDK9EKeZXXDS93-LzthIQ0pH4CjhdXHIQbce7hmRBEKDYHHCpvwtIRjiXTZzLt8iHNPjeX-PfvZQyoVsnKZmN6WP5Dfu8SEB2a6wx1auorG0Dq2uvV09hclWl7dyPoktSfrp7bYBNf_2USoAAyaMAkYyfN8yTwGOdJnBDxFgAX4qyCdow3vZccCH-7Zwqvb-HOZJ963aO2N5bJwf-HY_TPxcz9STAeEiv0dFJlQQFYngz8U78Cz9mWGmWmelw'
$API_URL = 'https://dolphin-anty-api.com/browser_profiles'
$HEADERS = @{
    'Authorization' = "Bearer $TOKEN"
    'Content-Type'  = 'application/json'
    'Accept'        = 'application/json'
}

# Candonga 1 y 2 con sus proxies estáticos de Brasil
$asignaciones = @(
    @{ id = '789482225'; nombre = 'Candonga 1'; host = '200.239.200.183'; port = 5432; login = 'qliyn'; password = 'g1med609' },
    @{ id = '789482228'; nombre = 'Candonga 2'; host = '200.239.201.197'; port = 5432; login = 'qliyn'; password = 'g1med609' }
)

Write-Host '=== Asignando proxies a Dolphin Anty ===' -ForegroundColor Cyan
Write-Host ''

foreach ($a in $asignaciones) {
    Write-Host "$($a.nombre) (ID: $($a.id)) -> $($a.host):$($a.port) ..." -NoNewline

    $body = @{
        proxy = @{
            type     = 'socks5'
            host     = $a.host
            port     = $a.port
            login    = $a.login
            password = $a.password
        }
    } | ConvertTo-Json -Depth 5

    try {
        $r   = Invoke-WebRequest -Uri "$API_URL/$($a.id)" -Method PATCH -Headers $HEADERS -Body $body -ErrorAction Stop
        $obj = $r.Content | ConvertFrom-Json
        if ($obj.success -eq 1 -or $obj.success -eq $true) {
            Write-Host ' OK' -ForegroundColor Green
        } else {
            Write-Host " Respuesta: $($r.Content)" -ForegroundColor Yellow
        }
    } catch {
        $code   = $_.Exception.Response.StatusCode.value__
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $err    = $reader.ReadToEnd()
        Write-Host " ERROR HTTP $code - $err" -ForegroundColor Red
    }

    Start-Sleep -Milliseconds 500
}

Write-Host ''
Write-Host 'Listo! Abre Dolphin Anty y verifica los proxies en Candonga 1 y Candonga 2.' -ForegroundColor Cyan
