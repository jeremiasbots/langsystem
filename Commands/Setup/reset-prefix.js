const Discord = require('discord.js');
const mongodb = require('mongoose')
const prefixSchema = require('../../Modelos/prefixModel.js')
const { Client, Message } = require("discord.js")

module.exports = {
  name: "reset-prefix", 
  alias: [], 
  cooldown: 0,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   * @returns 
   */

async execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) {
    message.reply(client.la[message.guild.preferredLocale]["resetprefix"]["adminmessage"]["var5"])
    return;
  }

  await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
  message.reply(`${client.la[message.guild.preferredLocale]["resetprefix"]["end"]["var6"]} **${client.prefix}**`)

 }

} 

/**
 * @JeremiasBots#3355
 * Asegurate de no vender este codigo
 * Usalo como base para un sistema de idiomas o como tu bot si estas empezando
 */