const Discord = require('discord.js');
const client = new Discord.Client();
//const config = require('./config.json');

client.on('ready',()=>{
    console.log('ready');
});

client.login(process.env.SSD_TOKEN);
//client.login(config.token);