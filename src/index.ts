import dotenv from 'dotenv';
dotenv.config();

import { establishConnectionToMongoDb } from './utils/db-utils';
import { FarmingBot } from './services/bot';

const main = async () => {
	await establishConnectionToMongoDb();

	new FarmingBot().start();
};

main().catch((err) => {
	console.error(err);
});
