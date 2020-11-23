const Discord = require('discord.js');
const got = require('got');

module.exports = {
  name: 'meme',
  description: 'random meme dari r/memes',
  emoji: 'Ⓜ️',
  execute(message, text) {
    const embed = new Discord.MessageEmbed();
    // @ts-ignore
    got('https://www.reddit.com/r/memes/random/.json')
      .then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor('RANDOM');
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
        message.channel.send(embed);
        console.log('Sending memes');
      })
      .catch(console.error);
  },
};