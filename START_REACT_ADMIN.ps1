$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js was not found in PATH. Install Node.js 20 or newer."
}

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Starting CypherVault Admin Dashboard at http://localhost:5173" -ForegroundColor Green
npm run dev
