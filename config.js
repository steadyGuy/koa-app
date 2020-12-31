module.exports = {
    mongodb: {
        uri: (process.env.NODE_ENV == 'test')
            ? 'mongodb://localhost/user_app_test'
            : 'mongodb://localhost/user_app'
    },
    crypto: {
        iterations: (process.env.NODE_ENV == 'test' ? 1 : 12000),
        length: 128,
        digest: 'sha512'
    }
}