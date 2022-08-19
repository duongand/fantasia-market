import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
	getDatabaseUserByEmail,
	createDatabaseUser
} from './database.js';

export const authRouter = express.Router();

authRouter.post('/auth/login', async (req, res) => {
	const { email, password } = req.body.data;
	const searchedUser = await getDatabaseUserByEmail(email);

	if (!searchedUser) {
		res.status(404).json({
			token: null
		});
		return;
	};

	bcrypt.compare(password, searchedUser.password, (err, result) => {
		const token = jwt.sign({
			id: searchedUser.id
		}, process.env.JWTSECRET);

		res.status(200).json({
			token: token
		});
	});
});

authRouter.post('/auth/user', async (req, res) => {
	const { email, password } = req.body.data;
	const response = await createDatabaseUser(email, password);
	if (!response.success) {
		res.status(500).json({
			err: response.err
		});
		return;
	};

	res.status(200).json({
		err: response.err
	});
});