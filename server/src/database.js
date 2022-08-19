import pg from 'pg';
import bcrypt from 'bcrypt';

const pool = new pg.Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
});

export function getDatabaseUserByEmail(email) {
	return pool.query('SELECT * FROM users WHERE email = $1', [email])
		.then((res) => {
			return res.rows[0];
		}).catch((err) => {
			setImmediate(() => {
				throw err;
			});
		});
};

export async function createDatabaseUser(email, password) {
	const user = await getDatabaseUserByEmail(email);
	if (user) return false;

	const hashPassword = generateHashPassword(password);
	pool.query('INSERT INTO users(email, password, create_date) VALUES($1, $2, $3)', [email, hashPassword, getDateUTC()], (err, res) => {
		if (err) {
			return { success: false, err: err };
		};

		pool.query('INSERT INTO balance(balance) VALUES($1)', [100000]);
	});
	console.log(`User ${email} created`);
	return { success: true, err: 'none' };
};

export function getUserBalance(userId) {
	return pool.query('SELECT * FROM balance WHERE user_id = $1', [userId]);
};

export function getUserStocks(userId) {
	return pool.query('SELECT * FROM stocks WHERE user_id = $1', [userId]);
};

function generateHashPassword(password) {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hashPassword = bcrypt.hashSync(password, salt);
	return hashPassword;
};

function getDateUTC() {
	const current = new Date();
	return `${current.getUTCFullYear()}-${current.getUTCMonth()+1}-${current.getUTCDate()}`;
};