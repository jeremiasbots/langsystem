const Discord = require("discord.js")
const client = new Discord.Client({ intents: 32767, restTimeOffset: 0, partials: ["USER", "CHANNEL", "REACTION", "MESSAGE"] })
const mongodb = require("mongoose")
const prefixSchema = require("./Modelos/prefixModel.js")
const config = require("./config.json")
const { readdirSync, fstat } = require("fs")
require('colors')
require('dotenv').config()

mongodb.connect(process.env.mongodb)

mongodb.connection.on('open', () => console.log("Se ha conectado con exito a MongoDB!"));

mongodb.connection.on('close', () => console.log('DB Cerrada'));

client.on("ready", () => {
    console.log("Bot listo")
})


client.color = config.embedcolor
client.footer = config.embedfooter
client.owner = config.owner
client.prefix = config.prefix
client.commands = new Discord.Collection();
client.la = {};
let idiomas = readdirSync('./Idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""))
for(const las of idiomas){
    client.la[las] = require(`./Idiomas/${las}`)
    if(las === "en-GB"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "da"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "de"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "fr"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "hr"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "it"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "lt"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "hu"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "nl"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "no"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "pl"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "pt-BR"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "ro"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "fi"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "sv-SE"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "vi"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "tr"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "cs"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "el"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "bg"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "ru"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "uk"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "hi"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "th"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "zh-CN"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "ja"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "zh-TW"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
    if(las === "ko"){
        client.la[las] = require(`./Idiomas/en-US.json`)
    }
}
Object.freeze(client.la)


const commandFolders = readdirSync("./Commands");
  for(const folder of commandFolders) {
    const commandFiles = readdirSync(`./Commands/${folder}`).filter(files => files.endsWith(".js"));
    for(const file of commandFiles) {
      const command = require(`./Commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    }  
  }
  


client.on("messageCreate", async(message) => {
    let prefix;

  const data = await prefixSchema.findOne({ Guild: message.guild.id }).catch(err => console.log(err))

  if(data) {
    prefix = data.Prefix;
  } else {
    prefix = client.prefix
  }

    if(!message.content.startsWith(prefix)) return;

    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));


    if(cmd){
        try {
            cmd.execute(client, message, args)
        } catch (error) {
            message.reply(`Ocurrio un error por favor contactate con **${client.users.cache.get(client.owner).tag}** para solucionarlo`)
        }
    } 

   

    if(!cmd){
        const embed = new Discord.MessageEmbed()
        .setTitle("❌ `|` Ha ocurrido un error")
        .setDescription("El comando que executaste no existe")
        .setColor(client.color)
        .setFooter({ text: client.footer })

        message.reply({ embeds: [embed] })
    }
})

client.login(process.env.token)

/**
 * @JeremiasBots#3355
 * Asegurate de no vender este codigo
 * Usalo como base para un sistema de idiomas o como tu bot si estas empezando
 */