// Dependecies
const logger = require('../modules/logging/logger');
const chalk = require('chalk');
const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports.run = async (config) => {
	// This will check if the config is correct
	logger.log('=-=-=-=-=-=-=- Config file Verification -=-=-=-=-=-=-=');
	logger.log('Verifing config..');
	let error;

	// Make sure Node.js V12 or higher is being ran.
	if (process.version.slice(1).split('.')[0] < 12) {
		logger.error('Node 12 or higher is required.');
		error = true;
	}

	// check owner ID
	if (!config.ownerID) {
		logger.error(`${chalk.red('✗')} Bot ownerID is missing.`);
		error = true;
	}

	// check token
	if (!config.token) {
		logger.error(`${chalk.red('✗')} Bot token is missing.`);
		error = true;
	} else {
		const client = new Discord.Client();
		await client.login(config.token).catch(e => {
			if (e.message == 'An invalid token was provided.') {
				logger.error(`${chalk.red('✗')} Bot token is incorrect.`);
				error = true;
			}
		});
	}



	

	// Check Youtube API
	if (!config.YoutubeAPI_Key) {
		logger.error(`${chalk.red('✗')} Youtube API key is missing.`);
		error = true;
	}

	// Check Soundcloud API
	if (!config.soundcloudAPI_Key) {
		logger.error(`${chalk.red('✗')} Soundcloud API key is missing.`);
		error = true;
	}


	// Check Amethyste API
	if (!config.amethysteAPI_KEY) {
		logger.error(`${chalk.red('✗')} Amethyste API key is missing.`);
		error = true;
	} else {
		const res = await fetch('https://v1.api.amethyste.moe/generate/blurple', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.amethysteAPI_KEY}`,
			},
		});
		const result = await res.json();
		if (result.status === 401) {
			logger.error(`${chalk.red('✗')} Invalid Amethyste API key.`);
			error = true;
		}
	}

	
	// Check fall back server settings setup
	if (!config.defaultSettings) {
		logger.error(`${chalk.red('✗')} Fallback server settings is missing.`);
		error = true;
	}

	// Check custom emojis
	if (!config.emojis) {
		logger.error(`${chalk.red('✗')} Custom emoji list is missing.`);
		error = true;
	}
	// Check mongodb connection
	if (!config.MongoDBURl) {
		logger.error(`${chalk.red('✗')} MongoDB URl is missing.`);
		error = true;
	} else {
		const mongoose = require('mongoose');
		await mongoose.connect(config.MongoDBURl, { useUnifiedTopology: true, useNewUrlParser: true }).catch(() => {
			logger.log(`${chalk.red('✗')} Unable to connect to database.`);
			error = true;
		});
	}

	// keep at end
	if (error != true) {
		logger.log(`${chalk.green('✓')} Config has been verified.`);
		error = false;
		return error;
	} else {
		logger.error(`${chalk.red('✗')} Config has errors to fix.`);
		return error;
	}
};
