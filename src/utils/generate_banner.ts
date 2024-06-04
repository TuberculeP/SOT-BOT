import * as PImage from "pureimage";
import * as fs from "fs";

export async function generateBanner(level: number) {
  const font = PImage.registerFont("./src/assets/windlass.ttf", "windlass");

  // register font
  font.loadSync();

  // make image
  const img1 = PImage.make(1024, 1024);

  // get canvas context
  const ctx = img1.getContext("2d");

  // set background to assets/guilde.png

  const imgStream = fs.createReadStream("./src/assets/guilde.png");
  const img = await PImage.decodePNGFromStream(imgStream);

  ctx.drawImage(img, 0, 0);

  // set font
  ctx.fillStyle = "#000000";
  ctx.font = "140pt Windlass";
  ctx.textAlign = "center";
  ctx.fillText("" + level, 512, 950);

  //write to 'out.png'
  await PImage.encodePNGToStream(
    img1,
    fs.createWriteStream("./src/output/banner.png")
  ).catch((e) => {
    console.log("there was an error writing");
  });
  console.log("wrote out the png file to out.png");
}