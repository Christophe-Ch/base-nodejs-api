import mongoose from 'mongoose';
import logger from './logger';

/**
 * Connect to mongodb using credentials specified in .env file.
 */
async function prepareDatabase(): Promise<void> {
    logger.info('Connecting to database...');
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`);
    logger.info('Connected to database!');
}

export default prepareDatabase;