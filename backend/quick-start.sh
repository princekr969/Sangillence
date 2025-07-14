#!/bin/bash

echo "🚀 Quick Start Setup for School Registration Backend"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 No .env file found. Running setup helper..."
    node setup-google-sheets.js
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your Google Sheet is set up with the correct headers"
echo "2. Share your Google Sheet with your service account email"
echo "3. Run: npm run dev"
echo "4. Test the API at: http://localhost:5000/health"
echo ""
echo "📚 For detailed setup instructions, see README.md" 