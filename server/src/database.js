import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
import bcrypt from 'bcrypt';

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
});

if (process.env.ENVIRONMENT === "PRODUCTION") {
	pool.ssl = {
		rejectUnauthorized: false
	};
};

export async function getDatabaseUserByEmail(email) {
	return await pool.query('SELECT * FROM users WHERE email = $1', [email])
		.then((res) => {
			return res.rows[0];
		}).catch((err) => {
			return undefined;
		});
};

export async function createDatabaseUser(email, password) {
	const user = await getDatabaseUserByEmail(email);
	if (user) return { success: false, err: 'User exists' };

	const hashPassword = generateHashPassword(password);
	const client = await pool.connect();

	let newUser;
	try {
		client.query('BEGIN');
		const usersQueryResult = await client.query(
			'INSERT INTO users(email, password, create_date) VALUES($1, $2, $3) RETURNING *',
			[email, hashPassword, getDateUTC()]
		);

		newUser = usersQueryResult.rows[0];

		await client.query(
			'INSERT INTO balance(balance, user_id) VALUES($1, $2)',
			[100000, usersQueryResult.rows[0].id]
		);
		client.query('COMMIT');
	} catch (e) {
		client.query('ROLLBACK');

		throw new Error(
			"An error occurred while saving data."
		);
	} finally {
		client.release();
	};

	return newUser;
};

export function getUserBalance(userId) {
	return pool.query('SELECT * FROM balance WHERE user_id = $1', [userId])
		.then((response) => {
			return response.rows[0].balance;
		}).catch((err) => {
			return 0;
		});
};

export function updateUserBalance(userId, newBalance) {
	pool.query('UPDATE balance SET balance = $1 WHERE user_id = $2', [newBalance, userId])
		.catch((err) => {
			console.log(err);
		});
};

export function getUserStocks(userId) {
	return pool.query('SELECT * FROM stocks WHERE user_id = $1', [userId])
		.then((response) => {
			if (response.rows.length === 0) return [];
			return response.rows;
		}).catch((err) => {
			return [];
		});
};

export async function updateUserStock(userId, stock, amount, key) {
	const currentStockAmount = await pool.query('SELECT amount_own FROM stocks WHERE user_id = $1 AND stock_symbol = $2', [userId, stock.symbol]);
	if (key === 'Buy') {
		if (currentStockAmount.rowCount > 0) {
			const updatedAmount = parseFloat(currentStockAmount.rows[0].amount_own) + parseFloat(amount);
			await pool.query('UPDATE stocks SET amount_own = $1 WHERE user_id = $2 AND stock_symbol = $3', [updatedAmount, userId, stock.symbol]);
		} else {
			await pool.query('INSERT INTO stocks(company_name, stock_symbol, amount_own, user_id) VALUES($1, $2, $3, $4)', [stock.companyName, stock.symbol, amount, userId]);
		};
	} else if (key === 'Sell') {
		if (currentStockAmount.rowCount === 0) return;
		const updatedAmount = parseFloat(currentStockAmount.rows[0].amount_own) - parseFloat(amount);
		if (updatedAmount < 0) {
			return;
		} else if (updatedAmount === 0) {
			await pool.query('DELETE FROM stocks WHERE user_id = $1 AND stock_symbol = $2', [userId, stock.symbol]);
		};
		await pool.query('UPDATE stocks SET amount_own = $1 WHERE user_id = $2 AND stock_symbol = $3', [updatedAmount, userId, stock.symbol]);
	};
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