//Google Set up

  const GoogleSpreadsheet = require('google-spreadsheet');
  const {promisify} = require('util');

  const creds = require('./GoogleKeys.json')

  async function accessSpreadsheet(){
    const doc = new GoogleSpreadsheet('1xxwj4K7PWADl2H-HzJr0s45DllvGbJnxkrDZVVgE-VE')
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
  }

  accessSpreadsheet();
/*
const {google} = require('googleapis');
const keys = require('./GoogleKeys.json');

const googleClient = new google.auth.JWT(
  keys.client_email, 
  null, 
  keys.private_key, [
    'https://www.googleapis.com/auth/spreadsheets'
  ] 
);

googleClient.authorize(function(err, tokens){

  if(err){
   console.log(err);
   return;
  }else{
    console.log('Connected');
  }

});
*/

/*
// Discord


require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "^";


client.once('ready', () => {
    console.log(` ${client.user.username} is ready`);

});

client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        
        
        if(CMD_NAME === 'thing'){
            if(!message.member.hasPermission('ADMINISTRATOR'))
                return message.reply("You can't use that!");
        
            
        }
    }
});
client.login(process.env.DIS_TOKEN_BOT);

*/