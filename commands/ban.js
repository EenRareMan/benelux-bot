const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!banUser) return message.channel.send("De gebruiker is niet gevonden.");

    var reason = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij kan dit niet doen.");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan je niet bannen.");

    var ban = new discord.RichEmbed()
        .setDescription("ban")
        .setColor("#ff0000")
        .addField("baned gebruiker", banUser)
        .addField("Geband door", message.author)
        .addField("Reden", reason);

    var banChannel = message.guild.channels.find(`name`, "straffen");
    if (!banChannel) return message.guild.send("Het kanaal is niet gevonden.");

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);


    return;


}

module.exports.help = {
    name: "ban",
    description: "Ban een gebruiker."
}