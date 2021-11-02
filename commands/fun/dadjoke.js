
const { MessageEmbed } = require("discord.js");
const dadJokes = require('@mikemcbride/dad-jokes');

module.exports = {
    name: "dadjoke",
    aliases: ["jokedad"],
    category: "fun",
    description: "Says a random dad joke.",
    permissions: "member",
    run: async function (client, message, args)  {
        let embed = new MessageEmbed()
            .setColor("#0efefe")
            .setTitle("Here's a good one...")
            .setTimestamp()
            .setDescription(`${dadJokes.random()}`);

        message.channel.send(embed).then(m => del(m, 15000));
    }
}