var redis = require('redis');
const {promisify} = require('util');
const config = require('../../config/config');

var client = redis.createClient(config.redisOpForRing); //127.0.0.1:6379

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const hsetAsync = promisify(client.hset).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const hgetAllAsync = promisify(client.hgetall).bind(client);

const saddAsync = promisify(client.sadd).bind(client);
const sismemberAsync = promisify(client.sismember).bind(client);
const smembersAsync = promisify(client.smembers).bind(client);

const zaddAsync = promisify(client.zadd).bind(client);
const zscoreAsync = promisify(client.zscore).bind(client);
const zrangeAsync = promisify(client.zrange).bind(client);
const zrevrangeAsync = promisify(client.zrevrange).bind(client);
const zrangebyscoreAsync = promisify(client.zrangebyscore).bind(client);
const zrevrangebyscoreAsync = promisify(client.zrevrangebyscore).bind(client);
const zincrbyAsync = promisify(client.zincrby).bind(client);
const zcardAsync = promisify(client.zcard).bind(client);
const zrankAsync = promisify(client.zrank).bind(client);
const zrevrankAsync = promisify(client.zrevrank).bind(client);

const lpushAsync = promisify(client.lpush).bind(client);
const lpopAsync = promisify(client.lpop).bind(client);
const rpushAsync = promisify(client.rpush).bind(client);
const rpopAsync = promisify(client.rpop).bind(client);
const llenAsync = promisify(client.llen).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);
const lindexAsync = promisify(client.lindex).bind(client);
const publishAsync = promisify(client.publish).bind(client);

const delAsync = promisify(client.del).bind(client);

const createClient = function(options){
    return redis.createClient(options);
};

module.exports = {
    createClient,
    client,
    getAsync,
    setAsync,

    hsetAsync,
    hgetAsync,
    hgetAllAsync,

    saddAsync,
    sismemberAsync,
    smembersAsync,

    zaddAsync,
    zscoreAsync,
    zrangeAsync,
    zrevrangeAsync,
    zrangebyscoreAsync,
    zrevrangebyscoreAsync,
    zincrbyAsync,
    zcardAsync,
    zrankAsync,
    zrevrankAsync,

    lpushAsync,
    lpopAsync,
    rpushAsync,
    rpopAsync,
    llenAsync,
    lrangeAsync,
    lindexAsync,
    publishAsync,
    delAsync
};