const { REST, Routes } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("../config.json")

const commands = [
  {
    name: 'ping',
    description: 'Pong!',
  }
];

const rest = new REST({ version: '10' }).setToken(config.token);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(config.client_id), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(config.token);