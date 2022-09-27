import { Dalle } from "dalle-node";

const dalle = new Dalle("sess-oMKpLoxhXmo5wt8CmBhQc5ji4f4ZdyfzA8hHzH8Y"); // Bearer Token 

(async () => {
  const generations = await dalle.generate("a tarot spread in an 8-bit style", 1);

  console.log(generations)
})();
