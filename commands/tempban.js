const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // !tempban gebruiker tijd reden

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Jij hebt geen toestemming");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Je moet het commando als volgt gebruiken: !tempban gebruiker tijd reden");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan je niet tempbannen.");

    var tempBanTime = args[1];

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op");

    if (ms(tempBanTime)) {

        await message.guild.member(user).ban(reason);

        message.channel.send(`${user} is gebant voor ${reason}`);

        setTimeout(function () {

            message.guild.unban(user.id);

            message.channel.send(`${user} is niet meer gebanned.`)

        },ms(tempBanTime));

    } else {
        return message.channel.send("Geef een geldige tijd op.");
    }

}

module.exports.help = {
    name: "tempban",
    description: "Tempban een gebruiker voor een bepaalde tijd"
}