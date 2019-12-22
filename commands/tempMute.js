const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // !tempmute gebruiker 1h

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Jij kan dat niet doen.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker of de gebruiker is niet op deze server.");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan je geen muten.");

    var muteRole = message.guild.roles.find("name", "Muted");

    if (!muteRole) return message.channel.send("De rol bestaat niet.");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("Geef een tijd mee.");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id)

        message.channel.send(`${user} is geunmute.`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute",
    description: "Tempmute een gebruiker voor een bepaalde tijd"
}