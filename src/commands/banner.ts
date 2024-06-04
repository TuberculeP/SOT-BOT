import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { generateBanner } from "#/utils/generate_banner";

// /banner preview <level>

const data = new SlashCommandBuilder()
  .setName("banner")
  .setDescription("Manage banner for the server.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("preview")
      .setDescription("Preview banner for a level.")
      .addIntegerOption((option) =>
        option
          .setName("level")
          .setDescription("The level to preview banner for.")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("set")
      .setDescription("Set banner for a level.")
      .addIntegerOption((option) =>
        option
          .setName("level")
          .setDescription("The level to set banner for.")
          .setRequired(true)
      )
  );

async function execute(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand()!;
  if (subcommand === "preview") {
    const level = interaction.options.getInteger("level")!;
    await generateBanner(level);

    return interaction.reply({
      content: `Banner for level ${level}`,
      files: ["./src/output/banner.png"],
    });
  } else if (subcommand === "set") {
    const guild = interaction.guild!;
    const level = interaction.options.getInteger("level")!;
    await generateBanner(level);

    await guild.setIcon("./src/output/banner.png").catch((e) => {
      console.log("there was an error setting banner");
    });
    return interaction.reply({
      content: `Banner for level ${level} has been set.`,
    });
  } else {
    return interaction.reply({
      content: "Invalid subcommand.",
    });
  }
}

export default {
  data,
  execute,
};
