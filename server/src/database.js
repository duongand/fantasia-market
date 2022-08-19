import pg from 'pg';
import bcrypt from 'bcrypt';

const pool = new pg.Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'admin',
	port: '5432'
});

export async function getDatabaseUserByEmail(email) {
	return await pool.query('SELECT * FROM users WHERE email = $1', [email])
		.then((res) => {
			return res.rows[0];
		}).catch((err) => {
			console.log(err);
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
	return pool.query('SELECT * FROM balance WHERE user_id = $1', [userId])
		.then((response) => {
			return response.rows[0].balance;
		}).catch((err) => {
			console.log(err);
			return undefined;
		});
};

export function getUserStocks(userId) {
	return pool.query('SELECT * FROM stocks WHERE user_id = $1', [userId])
		.then((response) => {
			if (response.rows.length === 0) {
				return [];
			};
			return response.rows;
		}).catch((err) => {
			console.log(err);
			return [];
		});
};

export function updateUserStock(userId, symbol, newAmount) {
	pool.query('UPDATE stocks SET amount_own = $1 WHERE user_id = $2 AND stock_symbol = $3', [newAmount, userId, symbol]);
};

export function updateUserBalance(userId, newBalance) {
	pool.query('UPDATE balance SET balance = $1 WHERE user_id = $2', [newBalance, userId]);
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