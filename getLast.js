import { Dalle } from "dalle-node";

const dalle = new Dalle("sess-oMKpLoxhXmo5wt8CmBhQc5ji4f4ZdyfzA8hHzH8Y"); // Bearer Token 

const lastRun= await dalle.list({ limit: 1 });

console.log(lastRun.data[0].generations.data[0].generation.image_path);
