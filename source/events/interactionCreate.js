const {Events} = require('discord.js');

module.exports = {

    name: Events.InteractionCreate,

    async execute(interaction) {

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
        
                await interaction.followUp({content: 'Error occured when executing command!', ephemeral: true});
        
            } else {
                await interaction.reply({content: 'Error occured when executing command!    ', ephemeral: true});
            } 
        }
          
          
    }
}