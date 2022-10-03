import { Dalle } from "dalle-node";
import axios from "axios";
import sharp from "sharp";
import terminalImage from "terminal-image";

const dalle = new Dalle("sess-oMKpLoxhXmo5wt8CmBhQc5ji4f4ZdyfzA8hHzH8Y"); // Bearer Token 

console.log(parsedTarot["tarot-interpretations"]);

const request = await dalle.generate("a tarot card in an 8-bit style", 1);

const generations = request.data;
console.log(JSON.stringify(generations, null, 1));

for (const generation in generations) {
	let imagePath = generations[generation].generation.image_path;
	let imageResponse = await axios.get(imagePath, { responseType: "arraybuffer" });
	let image = await sharp(imageResponse.data).toFormat('png').toBuffer();

	const output = await terminalImage.buffer(image);
	console.log(output);
}
