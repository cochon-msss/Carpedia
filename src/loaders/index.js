import expressLoader from "./express";
import postgreLoader from "./postgre";

export default async ({ expressApp }) => {
  const postgreConntection = await postgreLoader();
  console.log("Postgre Initialized");
  await expressLoader({ app: expressApp });
  console.log("Express Initialized");
};
