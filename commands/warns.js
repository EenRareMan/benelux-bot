const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // !warn gebruiker fffgfgfgddf f fg fg fd

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Jij kan dat niet doen.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker of de gebruiker is niet op deze server.");

    //  if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan je geen warn geven.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op.");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("warn")
        .setColor("#ff9900")
        .addField("warned gebruiker", user)
        .addField("Gewarnd door", message.author)
        .addField("Aantal warns", warns[user.id].warns)
        .addField("Reden", reason);

    var warnChannel = message.guild.channels.find(`name`, "straffen");
    if (!warnChannel) return message.guild.send("Het kanaal is niet gevonden.");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 4) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("PAS OP " + user)
            .setColor("#ff9900")
            .addField("Bericht", "nog 1 warn en je krijgt een kick!!!");

        message.channel.send(warnbericht);

    } else if (warns[user.id].warns == 5) {

        message.guild.member(user).kick(reason);
        message.channel.send(`${user} is gekickd.`);



    }

}

module.exports.help = {
    name: "warn",
    description: "Geef iemand een waarschuwing"
}