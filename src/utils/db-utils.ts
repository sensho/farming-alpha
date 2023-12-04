import mongoose from 'mongoose';

const IS_PROD = process.env['NODE_ENV'] === 'PROD';

console.log('Is Production Env:', IS_PROD);

const MONGODB_URL = IS_PROD
	? process.env['MONGODB_URL_PROD']
	: process.env['MONGODB_URL_DEV'];

if (!MONGODB_URL) throw Error('No mongodb url provided');

export const establishConnectionToMongoDb = async () => {
	return mongoose
		.connect(MONGODB_URL, {})
		.catch((err) => console.log(`DB_CONN_ERR: ${err}`))
		.then(() =>
			console.log(
				`Connection to database at ${MONGODB_URL.substring(
					0,
					20
				)}... was successful`
			)
		);
};
