// If you live and die by the D.R.Y rule... Turn back now. I've repeated myself too many times here for an excuse, but I'll make one anyway! I'm tired and wanted the level up stuff sorted based on the language channel the user was in.

// TODO: Streamline the process in a future update.


const Discord = require('discord.js');
const fs = require('fs'); // We need to require fs, it is packaged with NodeJS so no need to download anything extra
const profanities = require('profanities'); // We need to require all of our packages after we install them

// We need to call this file for our configuration
const config = require('../config/application.json');

// We need to call this file for the experience system to work properly
const experience = require('../storage/experience.json');

module.exports = async message => {
  const {client} = message;

  // If the author of the message is the bot, would you kindly ignore it
  if (message.author.bot) return;

  // Remove the prefix from the original message
  const command = message.content.split(' ')[0].slice(config.prefix.length);
  // So we're left with only the command
  const params = message.content.split(' ').slice(1);
  // Setup our permissions & elevation
  const perms = client.elevation(message);
  // Empty variable, for us to bulk out later
  let cmd;

  // Check if the command sent actually exists
  if (client.commands.has(command)) {
    // Retrieve the command
    cmd = client.commands.get(command);
    // Check if the command sent is an alias of a command that exists
  } else if (client.aliases.has(command)) {
    // Retrieve the command
    cmd = client.commands.get(client.aliases.get(command));
  }

  // If the command exists, check against their permissions
  if (cmd) {
    // If their permissions are too low
    if (perms < cmd.conf.permlvl) {
      // Notify the user via private messages
      message.author.send(['ERROR: Permission denied']);
      // Delete the message
      message.delete();
    } else {
      // If they have the appropriate permissions, run the command
      cmd.run(client, message, params, perms);
    }
  }

  // PROFANITY
  for (let i = 0; i < profanities.length; i += 1) {
    // Loop every word in the message
    if (message.content === profanities[i]) {
      // Tell the user they can't say such things
      message.channel.send("Hey! Don't say that.");
      // Remove the message
      message.delete();
      // Stops commands running if they've got profanity in their message
      return;
    }
  }

  // EXPERIENCE
  // Randomize how much experience the user is given per message
  const gainExperience = Math.floor(Math.random() * 7) + 8;

  // TESTING PURPOSES ONLY. REMOVE WHEN LIVE.
  console.log(gainExperience);

  // If a user doesn't already exist, create an entry
  if (!experience[message.author.id]) {
    experience[message.author.id] = {
      username: message.author.username,
      experience: 0,
      level: 1
    };
  }

  // Get their current experience based on the entry in experience.json
  const currExperience = experience[message.author.id].experience;
  // Get their current level based on the entry in experience.json
  const currLevel = experience[message.author.id].level;
  // Get their next level based on their level multiplied by 300
  const nextLevel = experience[message.author.id].level * 300;

  // Take their current experience, and add on any experience gained
  experience[message.author.id].experience = currExperience + gainExperience;

  // If the channel is the Spanish community
  if (message.channel.id === '397778495591153686') {
    // If their level is equal to or higher than their current
    if (nextLevel <= experience[message.author.id].experience) {
      // Increase the level by 1
      experience[message.author.id].level = currLevel + 1;

      // Create the embed to show they levelled up their account
      const levelUp = new Discord.RichEmbed()
        .setTitle(`Has subido de nivel!`)
        .setColor('#ffd700')
        .setTimestamp()
        .addField('Siguiente nivel: ', currLevel + 1);

      // Send the embed to the channel, then remove it after 5 seconds
      message.channel.send(levelUp).then(msg => {
        msg.delete(5000);
      });
    }
  } else if
  // If the channel is the Polish community  
  (message.channel.id === '397778541443284994') {
    // If their level is equal to or higher than their current
    if (nextLevel <= experience[message.author.id].experience) {
      // Increase the level by 1
      experience[message.author.id].level = currLevel + 1;

      // Create the embed to show they levelled up their account
      const levelUp = new Discord.RichEmbed()
        .setTitle(`Zyskałeś poziom!`)
        .setColor('#ffd700')
        .setTimestamp()
        .addField('Następny poziom: ', currLevel + 1);

      // Send the embed to the channel, then remove it after 5 seconds
      message.channel.send(levelUp).then(msg => {
        msg.delete(5000);
      });
    }
  } else
  // If the channel is the French community  
  if (message.channel.id === '397778927957049357') {
    // If their level is equal to or higher than their current
    if (nextLevel <= experience[message.author.id].experience) {
      // Increase the level by 1
      experience[message.author.id].level = currLevel + 1;

      // Create the embed to show they levelled up their account
      const levelUp = new Discord.RichEmbed()
        .setTitle(`Vous avez gagné un niveau!`)
        .setColor('#ffd700')
        .setTimestamp()
        .addField('Niveau suivant: ', currLevel + 1);

      // Send the embed to the channel, then remove it after 5 seconds
      message.channel.send(levelUp).then(msg => {
        msg.delete(5000);
      });
    }
  } else
  // If the channel is the Netherlands community
  if (message.channel.id === '410578603647172618') {
    // If their level is equal to or higher than their current
    if (nextLevel <= experience[message.author.id].experience) {
      // Increase the level by 1
      experience[message.author.id].level = currLevel + 1;

      // Create the embed to show they levelled up their account
      const levelUp = new Discord.RichEmbed()
        .setTitle(`Je hebt een niveau bereikt!`)
        .setColor('#ffd700')
        .setTimestamp()
        .addField('Volgende niveau: ', currLevel + 1);

      // Send the embed to the channel, then remove it after 5 seconds
      message.channel.send(levelUp).then(msg => {
        msg.delete(5000);
      });
    }
  } else
  // If the channel is the German community
  if (message.channel.id === '410578639856467968') {
    // If their level is equal to or higher than their current
    if (nextLevel <= experience[message.author.id].experience) {
      // Increase the level by 1
      experience[message.author.id].level = currLevel + 1;

      // Create the embed to show they levelled up their account
      const levelUp = new Discord.RichEmbed()
        .setTitle(`Du hast ein Level erreicht!`)
        .setColor('#ffd700')
        .setTimestamp()
        .addField('Nächste Ebene: ', currLevel + 1);

      // Send the embed to the channel, then remove it after 5 seconds
      message.channel.send(levelUp).then(msg => {
        msg.delete(5000);
      });
    }
  } else {
    // If their level is equal to or higher than their current
    if (nextLevel <= experience[message.author.id].experience) {
      // Increase the level by 1
      experience[message.author.id].level = currLevel + 1;

      // Create the embed to show they levelled up their account
      const levelUp = new Discord.RichEmbed()
        .setTitle(`You have gained a level!`)
        .setColor('#ffd700')
        .setTimestamp()
        .addField('Next level: ', currLevel + 1);

      // Send the embed to the channel, then remove it after 5 seconds
      message.channel.send(levelUp).then(msg => {
        msg.delete(5000);
      });
    }
  }

  // Write the changes to our experience file
  fs.writeFile(
    './storage/experience.json',
    JSON.stringify(experience, null, 4),
    err => {
      // If there are any problems whilst trying to update the user, log an error
      if (err) console.log(err);
    }
  );
};
