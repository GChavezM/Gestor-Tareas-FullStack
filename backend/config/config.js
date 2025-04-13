require('dotenv').config();
const useSSLDev = process.env.DB_SSL === 'true';
module.exports = {
	development: {
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'postgres',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		dialectOptions: useSSLDev
			? {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				}
			: {},
	},
	test: {
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'postgres',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
	},
	production: {
		username: process.env.PROD_DB_USERNAME || 'postgres',
		password: process.env.PROD_DB_PASSWORD || 'postgres',
		database: process.env.PROD_DB_NAME || 'postgres',
		host: process.env.PROD_DB_HOST || 'localhost',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
