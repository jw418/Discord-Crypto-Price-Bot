const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on("ready", () => {
    console.log("bot op");
});

client.on("messageCreate", message => {
    console.log(message);
    if(message.author.bot) return;

    if(message.content == "!btc"){
        message.reply("1 BTC = xx USD");
        message.channel.send("reponse dans le channel");
        message.channel.send("Mention user: <@" + message.author.id + "> \nMention d'un salon: <#" + message.channel.id + ">")
    }else if(message.content == "!eth"){
       message.reply("1 ETH = xx USD");
    }
});

client.login("MTAyMzI3MTE4OTI2ODkzNDY4Nw.GNfwS1.dZwPrlL3TE0cK9j_YE3LoHkOPu47FWlJr2S9is");