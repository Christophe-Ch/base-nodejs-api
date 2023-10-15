import mongoose from 'mongoose';

async function prepareDatabase(): Promise<void> {
    console.log("Connecting to database...");
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`);
    console.log("Connected to database!");
}

export default prepareDatabase;