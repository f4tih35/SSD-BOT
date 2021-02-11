const Discord = require('discord.js');
const client = new Discord.Client();
const talkedRecently = new Set();
const prefix = '!';

client.once('ready', () => {
	console.log('Ready!');
});

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('SAU Software Development Discord Server')
	//.setURL('#')
	.setDescription('')
	.addFields(
		{ name: '!kurallar', value: 'Sunucuda uyulması gereken kurallara bu komutla ulaşabilirsiniz.\n' },
		{ name: '!şikayet @isim', value: 'Sunucuda rahatsız olduğunuz herhangi birini şikayet etmek için bu komutu kullanabilirsiniz.\n' },
		{ name: '!pp @isim', value: 'Avatarını beğendiğiniz kullanıcıyı etiketleyerek avatarının indirme linkine bu komutla ulaşabilirsiniz.\n' },
		{ name: '!kod', value: 'Botun kaynak kodlarına bu komutla ulaşabilirsiniz.' },
	)
	//.setFooter('.');

	
client.on('message', message => 
{
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'yardim' || command === 'yardım'){
		message.reply(exampleEmbed);
	}

	else if (command === 'pp') {
		if (!message.mentions.users.size) {
			return message.reply(`Profil fotoğrafınız: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}?size=2048>`);
		}
        var myus = null;

		const avatarList = message.mentions.users.map(user => {
            myus = user
			return `${user.username} adlı kullanıcın profil fotoğrafı: <${user.displayAvatarURL({ format: "png", dynamic: true })}?size=9999> `;
		});
		message.channel.send(avatarList, {
            files: [
               `${myus.displayAvatarURL({ format: "png", dynamic: true })}?size=2048`
            ]
        });
	}

	else if (command === 'kod') {
		return message.reply(`Projenin kaynak kodlarına linkten ulaşabilirsiniz: https://github.com/f4tih35/SSD-BOT`);
	}

	else if (command === 'kurallar') {
        let name = client.channels.cache.get('807559443234422804');
		return message.reply(`Kurallara ${name} kanalından ulaşabilirsiniz.`);
	}


	else if (command === 'şikayet' || command === 'sikayet'){
		const user = message.mentions.users.first();
		const member = message.guild.member(user);

		if (talkedRecently.has(message.author.id)) {
			if(message.author.spam >= 4){
				message.member
				.kick('..')
				.then(()=>{
					message.channel.send(`${message.author} spam yaptığı için sunucudan atıldı.`)
					return;
				})
				.catch(err=>{
					message.channel.send('Bir sorun oluştu, sunucu sahibi ile iletişime geçiniz.');
				})
			}

			else if(message.author.spam){
				message.author.spam += 1;
				message.reply(`lütfen spam yapmayın (${message.author.spam}/5)`);
			}
			else{
				message.author.spam = 1;
				message.reply(`lütfen spam yapmayın (${message.author.spam}/5)`);
			}
			message.delete();

			return;
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 86400000);
	}
	
		if(user.test >= 10){
			member
			.kick('..')
			.then(()=>{
				message.channel.send(`${user.tag} şikayet sınırını aştığı için sunucudan atıldı.`)
			})
			.catch(err=>{
				message.channel.send('Bir sorun oluştu, sunucu sahibi ile iletişime geçiniz.');
			})
		}
		else if(user.test){
			user.test += 1;
		}
		else{
			user.test = 1;
		}
		console.log(user.test);
	}

});

client.login(process.env.SSD_TOKEN);