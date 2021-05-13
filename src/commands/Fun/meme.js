// Dependencies
const got = require('got')
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, emojis) => {
	got('https://www.reddit.com/r/memes/random/.json').then(res => {
            let content = JSON.parse(res.body)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(content[0].data.children[0].data.title)
                    .setImage(content[0].data.children[0].data.url)
                    .setColor("RANDOM")
                    .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
            )
        })
};

module.exports.config = {
	command: 'meme',
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
};

module.exports.help = {
	name: 'Meme',
	category: 'Fun',
	description: 'Sends a random meme.',
	usage: '${PREFIX}meme',
};
