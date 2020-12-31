const mongoose = require('mongoose');
const crypto = require('crypto');
const connection = require('../libs/connection');
const config = require('../config');


const schema = new mongoose.Schema({
    email: {
        type: String,
        required: 'E-mail пользователя не должен быть пустым.',
        unique: 'такой email уже есть',
        validate: [{
            validator: value => {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: 'Некорректный email'
        }]
    },
    displayName: {
        type: String,
        unique: 'Такое имя уже существует',
        required: 'У пользователя должно быть имя'
    },
    passwordHash: {
        type: String
    },
    salt: {
        type: String
    }
}, {
    timestamps: true
});

function generatePassword(salt, password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password, salt,
            config.crypto.iterations,
            config.crypto.length,
            config.crypto.digest,
            (err, key) => {
                if (err) return reject(err);
                resolve(key.toString('hex'));
            }
        );
    });
}

function generateSalt() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(config.crypto.length, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer.toString('hex'));
        })
    })
}

schema.methods.setPassword = async function (password) {
    this.salt = await generateSalt();
    this.passwordHash = await generatePassword(this.salt, password);
}

schema.methods.checkPassword = async function (password) {
    if(!password) return false;

    const hash = await generatePassword(this.salt, password);
    return hash === this.passwordHash;
}


module.exports = connection.model('User', schema); // create collection named 'users'
