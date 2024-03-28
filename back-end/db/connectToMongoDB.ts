import * as mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '');
    console.log('connect Mongo',);
  } catch (e) {
    console.log('Error connect Mongo', e);
  }
}

export default connectToMongoDB;
