module.exports = {
    environment: 'development',
    port: 4009,
    protocol : 'http',
    TAG: "development",
    mongo: {
        dbName: 'pluto',
        dbUrl: "mongodb://localhost:27017/",
        options: {
        }
    },

    isDev:true
};
