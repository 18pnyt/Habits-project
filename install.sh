#!/bin/bash

echo "🚀 Instalando Abel Habits..."

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado. Por favor instala Node.js versión 18 o superior."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js versión 18 o superior es requerida. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias de la raíz
echo "📦 Instalando dependencias de la raíz..."
npm install

# Instalar dependencias de api
echo "📦 Instalando dependencias de api..."
cd api && npm install && cd ..

# Instalar dependencias de app
echo "📦 Instalando dependencias de app..."
cd app && npm install && cd ..

# Instalar dependencias de com
echo "📦 Instalando dependencias de com..."
cd com && npm install && cd ..

# Instalar dependencias de dat
echo "📦 Instalando dependencias de dat..."
cd dat && npm install && cd ..

echo "✅ Instalación completada exitosamente!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Crear archivo .env en el directorio api/ con las variables de entorno"
echo "2. Ejecutar 'npm run dev' para iniciar la aplicación"
echo ""
echo "🔗 URLs de acceso:"
echo "- Frontend: http://localhost:5173"
echo "- API: http://localhost:3000" 