import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { deployCommands } from "./deploy_commands";
import { config } from "./config";
import commands from "./commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("guildAvailable", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction: Interaction) => {
  // we only handle chat input command interactions
  if (!interaction.isCommand() || !interaction.inGuild()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(
      interaction as ChatInputCommandInteraction
    );
  }
});

client.login(config.TOKEN);
