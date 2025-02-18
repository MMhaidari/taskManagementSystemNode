import mongoose from "mongoose";
import app from "./app";
import { config } from './config/index'

const PORT = process.env.PORT || 3000;
const DB = config.dabase_url;


mongoose.connect(DB).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
