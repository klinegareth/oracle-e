import { Dalle } from "dalle-node";
import axios from "axios";
import sharp from "sharp";
import terminalImage from "terminal-image";

const dalle = new Dalle("sess-oMKpLoxhXmo5wt8CmBhQc5ji4f4ZdyfzA8hHzH8Y"); // Bearer Token 

const last3Runs = await dalle.list({ limit: 3 });
const runs = last3Runs.data;
// console.log(JSON.stringify(runs[0].generations.data[0].generation.image_path, null, 1));

for (const run in runs) {
	let imagePath = runs[run].generations.data[0].generation.image_path;
	let imageResponse = await axios.get(imagePath, { responseType: "arraybuffer" });
	let image = await sharp(imageResponse.data).toFormat('png').toBuffer();


	const output = await terminalImage.buffer(image);
	console.log(output);
}


