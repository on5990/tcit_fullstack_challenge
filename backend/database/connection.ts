import { Sequelize } from "sequelize";
import {
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  HOST,
} from "../constants/constants";
const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: false,
});
export default dbConnection;
