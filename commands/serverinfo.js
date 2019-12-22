const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var servericon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
        .setDescription("Server Info")
        .setColor("#ee0000")
        .setThumbnail(servericon)
        .addField("Bot naam", bot.user.username)
        .addField("Je bent gejoind op ", message.member.joinedAt)
        .addField("Totale leden", message.guild.memberCount);

    return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo",
    description: "Krijg de info van de server"
}