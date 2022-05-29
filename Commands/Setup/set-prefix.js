const Discord = require('discord.js');
const mongodb = require('mongoose')
const prefixSchema = require('../../Modelos/prefixModel.js')
const { Client, Message } = require("discord.js")

module.exports = {
  name: "setprefix", 
  alias: [], 
  owner: false,
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) {
    message.reply(client.la[message.guild.preferredLocale]["setprefix"]["adminmessage"]["var1"])
    return;
  }

  const res = args.join(" ")
  if(!res) return message.reply(client.la[message.guild.preferredLocale]["setprefix"]["res"]["var2"])

  prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if(err) throw err;
    if(data) {
      prefixSchema.findOneAndDelete({ Guild: message.guild.id })
      data = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res
      })
      data.save()
      message.reply(`${client.la[message.guild.preferredLocale]["setprefix"]["actu"]["var3"]}  **${res}**`)
    } else {
      data = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res
      })
      data.save()
      message.reply(`${client.la[message.guild.preferredLocale]["setprefix"]["actu"]["var4"]} **${res}**`)
    }
  })
 

 }

} 

/**
 * @JeremiasBots#3355
 * Asegurate de no vender este codigo
 * Usalo como base para un sistema de idiomas o como tu bot si estas empezando
 */