const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const SECURITY_CODE = process.env.SECURITY_CODE || 'MAGMA-2026-SECURE-79X';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('SCAN THIS QR WITH WHATSAPP:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ MAGMA BOT 2 IS ONLINE!');
});

client.on('message', async msg => {
    if (msg.from.includes('@g.us')) return; // ignore groups

    const text = msg.body.toLowerCase();
    
    if (text.includes('hello') || text.includes('hi')) {
        msg.reply('👋 Hey! I am *Magma Bot 2* — Your AI Assistant is online! How can I help?');
    } 
    else if (text.includes('security code') || text.includes('code')) {
        msg.reply(`🔐 Your security code is: ${SECURITY_CODE}`);
    }
    else {
        // Simple smart reply - no API needed
        msg.reply(`🤖 Magma Bot 2: You said "${msg.body}"\n\nI'm online and ready! Ask me anything.`);
    }
});

client.initialize();
