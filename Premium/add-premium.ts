const premiumSchmea = require("../../models/Premium")
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'add-premium',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== '729930285654736950') return;

        const member = 
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

        if(!member) return message.reply("Please specify a valid member!");

        premiumSchmea.findOne(
            {
                User: member.id,
            },
            async  (err, data) => {
                if(data)
                    return message.reply(
                        "This user has already gained premium features"
                );
            
                new premiumSchmea({
                User: member.id
                }).save();
                    return message.reply('Added ${member} to the database!')
            }
        )
    }
}