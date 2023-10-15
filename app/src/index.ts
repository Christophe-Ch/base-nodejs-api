import prepareApp from './app';
import prepareDatabase from './db';
import { configDotenv } from 'dotenv';
import path from 'path';

main().catch(err => console.error(err));

async function main(): Promise<void> {
    configDotenv({ path: path.resolve(__dirname, '../env/.env') });

    await prepareDatabase();
    prepareApp();
}