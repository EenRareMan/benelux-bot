const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Doei!");

}

module.exports.help = {
    name: "doei",
    description: "Laat de bot doei terug zeggen"
}