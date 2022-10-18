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
		res.status(404).json({ token: undefined });
		return;
	};

	bcrypt.compare(password, searchedUser.password, (err, result) => {
		if (result) {
			const token = jwt.sign({ id: searchedUser.id }, process.env.JWTSECRET);
			res.status(200).json({ success: true, token: token });
		} else {
			res.status(200).json({ sucess: false, token: undefined });
		};
	});
});

authRouter.post('/auth/user', async (req, res) => {
	const { email, password } = req.body.data;

	try {
		await createDatabaseUser(email, password);
		res.status(200).json({ success: true });
	} catch (e) {
		res.status(500).json({ err: e.message });
	};
});