const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const activeSongs = new Map();


const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
        console.log("Kon geen files vinden");
        return;

    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);







    }) 





    







});

 


bot.on("ready", async () => {

    console.log(`${bot.user.username} is opgestart.`)

    

    let activities = [`.help`, ` Streaming Music`, `Updating`, `!Help`];
    let i = 0;
    setInterval(
      () =>
        bot.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: "STREAMING"
        }),
      15000
    );
  }

)






bot.on("message", async message => {

    // Wanneer de bot een bericht stuurt stuur dan return.
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    var options = {
        active: activeSongs


    };




    if(commands) commands.run(bot,message, arguments, options);





  
    if (command === `${prefix}help`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("help")
            .setDescription("De commands zijn als volgt!:!help=Geeft alle commands| !info: Laat info zien over de bot| !play=Speelt muziek af| !leave=Laat de bot uit het kanaal gaan|")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85%22")
            .setFooter("?? created by JeffreyYT#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85%22")
            .setTimestamp();







        return message.channel.send(botEmbed); 

            

    
    

    
    
  




    }
    
    
        if (command === `${prefix}invite`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("???**Invite**???")
            .setDescription("** Hier is een link om de bot te inviten http://bit.ly/3i0tBqH**")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")  
            .setFooter("?? created by JeffreyYT???#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setTimestamp();



            
            
            

        return message.channel.send(botEmbed); 

    };




        
    if (command === `${prefix}prefix`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("???**Prefix**???")
            .setDescription("**Mijn Prefix is !**")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")  
            .setFooter("?? created by JeffreyYT???#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setTimestamp();



            
            
            

        return message.channel.send(botEmbed); 

    };
    


        
        

        





});

bot.login(process.env.token);
