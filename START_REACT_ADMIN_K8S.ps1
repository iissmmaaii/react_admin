$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js was not found in PATH."
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw "npm was not found in PATH."
}

Write-Host "API Gateway: http://172.29.5.41:30080" -ForegroundColor Cyan
if (-not (Test-Path -LiteralPath (Join-Path $root "node_modules"))) {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed." }
}

npm run dev
if ($LASTEXITCODE -ne 0) { throw "React start failed." }
