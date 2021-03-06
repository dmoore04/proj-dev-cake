import mongoose from 'mongoose';
import request from 'supertest';
import config from 'config';
import app from '../src/app';

beforeAll(async () => {
  await mongoose.connect(config.get<string>('dbUri'));
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('/api/media', () => {
  describe('GET', () => {
    it('200: should respond with an array of media types', async () => {
      const response = await request(app).get('/api/media').expect(200);
      const { media } = response.body;
      expect(media.length).toBe(9);
    });
  });
});
