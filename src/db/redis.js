const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on("error", function (error) {
    console.error(error);
});

function getByKey(key) {
    return new Promise((resv, rej) => {
        client.get(key, (err, reply) => {
            resv(reply);
        });
    })

}

module.exports = { client, redis, getByKey };