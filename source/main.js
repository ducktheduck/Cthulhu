const { Routes } = require('discord.js');
const { REST } = require('discordjs/rest');
const process = require('dotenv')
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client();
const commands = [
  {
    name: 'ping',
    description: 'Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken("MTE2NzQ5MTY3NDkyNzI4NDI5NQ.GgkBoj.A4_haQBrMpCNs1-P39g8BBTsK71RR85qq3x4Uw");

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands("1167491674927284295"), { body: commands });

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

client.login("MTE2NzQ5MTY3NDkyNzI4NDI5NQ.GgkBoj.A4_haQBrMpCNs1-P39g8BBTsK71RR85qq3x4Uw");