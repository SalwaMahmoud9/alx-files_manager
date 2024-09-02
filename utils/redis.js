import redis from 'redis';
import { promisify } from 'util';

/**
 * RedisClient
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
    });
  }

  /**
   * Check connection
   * @return {boolean} true or false
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * get value
   * @key {string} key
   * @return {string}  value of key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Create new key
   * @key {string} key
   * @value {string} value
   * @duration {number} TTL of key
   * @return {undefined}  No return
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Delete
   * @key {string} key
   * @return {undefined}  No return
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
