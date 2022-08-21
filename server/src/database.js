import pg from 'pg';
import bcrypt from 'bcrypt';

const pool = new pg.Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABSE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
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
			return 0;
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

export async function updateUserStock(userId, symbol, amount, key) {
	const currentStockAmount = await pool.query('SELECT amount_own FROM stocks WHERE user_id = $1 AND stock_symbol = $2', [userId, symbol]);
	if (key === 'buy') {
		if (currentStockAmount.rowCount > 0) {
			const updatedAmount = parseInt(currentStockAmount.rows[0].amount_own) + parseInt(amount);
			await pool.query('UPDATE stocks SET amount_own = $1 WHERE user_id = $2 AND stock_symbol = $3', [updatedAmount, userId, symbol]);
		} else {
			await pool.query('INSERT INTO stocks(stock_symbol, amount_own, user_id) VALUES($1, $2, $3)', [symbol, amount, userId]);
		};
	} else if (key === 'sell') {
		if (currentStockAmount.rowCount === 0) return;

		const updatedAmount = parseInt(currentStockAmount.rows[0].amount_own) - parseInt(amount);
		if (updatedAmount < 0) {
			return;
		} else if (updatedAmount === 0) {
			await pool.query('DELETE FROM stocks WHERE user_id = $1 AND stock_symbol = $2', [userId, symbol]);
		};
		await pool.query('UPDATE stocks SET amount_own = $1 WHERE user_id = $2 AND stock_symbol = $3', [updatedAmount, userId, symbol]);
	};
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
	return `${current.getUTCFullYear()}-${current.getUTCMonth() + 1}-${current.getUTCDate()}`;
};