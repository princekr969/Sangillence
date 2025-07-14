#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Google Sheets Setup Helper\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
    console.log('⚠️  .env file already exists. This will overwrite it.');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Do you want to continue? (y/N): ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
            console.log('Setup cancelled.');
            process.exit(0);
        }
        rl.close();
        runSetup();
    });
} else {
    runSetup();
}

function runSetup() {
    console.log('\n📋 Please provide the following information:\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const questions = [
        'Enter your Google Cloud Project ID: ',
        'Enter your Service Account Private Key ID: ',
        'Enter your Service Account Client ID: ',
        'Enter your Service Account Client Email: ',
        'Enter your Google Sheets Spreadsheet ID: ',
        'Enter your Private Key (paste the entire key including BEGIN and END lines): '
    ];

    const answers = [];

    function askQuestion(index) {
        if (index >= questions.length) {
            createEnvFile(answers);
            return;
        }

        rl.question(questions[index], (answer) => {
            answers.push(answer);
            askQuestion(index + 1);
        });
    }

    askQuestion(0);
}

function createEnvFile(answers) {
    const [projectId, privateKeyId, clientId, clientEmail, spreadsheetId, privateKey] = answers;

    // Format the private key properly
    const formattedPrivateKey = privateKey
        .replace(/\\n/g, '\n')
        .replace(/\n/g, '\\n');

    const envContent = `# Google Sheets API Configuration
GOOGLE_SHEETS_PRIVATE_KEY="${formattedPrivateKey}"
GOOGLE_SHEETS_CLIENT_EMAIL="${clientEmail}"
GOOGLE_SHEETS_SPREADSHEET_ID="${spreadsheetId}"

# Server Configuration
PORT=5000
NODE_ENV=development

# Additional Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID="${projectId}"
GOOGLE_CLOUD_PRIVATE_KEY_ID="${privateKeyId}"
GOOGLE_CLOUD_CLIENT_ID="${clientId}"
`;

    try {
        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ .env file created successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Make sure your Google Sheet has the correct headers');
        console.log('2. Share your Google Sheet with your service account email');
        console.log('3. Run: npm run dev');
        console.log('4. Test the API at: http://localhost:5000/health');
        console.log('\n🔗 Make sure your Google Sheet has the correct headers and is shared with your service account!');
    } catch (error) {
        console.error('❌ Error creating .env file:', error.message);
    }

    process.exit(0);
} 