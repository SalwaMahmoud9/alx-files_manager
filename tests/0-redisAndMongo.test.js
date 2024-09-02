import { expect, use, should } from 'chai';
import chaiHttp from 'chai-http';
import { promisify } from 'util';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

use(chaiHttp);
should();

// redisClient

describe('testing the clients', () => {
  describe('redis Client', () => {
    before(async () => {
      await redisClient.client.flushall('ASYNC');
    });

    after(async () => {
      await redisClient.client.flushall('ASYNC');
    });

    it('connection is alive', async () => {
      expect(redisClient.isAlive()).to.equal(true);
    });

    it('return null', async () => {
      expect(await redisClient.get('myKey')).to.equal(null);
    });

    it('key can called', async () => {
      expect(await redisClient.set('myKey', 12, 1)).to.equal(undefined);
    });

    it('return key', async () => {
      const sleep = promisify(setTimeout);
      await sleep(1100);
      expect(await redisClient.get('myKey')).to.equal(null);
    });
  });

  // dbClient
  describe('db Client', () => {
    before(async () => {
      await dbClient.usersCollection.deleteMany({});
      await dbClient.filesCollection.deleteMany({});
    });
    after(async () => {
      await dbClient.usersCollection.deleteMany({});
      await dbClient.filesCollection.deleteMany({});
    });

    it('show connection', () => {
      expect(dbClient.isAlive()).to.equal(true);
    });

    it('show connection', () => {
      expect(dbClient.isAlive()).to.equal(true);
    });

    it('show number of user', async () => {
      await dbClient.usersCollection.deleteMany({});
      expect(await dbClient.nbUsers()).to.equal(0);

      await dbClient.usersCollection.insertOne({ name: 'Larry' });
      await dbClient.usersCollection.insertOne({ name: 'Karla' });
      expect(await dbClient.nbUsers()).to.equal(2);
    });

    it('show number of file', async () => {
      await dbClient.filesCollection.deleteMany({});
      expect(await dbClient.nbFiles()).to.equal(0);

      await dbClient.filesCollection.insertOne({ name: 'FileOne' });
      await dbClient.filesCollection.insertOne({ name: 'FileTwo' });
      expect(await dbClient.nbUsers()).to.equal(2);
    });
  });
});
