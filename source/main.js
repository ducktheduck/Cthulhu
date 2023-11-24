const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes} = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("../config.json")


client.commands = new Collection();
console.log(__dirname)

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Append a new command into the collection
    if ('data' in command && 'execute' in command) {

      client.commands.set(command.data.name, command);

    } else {

      console.log(`[Warning]: Command at ${filePath} is missing a required "data" or "execute" property!`);

    }
  }
}


// Register slash commands
const rest = new REST().setToken(config.token);

(async () => {
  try {

    console.log('Started refreshing application (/) commands.');
  
    const data = await rest.put(
      Routes.applicationGuildCommands(config.client_id, config.guild_id),
      {body: commands},
    );
  
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);

  } catch (error) {
    console.error(error);
  }
})


client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {

    console.error(`No command ${interaction.commandName} was found!`)
    return;
  }

  try {

    await command.execute(interaction);

  } catch (error) {

    console.error(error);

    if (interaction.replied || interaction.deferred) {

      await interaction.followUp({content: 'An error occured when executing this command!', ephemeral: true});

    } else {
      await interaction.reply({content: 'An error occured when executing this command!', ephemeral: true});
    }
  }

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(config.token);