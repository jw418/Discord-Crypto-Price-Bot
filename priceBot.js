const { Client, GatewayIntentBits } = require("discord.js");
const Aggregator = require(`./AggregatorV3Interface.json`);
const Web3 = require('web3');
const rpcMainnet = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;
require("dotenv").config(); // to preload env varables use this command : node -r dotenv/config pricebot.js
// const rpcGoreli = `https://goerli.infura.io/v3/${process.env.INFURA_ID}`;

// mainnet Aggregator Chainlink Contracts addresses
const btcUsdAddress = "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c";
const ethUsdAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
const adaUsdAddress = "0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55";
const atomUsdAddress = "0xDC4BDB458C6361093069Ca2aD30D74cc152EdC75";


let price;
const priceFeed = async (address) => {
    const web3 = new Web3(rpcMainnet);    
    const aggregatror = new web3.eth.Contract(Aggregator.abi, address);    
    const tx = await aggregatror.methods.latestRoundData().call(); 
    price = (tx.answer / (10**8)).toFixed(2).toString();
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on("ready", () => {
    console.log("Crypto Price Bot Connected...");
});

client.on("messageCreate", async (message)  => {

    if(message.author.bot) return;

    if(message.content == "!btc"){
        await priceFeed(btcUsdAddress);     
        message.reply("1 BTC = "+  price +" usd");        
    }else if(message.content == "!eth"){
        await priceFeed(ethUsdAddress);
        message.reply("1 ETH = "+ price +" usd");
    }else if(message.content == "!atom"){
        await priceFeed(atomUsdAddress);
        message.reply("1 ATOM = "+ price +" usd");
    }else if(message.content == "!ada"){
        await priceFeed(adaUsdAddress);
        message.reply("1 ADA = "+ price +" usd");
    }else if(message.content == "!help"){        
        message.reply("!btc = BTC/USD\n!ada = ADA/USD\n!eth =ETH/USD\n!atom = ATOM/USD");
    }
});

client.login(process.env.DISCORD_KEY);