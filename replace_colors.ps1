# Script para reemplazar todos los colores verdes por dorados en el proyecto
# Buscar y reemplazar rgba(1, 165, 75, X) por rgba(214, 161, 59, X)
# Buscar y reemplazar #01A54B por #D6A13B
# Buscar y reemplazar 01a54b por d6a13b

$files = @(
    "index.css",
    "index.html", 
    "Nosotros.html",
    "Servicios.html",
    "Contacto.html",
    "PortafolioMinimal.html",
    "navbar-shared.css",
    "navbar-mobile-unified.css",
    "navbar-mobile-effects.css"
)

Write-Host "Iniciando reemplazo de colores verdes por dorados..." -ForegroundColor Green

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Procesando archivo: $file" -ForegroundColor Yellow
        
        # Leer contenido
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Reemplazos
        $content = $content -replace "rgba\(1, 165, 75,", "rgba(214, 161, 59,"
        $content = $content -replace "rgba\(1,165,75,", "rgba(214,161,59,"
        $content = $content -replace "#01A54B", "#D6A13B"
        $content = $content -replace "#01a54b", "#d6a13b"
        $content = $content -replace "01a54b", "d6a13b"
        $content = $content -replace "01A54B", "D6A13B"
        
        # Escribir contenido modificado
        $content | Set-Content $file -Encoding UTF8
        
        Write-Host "  ✓ Completado: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host "Reemplazo completado!" -ForegroundColor Green
