import prepareApp from './app';
import prepareDatabase from './db';
import { configDotenv } from 'dotenv';
import path from 'path';
import logger from './logger';

main().catch(err => logger.error(err));

/**
 * Server entrypoint.
 */
async function main(): Promise<void> {
    configDotenv({ path: path.resolve(__dirname, '../env/.env') });

    await prepareDatabase();
    prepareApp();
}