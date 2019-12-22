module.exports.run = async (bot, message, args) => {

 message.channel.send("pong: " + (message.createdTimestamp - Date.now()) + "ms");

}

module.exports.help = {
    name: "ping",
    description: "Krijg pong met het aantal ms"
}