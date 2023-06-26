import app from "./app";
import { SERVER_PORT } from "./constants/constants";
import dbConnection from "./database/connection";
import synchronize from "./database/synchronize";

async function main() {
  try {
    app.listen(SERVER_PORT, () => {
      console.log(`Running in port ${SERVER_PORT}`);
    });
    await dbConnection.authenticate();
    console.log("Connection has been established successfully.");
    await synchronize();
    console.log("Tables synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
