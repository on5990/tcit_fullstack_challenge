import dotenv from "dotenv";
dotenv.config();
export const HOST: string = process.env.HOST || "localhost";
export const DB_PORT: string = process.env.DB_PORT || "5200";
export const DB_NAME: string = process.env.DB_NAME || "postdb";
export const DB_USER: string = process.env.DB_USER || "test_tcit";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "test_tcit";
export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 5001;
