import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function execute(interaction: ChatInputCommandInteraction) {
  return interaction.reply("Pong!");
}

export default {
  data,
  execute,
};
