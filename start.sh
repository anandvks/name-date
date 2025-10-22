#!/bin/bash

# Name Date - Local Development Server Launcher
# This script tries multiple methods to start a local server

echo "🚀 Starting Name Date local development server..."
echo ""

# Try Python 3 first
if command -v python3 &> /dev/null; then
    echo "✓ Found Python 3"
    echo "📡 Starting server at http://localhost:8000"
    echo "   Press Ctrl+C to stop"
    echo ""
    python3 -m http.server 8000
    exit 0
fi

# Try Python 2
if command -v python &> /dev/null; then
    echo "✓ Found Python"
    echo "📡 Starting server at http://localhost:8000"
    echo "   Press Ctrl+C to stop"
    echo ""
    python -m SimpleHTTPServer 8000
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "✓ Found PHP"
    echo "📡 Starting server at http://localhost:8000"
    echo "   Press Ctrl+C to stop"
    echo ""
    php -S localhost:8000
    exit 0
fi

# Try npx serve
if command -v npx &> /dev/null; then
    echo "✓ Found npx"
    echo "📡 Starting server with npx serve"
    echo "   Press Ctrl+C to stop"
    echo ""
    npx serve .
    exit 0
fi

# No server found
echo "❌ No suitable server found!"
echo ""
echo "Please install one of the following:"
echo "  • Python 3: https://www.python.org/downloads/"
echo "  • PHP: https://www.php.net/downloads"
echo "  • Node.js (for npx): https://nodejs.org/"
echo ""
echo "Or run manually with:"
echo "  python3 -m http.server 8000"
exit 1
