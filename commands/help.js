const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    // try {

    //    var text = "**Benelux Bot** \n\n **__Commands__** \n !hallo - De bot zegt Hallo terug \n !doei - De bot zegt Doei terug \n !botinfo - Krijg de info van de bot \n !serverinfo - Krijg de info van de server \n\n **__Admin Commands__** \n !kick - Kick een bepaalde persoon \n !ban - Ban een bepaalde persoon";

    //    message.author.send(text);

    //    message.channel.send("Alle commands staan in je privé berichten.");

    //  } catch (error) {
    //     message.channel.send("Er is iets fout gegaan.");
    //  }

    var commandList = [];

    bot.commands.forEach(command => {

        var item = {

            name: command.help.name,
            description: command.help.description

        };

        commandList.push(item);

    });

    var prefix = botConfig.prefix;
    var response = "";

    for (var i = 0; i < commandList.length; i++) {

        response += `${prefix}${commandList[i]["name"]} - ${commandList[i]["description"]} \r\r`;

    }

    message.author.send(response).then(() => {

        message.channel.send("Al de commands staan in je privé berichten");

    }).catch(() => {

        message.channel.send("Je privé berichten staan uit, j ehet geen hulp ontvangen");

    });

}

module.exports.help = {
    name: "help",
    description: "Krijg dit menu"
}