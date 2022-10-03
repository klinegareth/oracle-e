import { Dalle } from "dalle-node";
import axios from "axios";
import sharp from "sharp";
import terminalImage from "terminal-image";
import inquirer from "inquirer";

const dalle = new Dalle("sess-oMKpLoxhXmo5wt8CmBhQc5ji4f4ZdyfzA8hHzH8Y"); // Bearer Token 

// Combines user input with prompt and sends it to DALLE 
const { question } = await inquirer.prompt([
  {
    type: "input",
	name: "question",
	message: "What question do you need an answer to?\n",
	  },
	]);
const prompt = `A tarot card in an 8-bit style to answer the question, "${question}"`;
const request = await dalle.generate(`${prompt}` , 1);
const generations = request.data;

for (const generation in generations) {
	// Get image from DALLE response data
	let imagePath = generations[generation].generation.image_path;
	let imageResponse = await axios.get(imagePath, { responseType: "arraybuffer" });
	let image = await sharp(imageResponse.data).toFormat('png').toBuffer();
	
	// Save image to file 
	let date = new Date();
	let dateString = date.toISOString().split('T')[0];
	let fileName = `Card ${generation}-${dateString}.png`;
	await sharp(image).toFile(`./cards/${fileName}`);

	// Display image in terminal
	console.log(await terminalImage.buffer(image));
}
