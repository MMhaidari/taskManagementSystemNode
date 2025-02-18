import app from "./app";
import databaseConnect from "./config/database";
import { config } from "./config/index";
import DatabaseConnectionError from "./errors/databaseConnection.error";

app.listen(config.port, async () => {
  databaseConnect().then(() => {
    console.log(`Server is running on http://localhost:${config.port}`);
  }).catch((error) => {
    console.error("Error connecting to database", (error as Error).message);
    throw new DatabaseConnectionError();
  })
})