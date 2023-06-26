import "../models/postModel";
import dbConnection from "./connection";
async function synchronize() {
  await dbConnection.sync({ force: false, alter: true });
}
export default synchronize;
