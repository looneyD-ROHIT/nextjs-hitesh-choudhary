import mongoose from "mongoose";
import chalk from "chalk";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(chalk.green("Connected to database"));
    });
    connection.on("error", (error) => {
      console.log(chalk.red("Error connecting to database"));
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log(chalk.red("Error connecting to database"));
    console.log(error);
  }
}
