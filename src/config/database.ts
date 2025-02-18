import mongoose from "mongoose";
import { config } from "./index";
import NotFoundError from "../errors/notFound.error";

const databaseConnect = async (): Promise<void> => {
    const DB = config.dabase_url;

    if (!DB) {
        throw new NotFoundError("Database URL not found");
    }

    await mongoose.connect(DB);
}

export default databaseConnect;